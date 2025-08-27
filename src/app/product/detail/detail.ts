import { Component, inject, Input } from '@angular/core';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { ProductComponent } from '../product-component/product-component';
import { Header } from '../../header/header';

@Component({
  selector: 'app-detail',
  imports: [Header],
  template: `
    <app-header />
  <h3>{{ product?.name }}</h3>
      <p>Quantity: {{ product?.quantity }}</p>
      <p>Price: {{ product?.price }}</p>
  `,
  styles: ``
})
export class Detail {
  route: ActivatedRoute = inject(ActivatedRoute);
  productService: ProductService = inject(ProductService);
  product: Product | undefined;
  constructor(){
    const productId = parseInt(this.route.snapshot.params['id'], 10);
    this.product = this.productService.getProductById(productId);
  }

}
