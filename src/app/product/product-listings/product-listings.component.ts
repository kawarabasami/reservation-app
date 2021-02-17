import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-listings',
  templateUrl: './product-listings.component.html',
  styleUrls: ['./product-listings.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor() { }

  products: string[] = ['Product A', 'Product B', 'Product C', 'Product D'];

  ngOnInit(): void {
  }

}
