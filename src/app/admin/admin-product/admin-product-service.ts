import { Injectable } from '@angular/core';
import { AdminProduct } from './AdminProduct';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {
  private apiUrl: string = 'http://localhost:8080/api/admin/products';

  constructor(private http: HttpClient) {}

  private getAuthHeader() {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  }

  // Get all products
  getAllProducts(): Observable<AdminProduct[]> {
    return this.http.get<AdminProduct[]>(this.apiUrl, this.getAuthHeader());
  }

  // Get product by ID
  getProductById(id: number): Observable<AdminProduct> {
    return this.http.get<AdminProduct>(`${this.apiUrl}/${id}`, this.getAuthHeader());
  }

  // Add a new product
  addProduct(product: AdminProduct): Observable<AdminProduct> {
    return this.http.post<AdminProduct>(this.apiUrl, product, this.getAuthHeader());
  }
  
  // Update an existing product
  updateProduct(product: AdminProduct): Observable<AdminProduct> {
    return this.http.patch<AdminProduct>(
    `${this.apiUrl}/${product.id}`,
    product,
    this.getAuthHeader()
  );
}
}