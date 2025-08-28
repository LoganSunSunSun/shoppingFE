import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../../../header/header';
import { AdminHeader } from '../../admin-header/admin-header';
import { AdminOrderService } from '../admin-order-service';
import { Order } from '../../../order/order-service';



@Component({
  selector: 'app-admin-order-component',
  standalone: true,
  imports: [RouterLink, CommonModule, AdminHeader],
  template: `
    <app-admin-header />
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
          <td>{{ order.placedAt }}</td>
          <td>{{ order.status }}</td>
          <td>
            <a [routerLink]="['/admin/orders', order.id]">Details</a>
            <button *ngIf="order.status === 'PROCESSING'" (click)="cancelOrder(order.id)">Cancel</button>
            <button *ngIf="order.status === 'PROCESSING'" (click)="completeOrder(order.id)">Complete</button>
          </td>
        </tr>
      </tbody>
    </table>
  `
})

export class AdminOrderComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: AdminOrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (res) => this.orders = res,
      error: (err) => console.error('Failed to load orders', err)
    });
  }

  cancelOrder(orderId: number): void {
    if (!confirm(`Cancel order #${orderId}?`)) return;

    this.orderService.cancelOrder(orderId).subscribe({
      next: () => {
        this.orders = this.orders.filter(o => o.id !== orderId);
        console.log(`Order ${orderId} canceled`);
      },
      error: (err) => console.error('Failed to cancel order', err)
    });
  }

  completeOrder(orderId: number): void {
    if (!confirm(`Mark order #${orderId} as complete?`)) return;

    this.orderService.completeOrder(orderId).subscribe({
      next: () => {
        // Optionally update the local list: remove or mark as complete
        const index = this.orders.findIndex(o => o.id === orderId);
        if (index !== -1) {
          // For example, remove from list:
          this.orders.splice(index, 1);
        }
        console.log(`Order ${orderId} completed`);
      },
      error: (err) => console.error('Failed to complete order', err)
    });
  }
}