// src/app/orders/order-details.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Header } from '../../header/header';

interface Product {
  id: number;
  quantity: number;
}

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports:[CommonModule, RouterLink, Header],
  template: `
    <app-header />
    <h2>Order Details (Order ID: {{ orderId }})</h2>
    <table>
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of items">
          <td>{{ item.id }}</td>
          <td>{{ item.quantity }}</td>
          <td>
            <a [routerLink]="['/product-details', item.id]">View Product</a>
          </td>
        </tr>
      </tbody>
    </table>
    <a routerLink="/orders">Back to Orders</a>
  `
})
export class OrderDetailsComponent {
  orderId!: string;
  items: Product[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id')!;
    
    // For now, mock products
    this.items = [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 1 },
      { id: 3, quantity: 4 },
    ];
  }
}