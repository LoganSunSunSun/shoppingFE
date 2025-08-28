import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface Order {
  id: number;
  placedAt: string;
  status: string;
  items: OrderItem[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders';
  private getAuthHeader() {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
}

  constructor(private http: HttpClient) {}

  // place new order
  placeOrder(items: OrderItem[]): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, { items }, this.getAuthHeader());
  }

  // get all orders
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl, this.getAuthHeader());
  }

  // get single order detail
  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`, this.getAuthHeader());
  }

  // cancel order
  cancelOrder(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/cancel`, {}, this.getAuthHeader());
  }

  // get recent orders
  getRecentOrders(limit: number = 5): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/recent?limit=${limit}`);
  }
}