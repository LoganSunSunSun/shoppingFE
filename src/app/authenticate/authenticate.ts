import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth-service';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="auth-container">
      <div class="tabs">
        <button (click)="mode='login'" [class.active]="mode==='login'">Login</button>
        <button (click)="mode='register'" [class.active]="mode==='register'">Register</button>
      </div>

      <form *ngIf="mode==='login'" (ngSubmit)="login()">
        <input type="text" [(ngModel)]="username" name="username" placeholder="Username" required>
        <input type="password" [(ngModel)]="password" name="password" placeholder="Password" required>
        <button type="submit">Login</button>
      </form>

      <form *ngIf="mode==='register'" (ngSubmit)="register()">
        <input type="text" [(ngModel)]="username" name="username" placeholder="Username" required>
        <input type="password" [(ngModel)]="password" name="password" placeholder="Password" required>
        <input type="email" [(ngModel)]="email" name="email" placeholder="Email" required>
        <button type="submit">Register</button>
      </form>
    </div>
  `
})
export class Authenticate {
  mode: 'login' | 'register' = 'login';
  username = '';
  password = '';
  email = '';

  constructor(private auth: AuthService, private router: Router) {}

login() {
  this.auth.login(this.username, this.password).subscribe({
    next: (res) => {
      // login successful
      if (res.roles.includes('ROLE_ADMIN')) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    },
    error: (err) => {
      // login failed
      alert('Login failed: Invalid credentials');
    }
  });
}

register() {
  this.auth.register(this.username, this.email, this.password).subscribe({
    next: (res: any) => {
      alert(res); // show "User registered"
      this.mode = 'login'; // switch to login form
    },
    error: (err) => {
      alert(err.error); // show backend error message
    }
  });
}
}


