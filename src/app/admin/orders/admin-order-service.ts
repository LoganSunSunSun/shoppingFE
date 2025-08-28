import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../order/order-service';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {
    private baseUrl = 'http://localhost:8080/api/admin/orders';

  constructor(private http: HttpClient) {}

  private getAuthHeader() {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  }

  // Get all orders
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl, this.getAuthHeader());
  }

  // Get order by ID
  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`, this.getAuthHeader());
  }

  // Cancel an order
  cancelOrder(id: number): Observable<Order> {
    return this.http.patch<Order>(`${this.baseUrl}/${id}/cancel`, {}, this.getAuthHeader());
  }

  // Complete an order
  completeOrder(id: number): Observable<Order> {
    return this.http.patch<Order>(`${this.baseUrl}/${id}/complete`, {}, this.getAuthHeader());
  }
}
  
