import { Component, OnInit, Inject } from '@angular/core';
import { Items } from '../store/product.reducer';
import { Store } from '@ngrx/store';
import { addProductAction, updateProductAction } from '../store/product.action';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as _ from 'lodash';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  public itemForm = {} as Items;
  isUpdate: boolean = false;

  constructor(protected store: Store<any>, @Inject(MAT_DIALOG_DATA) public data: Items) { }

  ngOnInit(): void {
    if (this.data) {
      this.itemForm = _.cloneDeep(this.data);
      this.isUpdate = true;
    }
  }

  addItem() {
    this.itemForm.id = new Date().valueOf();
    this.store.dispatch(addProductAction({
      input: this.itemForm
    }));

    this.itemForm =  {} as Items;
  }

  updateItem(){
    this.store.dispatch(updateProductAction({
      entry: this.itemForm
    }));
    this.itemForm =  {} as Items;
  }

}
