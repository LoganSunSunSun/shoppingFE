import { Component, OnInit } from '@angular/core';
import { RecentItemDto, StatsService, TopProductDto } from './stats-service';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';

@Component({
  selector: 'app-stats',
  imports:[CommonModule, Header],
  template: `
    <app-header />
    <h2>Recent Items</h2>
    <ul>
      <li *ngFor="let item of recentItems">
        {{ item.productName }} - last bought: {{ item.lastBoughtAt }}
      </li>
    </ul>

    <h2>Top Products</h2>
    <ul>
      <li *ngFor="let top of topProducts">
        {{ top.name }} ({{ top.timesPurchased }} times)
      </li>
    </ul>
  `
})
export class StatsComponent implements OnInit {
  recentItems: RecentItemDto[] = [];
  topProducts: TopProductDto[] = [];

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.statsService.getRecentItems().subscribe(data => this.recentItems = data);
    this.statsService.getTopProducts().subscribe(data => this.topProducts = data);
  }
}
