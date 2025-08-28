// src/app/orders/order-details.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Header } from '../../header/header';
import { OrderService } from '../order-service';

interface Product {
  id: number;
  quantity: number;
}

export interface OrderDetailItem {
  productId: number;
  productDescription: string;
  quantity: number;
  priceAtPurchase: number;
}

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, RouterLink, Header],
  template: `
    <app-header />
    <h2>Order Details (Order ID: {{ orderId }})</h2>
    <table *ngIf="items.length > 0">
      <thead>
        <tr>
          <th>Product Id</th>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of items">
          <td>{{ item.productId}}</td>
          <td>{{ item.productDescription }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.priceAtPurchase | currency }}</td>
          <td>
            <a [routerLink]="['/product-details', item.productId]">View Product</a>
          </td>
        </tr>
      </tbody>
    </table>
    <p *ngIf="items.length > 0"><strong>Total:</strong> {{ total | currency }}</p>
    <p *ngIf="items.length === 0">Loading order details...</p>
    <a routerLink="/orders">Back to Orders</a>
  `
})
export class OrderDetailsComponent {
  orderId!: string;
  items: OrderDetailItem[] = [];
  total: number = 0;

  constructor(private route: ActivatedRoute, private orderService: OrderService) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id')!;

    this.orderService.getOrderById(+this.orderId).subscribe({
      next: (order) => {
        this.items = order.items.map(i => ({
          productId: i.productId,
          productDescription: (i as any).productDescription, // cast if needed
          quantity: i.quantity,
          priceAtPurchase: (i as any).priceAtPurchase
        }));
        this.total = this.items.reduce((sum, i) => sum + i.quantity * i.priceAtPurchase, 0);
      },
      error: (err) => {
        console.error('Failed to load order details', err);
        alert('Failed to load order details');
      }
    });
  }
}