import { Injectable } from '@angular/core';
import { Product } from '../product/product';

export interface CartItem {
  product: Product;
  quantity: number;
}


@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: CartItem[] = [];

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  addToCart(product: Product) {
    const existing = this.cartItems.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
  }

  increaseQuantity(productId: number) {
    const item = this.cartItems.find(i => i.product.id === productId);
    if (item) item.quantity++;
  }

  decreaseQuantity(productId: number) {
    const item = this.cartItems.find(i => i.product.id === productId);
    if (item) {
      item.quantity--;
      if (item.quantity <= 0) this.removeFromCart(productId);
    }
  }

  removeAll() {
    this.cartItems = [];
  }
}
