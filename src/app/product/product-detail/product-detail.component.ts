import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { products } from 'src/app/products';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: {
    name: string;
    price: number;
    description: string;
  } | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('productId');
      if (productId != null) {
        this.product = products[parseInt(productId)]
      }
    });
  }

}
