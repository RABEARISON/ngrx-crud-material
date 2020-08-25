import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { Store } from '@ngrx/store';

import { selectProductItems } from 'src/app/store/product.selector';
import { deleteProductAction } from './store/product.action';
import { Items } from './store/product.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild('templateAction', { static: false }) templateAction;
  title = 'ngrx-crud';
  loadingIndicator = false;
  rows = [];
  columns = [];

  constructor(private matDialog: MatDialog, protected store: Store<any>) { }

  ngAfterViewInit() {
    setTimeout(()=> {
      this.columns = [
        { name: 'Label', width: 300 },
        { name: 'Quantity' },
        { name: 'Actions', cellTemplate: this.templateAction },
      ]
    })
  }

  ngOnInit(){
    this.store.select(selectProductItems).subscribe(items => {
      console.log('Items', items);
      this.rows = items;
      this.rows = [...this.rows];
    });
  }

  addDialog() {
    this.matDialog.open(AddDialogComponent);
  }

  deleteItem(id) {
    this.store.dispatch(deleteProductAction({ id }));
  }

  editItem(row: Items) {
    this.matDialog.open(AddDialogComponent, {
      data: row
    })
  }
}
