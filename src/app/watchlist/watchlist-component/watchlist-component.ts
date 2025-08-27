import { Component, inject, Input } from '@angular/core';
import { Product } from '../../product/product';
import { RouterLink } from '@angular/router';
import { Header } from '../../header/header';
import { ProductComponent } from '../../product/product-component/product-component';
import { CommonModule } from '@angular/common';
import { WatchlistService } from '../watchlist-service';

@Component({
  selector: 'app-watchlist-component',
  imports: [Header, ProductComponent, CommonModule, Header],
  template: 
    `
    <app-header />
    <h2>Your Watchlist</h2>
    <section *ngIf="watchlistItems.length; else empty">
      <div *ngFor="let product of watchlistItems" class="product-wrapper">
        <app-product [product]="product"></app-product>
        <!-- Remove button -->
        <button (click)="removeItem(product)">Remove</button>
      </div> 
    </section>
    <ng-template #empty>
      <p>Your watchlist is empty.</p>
    </ng-template>
  `,
  styles: [`
    .product-wrapper {
      margin: 10px;
    }
    button {
      margin-top: 15px;
      padding: 8px 16px;
      font-size: 16px;
      cursor: pointer;
    }
  `]
})
export class WatchlistComponent {
  watchlistService = inject(WatchlistService);
  watchlistItems = this.watchlistService.getWatchlistItems();
  removeItem(product: any) {
    this.watchlistService.removeFromCart(product.id);
    this.watchlistItems = this.watchlistService.getWatchlistItems(); // refresh
  }
}
