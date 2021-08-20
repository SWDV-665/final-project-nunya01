import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  items: any = [{"name": "Item 1", "part_name": "filter", "part_descr": "This describes the part."}, {"name": "Item 2", "part_name": "filter", "part_descr": "This describes the part."}];

  getItems() {
    return this.items
  }
}
