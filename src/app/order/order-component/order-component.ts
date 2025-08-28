// src/app/orders/orders.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../../header/header';
import { Order, OrderItem, OrderService } from '../order-service';



@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterLink, CommonModule, Header],
  template: `
    <app-header />
    <h2>Orders</h2>
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let order of orders">
          <td>{{ order.id }}</td>
          <td>{{ order.placedAt | date:'short' }}</td>
          <td>{{ order.status }}</td>
          <td>
            <a [routerLink]="['/orders', order.id]">Details</a>
            <button  *ngIf="order.status === 'PROCESSING'"  (click)="cancelOrder(order.id)">Cancel</button>
          </td>
        </tr>
      </tbody>
    </table>
  `
})

export class OrderComponent {
  orders: Order[] = [];
  
  constructor(private orderService: OrderService) {}
  loadOrders() {
  this.orderService.getAllOrders().subscribe({
    next: (res) => this.orders = res,
    error: (err) => console.error('Failed to load orders', err)
  });
}
  ngOnInit() {
    this.loadOrders();
  }

  cancelOrder(orderId: number) {
    if (!confirm(`Are you sure you want to cancel order #${orderId}?`)) return;

    this.orderService.cancelOrder(orderId).subscribe({
      next: () => {
        // Remove canceled order from the local list
        // this.orders = this.orders.filter(o => o.id !== orderId);
        this.loadOrders();
        console.log(`Order ${orderId} canceled`);
      },
      error: (err) => {
        console.error('Failed to cancel order', err);
        alert('Failed to cancel order: ' + (err.error?.message || err.statusText));
      }
    });
  }

}
