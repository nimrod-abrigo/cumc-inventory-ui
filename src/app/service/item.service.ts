import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly API_URL = environment.apiUrl+"/item";

  constructor(private afs: AngularFirestore) { }

  public addItem(item){
    return this.afs.collection('items').add(item);
  }

  public getAllItems(){
    return this.afs.collection('items',ref => ref.orderBy('last_update_date','desc')).snapshotChanges();
  }

  public deleteItem(item_id){
    return this.afs.doc('items/'+item_id).delete();
  }

  public editItem(item, item_id){
    return this.afs.doc('items/'+item_id).update(item);
  }
}
