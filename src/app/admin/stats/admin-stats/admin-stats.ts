import { Component, OnInit } from '@angular/core';
import { AdminStatsService } from '../admin-stats-service';
import { CommonModule } from '@angular/common';
import { AdminHeader } from '../../admin-header/admin-header';
export interface TopProduct {
  productId: number;
  name: string;
  timesPurchased: number;
}
@Component({
  selector: 'app-top-products',
  imports: [CommonModule, AdminHeader],
  template: `
  <app-admin-header />
    <p>Total Items Sold: {{ totalSold }}</p>
    <h3>Top 3 Products</h3>
    <ul>
      <li *ngFor="let product of topProducts">
        {{ product.name }} — Sold: {{ product.timesPurchased }}
      </li>
    </ul>
  `
})
export class AdminStats implements OnInit {
  topProducts: TopProduct[] = [];
  totalSold = 0;

  constructor(private statsService: AdminStatsService) {}

  ngOnInit(): void {
    this.statsService.getTotalSoldItems().subscribe({
      next: total => this.totalSold = total,
      error: err => console.error(err)
    });

    this.statsService.getTop3Products().subscribe({
      next: products => this.topProducts = products,
      error: err => console.error(err)
    });
  }
}