import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  protected productList: Product[] = [
  {
    "id": 1,
    "name": "Laptop",
    "quantity": 10,
    "price": 999.99
  },
  {
    "id": 2,
    "name": "Smartphone",
    "quantity": 0,
    "price": 499.5
  },
  {
    "id": 3,
    "name": "Headphones",
    "quantity": 100,
    "price": 0
  },
  {
    "id": 4,
    "name": "Dildo",
    "quantity": 5,
    "price": 199.99
  },
  {
    "id": 5,
    "name": "USB Cable",
    "quantity": -10,
    "price": 9.99
  },
  {
    "id": 6,
    "name": "Monitor",
    "quantity": 50,
    "price": -150.0
  },
  {
    "id": 7,
    "name": "Keyboard",
    "quantity": 1,
    "price": 49.99
  },
  {
    "id": 8,
    "name": "Mouse",
    "quantity": 99999,
    "price": 19.99
  },
  {
    "id": 9,
    "name": "Chair",
    "quantity": 20,
    "price": 0.01
  },
  {
    "id": 10,
    "name": "Desk",
    "quantity": 0,
    "price": 249.99
  }
]


  getAllProducts(): Product[] {
    return this.productList;
  }

  getProductById(id: number) : Product | undefined {
    return this.productList.find(product => product.id === id);
  }

  
}
