import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-listings',
  templateUrl: './product-listings.component.html',
  styleUrls: ['./product-listings.component.scss']
})
export class ProductListComponent implements OnInit {

  products: any;

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    const productsObservable = this.productService.getProducts();
    productsObservable.subscribe(
      (data) => {
        debugger
        this.products = data;
      },
      (err) => { console.error('次のエラーが出力されました: ' + err); },
      // completeは書かなくても良い
    );
  }

}
