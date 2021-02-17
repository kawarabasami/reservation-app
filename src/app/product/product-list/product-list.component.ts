import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor() { }

  products: string[] = ['Product A', 'Product B', 'Product C', 'Product D'];

  ngOnInit(): void {
  }

}
