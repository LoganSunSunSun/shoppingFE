import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../header/header';
import { ProductComponent } from '../../product/product-component/product-component';
import { CartService } from '../cart-service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [Header, ProductComponent, CommonModule, Header],
  template: 
    // <app-header></app-header>
    `
    <app-header />
    <h2>Your Shopping Cart</h2>
    <section *ngIf="cartItems.length; else empty">
      <div *ngFor="let product of cartItems" class="product-wrapper">
        <app-product [product]="product"></app-product>
        <!-- Remove button -->
        <button (click)="removeItem(product)">Remove</button>
      </div>      
      <!-- Submit order button -->
      <button (click)="submitOrder()">Submit Order</button>
    </section>
    <ng-template #empty>
      <p>Your cart is empty.</p>
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
export class CartComponent {
  cartService = inject(CartService);
  cartItems = this.cartService.getCartItems();
  removeItem(product: any) {
    this.cartService.removeFromCart(product.id);
    this.cartItems = this.cartService.getCartItems(); // refresh
  }
  submitOrder() {
    // For now just a placeholder — you could later call a service
    alert('Order submitted!');
    this.cartService.removeAll();
    this.cartItems = this.cartService.getCartItems(); // refresh view
  }
}