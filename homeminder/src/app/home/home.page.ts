import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  items = []

  constructor(public dataService: ItemService) { }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.items = this.dataService.getItems()
  }

}
