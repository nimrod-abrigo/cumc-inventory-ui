import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
}
