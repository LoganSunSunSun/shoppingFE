import { Component } from '@angular/core';
import { AdminProduct } from '../AdminProduct';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AdminProductService } from '../admin-product-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-product',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, RouterLink],
  template: `
    <div class="new-form">
      <h2>Add New Product</h2>

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

        <button type="submit" [disabled]="form.invalid">Add Product</button>
      </form>
    </div>
  `,
  styles: [`
    .new-form {
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
      background: #388e3c;
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
export class NewProduct {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: AdminProductService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      buyPrice: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const newProduct: AdminProduct = {
        id: this.productService.getAllProducts().length + 1, // simple id generation
        ...this.form.value
      };

      this.productService.addProduct(newProduct);
      console.log('Added product:', newProduct);

      // Navigate back to product list
      this.router.navigate(['/admin/dashboard']);
    }
  }
}
