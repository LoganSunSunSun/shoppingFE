import { Injectable } from '@angular/core';
import { Product } from '../product/product';

export interface CartItem {
  product: Product;
  quantity: number;
}


@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: Product[] = [];

  getCartItems(): Product[] {
    return this.cartItems;
  }

  addToCart(product: Product) {
    this.cartItems.push(product);
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(p => p.id !== productId);
  }

  removeAll() {
    this.cartItems = [];
  }

  clearCart() {
    this.cartItems = [];
  }
}