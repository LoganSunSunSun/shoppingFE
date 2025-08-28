import { Component, OnInit } from '@angular/core';
import { AdminProduct } from '../AdminProduct';
import { ActivatedRoute } from '@angular/router';
import { AdminProductService } from '../admin-product-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-product-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="product; else loading">
      <h2>{{ product.name }}</h2>
      <p><strong>ID:</strong> {{ product.id }}</p>
      <p><strong>Description:</strong> {{ product.description }}</p>
      <p><strong>Quantity:</strong> {{ product.quantity }}</p>
      <p><strong>Retail Price:</strong> {{ product.retailPrice }}</p>
      <p><strong>Wholesale Price:</strong> {{ product.wholesalePrice }}</p>
    </div>

    <ng-template #loading>
      <p>Loading product details...</p>
    </ng-template>
  `,
  styles: [`
    h2 { margin-bottom: 0.5rem; }
    p { margin: 0.25rem 0; }
  `]
})
export class AdminProductDetail implements OnInit {
  product?: AdminProduct;

  constructor(
    private route: ActivatedRoute,
    private productService: AdminProductService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (prod) => this.product = prod,
        error: (err) => console.error('Failed to load product', err)
      });
    }
  }
}