import { Component, Input } from '@angular/core';
import { AdminProduct } from '../AdminProduct';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-product-component',
  imports: [RouterLink],
  template: `
    <div class="product-card">
      <h3>{{ product.name }}</h3>
      <p>Quantity: {{ product.quantity }}</p>
      <p>RetailPrice: {{ product.price }}</p>
      <p>BuyPrice: {{ product.buyPrice }} </p>
      <!-- Edit button -->
      <button [routerLink]="['/admin/product/edit', product.id]">
        Edit
      </button>
    </div>
  `,
  styles: [`
    .product-card {
      border: 1px solid #ddd;
      padding: 10px;
      margin: 5px;
      border-radius: 4px;
    }

    button {
      margin-top: 8px;
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      background-color: #1976d2;
      color: white;
      cursor: pointer;
    }

    button:hover {
      background-color: #1565c0;
    }
  `]
})
export class AdminProductComponent {
  @Input() product!: AdminProduct;

}
