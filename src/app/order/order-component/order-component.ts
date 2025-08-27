// src/app/orders/orders.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../../header/header';

interface Order {
  id: number;
  date: string;
  total: number;
}

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
          <th>Total</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let order of orders">
          <td>{{ order.id }}</td>
          <td>{{ order.date }}</td>
          <td>{{ order.total }}</td>
          <td>
            <a [routerLink]="['/orders', order.id]">Details</a>
            <button (click)="cancelOrder(order.id)">Cancel</button>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class OrderComponent {
  orders: Order[] = [
    { id: 1, date: '2025-08-26', total: 120.5 },
    { id: 2, date: '2025-08-25', total: 45.0 },
    { id: 3, date: '2025-08-24', total: 78.9 },
  ];
  cancelOrder(orderId: number) {
    if (confirm(`Are you sure you want to cancel order #${orderId}?`)) {
      // For now, just remove from the list
      this.orders = this.orders.filter(o => o.id !== orderId);
      // Later: call backend API to cancel order
      console.log(`Order ${orderId} canceled`);
    }
  }
}
