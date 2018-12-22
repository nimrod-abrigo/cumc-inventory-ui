import { Part } from './part';

export class Item {
    item_id: string;
    item_name: string;
    item_description: string;
    number_unavailable: number;
    number_available: number;
    number_total:number;
    category_id:string;
    parts: Part[];
    last_update_date: string;
}
