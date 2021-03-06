import { Part } from "./part";

export class Item {
    item_id:Number;
    item_name:String;
    item_description:String;
    number_total:Number;
    number_available:Number;
    number_unavailable:Number;
    category_id:Number;
    created_date:String;
    last_update_date:String;
    parts:Part[];
}
