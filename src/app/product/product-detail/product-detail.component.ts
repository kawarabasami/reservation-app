import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: {
    coverImage: string;
    name: string;
    price: number;
    description: string;
    heading1: string;
    heading2: string;
    heading3: string;
    headingtext1: string;
    headingtext2: string;
    headingtext3: string;
  } | null = null;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('productId');
      if (productId != null) {
        // this.product = this.productService.findById(productId);
        const productObservable = this.productService.findById(productId);
        productObservable.subscribe(
          (data) => {
            this.product = data;
          },
          (error) => {

          }
        )
      }
    });
  }

}
