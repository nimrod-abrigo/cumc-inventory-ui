import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly API_URL = "http://localhost:4000/item";

  constructor(private _http:HttpClient) { }

  public getAllItemsByCategory(category_id):Observable<any>{
    return this._http.get(this.API_URL+"/category/"+category_id);
  }

  public deleteItem(item_id):Observable<any>{
    return this._http.delete(this.API_URL+"/"+item_id);
  }

  public getItemParts(item_id):Observable<any>{
    return this._http.get(this.API_URL+"/info/"+item_id);
  }

  public editItem(item):Observable<any>{

    const myheader = new HttpHeaders().set('Content-Type', 'application/json');
    
    let body = { 
      item_name: item.item_name,
      item_description : item.item_description,
      number_total : item.number_total,
      last_update_date: item.last_update_date
    }

    return this._http.put(this.API_URL+"/"+item.item_id,body,{headers: myheader});
  }

  public deletePart(part_id):Observable<any>{
    return this._http.delete(this.API_URL+"/part/"+part_id);
  }

  public addPart(part,item_id):Observable<any>{

    const myheader = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.API_URL+"/part/"+item_id,part,{headers: myheader});
  }
}
