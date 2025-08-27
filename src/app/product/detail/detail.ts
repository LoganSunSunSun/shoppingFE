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
      <p>Description: {{ product?.description }}</p>
      <p>Price: {{ product?.retailPrice }}</p>
  `,
  styles: ``
})
export class Detail {
  route: ActivatedRoute = inject(ActivatedRoute);
  productService: ProductService = inject(ProductService);
  product: Product | undefined;
  ngOnInit() {
  const productId = 1; // or get from route params
  this.productService.getProductById(productId).subscribe(p => {
    this.product = p;
  });
}
  constructor(){
    const productId = parseInt(this.route.snapshot.params['id'], 10);
  }

}
