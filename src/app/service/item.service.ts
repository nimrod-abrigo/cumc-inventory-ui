import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly API_URL = environment.apiUrl+"/item";

  constructor(private _http:HttpClient, private afs: AngularFirestore) { }

  public addItem(item){
    return this.afs.collection('items').add(item);
  }

  public getAllItems(){
    return this.afs.collection('items',ref => ref.orderBy('last_update_date','desc')).snapshotChanges();
  }

  public deleteItem(item_id):Observable<any>{
    return this._http.delete(this.API_URL+"/"+item_id);
  }

  public deleteItemFire(item_id){
    return this.afs.doc('items/'+item_id).delete();
  }

  public getItemParts(item_id):Observable<any>{
    return this._http.get(this.API_URL+"/info/"+item_id);
  }

  public editItem(item, item_id){
    return this.afs.doc('items/'+item_id).update(item);
  }

  public deletePart(part_id):Observable<any>{
    return this._http.delete(this.API_URL+"/part/"+part_id);
  }

  public addPart(part,item_id):Observable<any>{

    const myheader = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.API_URL+"/part/"+item_id,part,{headers: myheader});
  }
}
