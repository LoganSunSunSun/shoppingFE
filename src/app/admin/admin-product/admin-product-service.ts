import { Injectable } from '@angular/core';
import { AdminProduct } from './AdminProduct';

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {
  protected productList: AdminProduct[] = [
  {
    "id": 1,
    "name": "Laptop",
    "quantity": 10,
    "price": 999.99,
    "buyPrice": 111.00
  },
  {
    "id": 2,
    "name": "Smartphone",
    "quantity": 0,
    "price": 499.5,
    "buyPrice": 111.00
  },
  {
    "id": 3,
    "name": "Headphones",
    "quantity": 100,
    "price": 0,
    "buyPrice": 111.00
  }
]
  getAllProducts(): AdminProduct[] {
    return this.productList;
  }

  getProductById(id: number) : AdminProduct | undefined {
    return this.productList.find(product => product.id === id);
  }

  addProduct(product: AdminProduct) {
    this.productList.push(product);
  }
  
}
