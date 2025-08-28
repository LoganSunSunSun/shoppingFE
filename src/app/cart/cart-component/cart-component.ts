import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../header/header';
import { ProductComponent } from '../../product/product-component/product-component';
import { CartItem, CartService } from '../cart-service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrderService } from '../../order/order-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [Header, ProductComponent, CommonModule],
  template: `
    <app-header />
    <h2>Your Shopping Cart</h2>
    <section *ngIf="cartItems.length; else empty">
      <div *ngFor="let item of cartItems" class="product-wrapper">
        <app-product [product]="item.product"></app-product>
        <div class="quantity-controls">
          <button (click)="decrease(item.product.id)">-</button>
          <span>{{ item.quantity }}</span>
          <button (click)="increase(item.product.id)">+</button>
        </div>
        <button (click)="removeItem(item.product.id)">Remove</button>
      </div>      
      <button (click)="submitOrder()">Submit Order</button>
    </section>
    <ng-template #empty>
      <p>Your cart is empty.</p>
    </ng-template>
  `,
  styles: [`
    .product-wrapper {
      margin: 10px;
      display: flex;
      align-items: center;
    }
    .quantity-controls {
      display: flex;
      align-items: center;
      margin: 0 10px;
    }
    .quantity-controls button {
      width: 30px;
      height: 30px;
      font-size: 18px;
      margin: 0 5px;
      cursor: pointer;
    }
    .quantity-controls span {
      width: 30px;
      text-align: center;
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
  cartItems: CartItem[] = this.cartService.getCartItems();
  private router = inject(Router); // <-- inject Router

  private apiUrl: string = 'http://localhost:8080/api/orders';  // explicitly typed

  constructor(private http: HttpClient) {}

  increase(productId: number): void {
    this.cartService.increaseQuantity(productId);
  }

  decrease(productId: number): void {
    this.cartService.decreaseQuantity(productId);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  submitOrder(): void {   // ✅ explicit return type
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    // convert items into [{ productId, quantity }]
    const body = {
      items:
    this.cartItems.map(item => ({
      productId: item.product.id,
      quantity: item.quantity
    }))};

    this.http.post(this.apiUrl, 
      body, 
      { headers })
      .subscribe({
        next: (res) => {
          console.log('Order submitted successfully', res);
          alert('Order submitted successfully!');
          this.cartService.removeAll();
          this.router.navigate(['/cart']);
        },
        error: (err) => {
          console.error('Order submission failed', err);
          alert('Order submission failed!');
        }
      });
  }
}