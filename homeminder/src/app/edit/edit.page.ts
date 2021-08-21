import { Component, OnInit } from '@angular/core';
import { ItemService } from './../shared/item.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  updateItemForm: FormGroup;
  id: any;

  constructor(
    private itemAPI: ItemService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) { 
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }


  ngOnInit() {
    this.getItemData(this.id);
    this.updateItemForm = this.fb.group({
      appliance_name: [''],
      part_name: [''],
      part_number: [''],
      part_descr: [''],
      addtl_notes: [''],
      replc_interval: [''],
      last_replc_date: ['']
    })
  }


  getItemData(id) {
    this.itemAPI.getItem(id).subscribe(res => {
      this.updateItemForm.setValue({
        appliance_name: res['appliance_name'],
        part_name: res['part_name'],
        part_number: res['part_number'],
        part_descr: res['part_descr'],
        addtl_notes: res['addtl_notes'],
        replc_interval: res['replc_interval'],
        last_replc_date: res['last_replc_date']
      });
    });
  }


  updateForm() {
    if (!this.updateItemForm.valid) {
      return false;
    } else {
      this.itemAPI.updateItem(this.id, this.updateItemForm.value)
        .subscribe((res) => {
          console.log(res)
          this.updateItemForm.reset();
          this.router.navigate(['']);
        })
    }
  }
}
