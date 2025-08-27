import { Injectable } from '@angular/core';
import { Product } from '../product/product';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private watchlistItems: Product[] = [];

  getWatchlistItems(): Product[] {
    return this.watchlistItems;
  }

  addToWatchlist(product: Product) {
    this.watchlistItems.push(product);
  }

  removeFromCart(productId: number) {
    this.watchlistItems = this.watchlistItems.filter(p => p.id !== productId);
  }

  removeAll() {
    this.watchlistItems = [];
  }

  clearWatchlist() {
    this.watchlistItems = [];
  }
}