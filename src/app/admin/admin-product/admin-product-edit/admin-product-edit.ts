import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AdminProduct } from '../AdminProduct';
import { AdminProductService } from '../admin-product-service';


@Component({
  selector: 'app-admin-product-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="edit-form" *ngIf="product">
      <h2>Edit Product</h2>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <label>
          Name:
          <input formControlName="name" />
        </label>

        <label>
          Quantity:
          <input type="number" formControlName="quantity" />
        </label>

        <label>
          Price:
          <input type="number" formControlName="price" />
        </label>

        <label>
          Buy Price:
          <input type="number" formControlName="buyPrice" />
        </label>

        <button type="submit" [disabled]="form.invalid">Save Changes</button>
      </form>
    </div>

    <div *ngIf="!product">
      <p>Product not found.</p>
    </div>
  `,
  styles: [`
    .edit-form {
      max-width: 400px;
      margin: 20px auto;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 6px;
      background: #fafafa;
    }
    label {
      display: block;
      margin-bottom: 10px;
    }
    input {
      width: 100%;
      padding: 6px;
      margin-top: 4px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      margin-top: 15px;
      padding: 8px 14px;
      background: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button[disabled] {
      background: #aaa;
      cursor: not-allowed;
    }
  `]
})
export class AdminProductEdit implements OnInit {
  form!: FormGroup;
  productId!: number;
  product?: AdminProduct;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: AdminProductService
  ) {}

  ngOnInit(): void {
    // read product id from route param
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    // fetch product from service
    this.product = this.productService.getProductById(this.productId);

    if (this.product) {
      this.form = this.fb.group({
        name: [this.product.name, Validators.required],
        quantity: [this.product.quantity, [Validators.required, Validators.min(0)]],
        price: [this.product.price, [Validators.required, Validators.min(0)]],
        buyPrice: [this.product.buyPrice, [Validators.required, Validators.min(0)]],
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid && this.product) {
      const updatedProduct: AdminProduct = {
        id: this.productId,
        ...this.form.value
      };

      // Simple in-memory update
      Object.assign(this.product, updatedProduct);

      console.log('Updated product:', this.product);

      // Navigate back to product list
      this.router.navigate(['/admin/dashboard']);
      
      alert('Product updated!');
    }
  }
}