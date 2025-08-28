import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AdminProduct } from '../../admin-product/AdminProduct';
import { CommonModule } from '@angular/common';
import { AdminHeader } from '../../admin-header/admin-header';
import { OrderDetailItem } from '../../../order/order-details-component/order-details-component';
import { OrderService } from '../../../order/order-service';
import { AdminOrderService } from '../admin-order-service';

interface Entry {
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
            <a [routerLink]="['/admin-product-details', item.productId]">View Product</a>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class AdminOrderDetail {
  orderId!: string;
  items: OrderDetailItem[] = [];
  total: number = 0;

  constructor(private route: ActivatedRoute, private orderService: AdminOrderService) {}

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
