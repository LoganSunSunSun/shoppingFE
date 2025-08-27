import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AdminProduct } from '../../admin-product/AdminProduct';
import { CommonModule } from '@angular/common';
import { AdminHeader } from '../../admin-header/admin-header';

interface Entry{
  id: number;
  quantity: number;
}

@Component({
  selector: 'app-admin-order-detail',
  imports:[CommonModule, RouterLink, AdminHeader],
  template: `
    <app-admin-header />
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
            <a [routerLink]="['/admin-product-details', item.id]">View Product</a>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class AdminOrderDetail {
  orderId!: string;
  items: Entry[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id')!;
  

    this.items = [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 1 },
      { id: 3, quantity: 4 },
    ];
  }
}
