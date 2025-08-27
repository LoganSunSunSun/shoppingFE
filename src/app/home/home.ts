import { Component, inject } from '@angular/core';
import { Product } from '../product/product';
import { ProductService } from '../product/product.service';
import { Header } from '../header/header';
import { ProductComponent } from '../product/product-component/product-component';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart/cart-service';
import { WatchlistService } from '../watchlist/watchlist-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, ProductComponent, CommonModule],
  template: `
    <app-header></app-header>
    <section class="products">
      <div *ngFor="let product of productList" class="product-wrapper">
        <app-product [product]="product"></app-product>
        <button (click)="addToCart(product)">Add to Cart</button>
        <button (click)="addToWatchlist(product)">Add to Watchlist</button>
      </div>
    </section>
  `,
  styles: [`
    .products {
      display: flex;
      flex-wrap: wrap;
    }
  `]
})
export class Home {
  productService = inject(ProductService);
  productList: Product[] = [];
  ngOnInit() {
    this.productService.getAllProducts().subscribe(products => {
      this.productList = products;
    });
  }

  cartService = inject(CartService);
  watchlistService = inject(WatchlistService);
  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert(`${product.name} added to cart`);
  }

  addToWatchlist(product: Product) {
    this.watchlistService.addToWatchlist(product);
    alert(`${product.name} added to watchlist`);
  }


}
