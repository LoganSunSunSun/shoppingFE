import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth-service';
import { Router, Routes } from '@angular/router';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="auth-container">
      <div class="tabs">
        <button (click)="mode='login'" [class.active]="mode==='login'">Login</button>
        <button (click)="mode='register'" [class.active]="mode==='register'">Register</button>
      </div>

      <!-- Login Form -->
      <form *ngIf="mode==='login'" [formGroup]="loginForm" (ngSubmit)="login()">
        <input type="text" formControlName="username" placeholder="Username" required>
        <input type="password" formControlName="password" placeholder="Password" required>
        <button type="submit" [disabled]="loginForm.invalid">Login</button>
      </form>

      <!-- Registration Form -->
      <form *ngIf="mode==='register'" [formGroup]="registerForm" (ngSubmit)="register()">
        <input type="text" formControlName="username" placeholder="Username">
        <input type="password" formControlName="password" placeholder="Password">
        <div *ngIf="password.invalid && (password.dirty || password.touched)" class="error">
          Password must be at least 8 characters, include letters, digits & special characters.
        </div>
        <input type="email" formControlName="email" placeholder="Email">
        <div *ngIf="email.invalid && (email.dirty || email.touched)" class="error">
          Enter a valid email address.
        </div>
        <button type="submit" [disabled]="registerForm.invalid">Register</button>
      </form>
    </div>
  `,
  styles: [`
    .error { color: red; font-size: 0.8em; margin-top: 4px; }
  `]
})
export class Authenticate {
  mode: 'login' | 'register' = 'login';

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]).+$/)
    ]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private auth: AuthService, private router: Router) {}

  get password() { return this.registerForm.get('password')!; }
  get email() { return this.registerForm.get('email')!; }

login() {
  const username = this.loginForm.get('username')!.value || '';
  const password = this.loginForm.get('password')!.value || '';
  this.auth.login(username, password).subscribe({
    next: res => {
      if (res.roles.includes('ROLE_ADMIN')) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    },
    error: err => alert('Login failed: Invalid credentials')
  });
}


  register() {
  const username = this.registerForm.get('username')!.value || '';
  const email = this.registerForm.get('email')!.value || '';
  const password = this.registerForm.get('password')!.value || '';
    this.auth.register(username, email, password).subscribe({
      next: res => {
        alert(res);
        this.mode = 'login';
      },
      error: err => alert(err.error)
    });
  }
}