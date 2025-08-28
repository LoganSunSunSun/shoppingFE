import { Component, inject } from '@angular/core';
import { AdminHeader } from '../admin-header/admin-header';
import { AdminProductService } from '../admin-product/admin-product-service';
import { ProductService } from '../../product/product.service';
import { AdminProduct } from '../admin-product/AdminProduct';
import { AdminProductComponent } from '../admin-product/admin-product-component/admin-product-component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
``
@Component({
  selector: 'app-admin-home',
  imports: [AdminHeader, AdminProductComponent, CommonModule, RouterLink],
  template: `
    <app-admin-header />
    <button [routerLink]="['/admin/product/new']">Add Product</button>
    <section class="products">
      <div *ngFor="let product of productList" class="product-wrapper">
        <app-admin-product-component [product]="product"></app-admin-product-component>
      </div>
    </section>
  
  `,
  styles: [`
    .products {
      display: flex;
      flex-wrap: wrap;
    }
  `]
})
export class AdminHome {
  productList: AdminProduct[] = [];
  
  constructor(private productService: AdminProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.productList = products; // now you have the actual array
      },
      error: (err) => {
        console.error('Failed to load products', err);
      }
    });
  }

}
