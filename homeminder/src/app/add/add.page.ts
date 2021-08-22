import { Component, OnInit, NgZone } from '@angular/core';
import { ItemService } from './../shared/item.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  itemForm: FormGroup;

  constructor(
    private itemAPI: ItemService,
    private router: Router,
    public fb: FormBuilder,
    private zone: NgZone
  ) {
    this.itemForm = this.fb.group({
      appliance_name: [''],
      part_name: [''],
      part_number: [''],
      part_descr: [''],
      addtl_notes: [''],
      replc_interval: [''],
      last_replc_date: ['']
    })
   }

  ngOnInit() {
  }

  onFormSubmit() {
    if (!this.itemForm.valid) {
      return false;
    } else {
      this.itemAPI.addItem(this.itemForm.value)
        .subscribe((res) => {
          this.zone.run(() => {
            console.log(res)
            this.itemForm.reset();
            this.router.navigate(['']);
          })
        });
    }
  }

}
