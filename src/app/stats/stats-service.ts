import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface RecentItemDto {
  productId: number;
  productName: string;
  lastBoughtAt: string;   // comes as ISO string from backend
  timesBought: number;
}

export interface TopProductDto {
  productId: number;
  name: string;
  timesPurchased: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getRecentItems(): Observable<RecentItemDto[]> {
    return this.http.get<RecentItemDto[]>(`${this.apiUrl}/recent`, {
      headers: this.getHeaders()
    });
  }

  getTopProducts(): Observable<TopProductDto[]> {
    return this.http.get<TopProductDto[]>(`${this.apiUrl}/top`, {
      headers: this.getHeaders()
    });
  }
}

