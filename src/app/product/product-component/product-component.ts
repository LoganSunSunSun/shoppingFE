import { Component, Input } from '@angular/core';
import { Product } from '../product';
import { RouterLink } from '@angular/router';
import { Header } from '../../header/header';

@Component({
  selector: 'app-product',
  imports:[
    RouterLink],
  template: `
    <div class="product-card">
      <h3>{{ product.name }}</h3>
      <p>Quantity: {{ product.quantity }}</p>
      <p>Price: {{ product.price }}</p>
      <a [routerLink]="['/product-details', product.id]">Learn More</a>
    </div>
  `,
  styles: [`
    .product-card {
      border: 1px solid #ddd;
      padding: 10px;
      margin: 5px;
      border-radius: 4px;
    }
  `]
})
export class ProductComponent {
  @Input() product!: Product;
}