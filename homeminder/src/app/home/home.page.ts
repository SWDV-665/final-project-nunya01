import { Component, OnInit } from '@angular/core';
import { ItemService } from '../shared/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  Items: any = [];

  constructor(private itemService: ItemService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.itemService.getItemList().subscribe((res) => {
      console.log(res)
      this.Items = res;
    })
  }

  deleteItem(item, i) {
    if (window.confirm('Do you want to delete this item?')) {
      this.itemService.deleteItem(item._id)
        .subscribe(() => {
          this.Items.splice(i, 1);
          console.log('Item deleted!')
        }
        )
    }
  }
}
