import { Injectable } from '@angular/core';
import { Product } from './product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/api/user/products';

  constructor(private http: HttpClient) {}

  // Fetch all products from backend
  getAllProducts(): Observable<Product[]> {
    const token = localStorage.getItem('token'); // assuming your token key is 'token'
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Product[]>(this.apiUrl, { headers });
  }

  // Fetch a product by ID from backend
  getProductById(id: number): Observable<Product> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // return this.http.get<Product>(`http://localhost:8080/products/${id}`, { headers });
    return this.http.get<Product>(`${this.apiUrl}/${id}`, { headers });
  }
}