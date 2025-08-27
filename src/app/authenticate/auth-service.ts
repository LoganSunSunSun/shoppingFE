// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface AuthResponse {
  token: string;
  user?: any; // optional user info
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  // login method
  login(username: string, password: string) {
    return this.http.post<{ token: string; username: string; roles: string[] }>(
      `${this.apiUrl}/login`,
      { usernameOrEmail: username, password }
    ).pipe(
      tap(res => localStorage.setItem('token', res.token))
    );
  }

  // register method
  register(username: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, { username, email, password });
  }

  // logout
  logout(): void {
    localStorage.removeItem('token');
  }

  // check login status
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // get token for API calls
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
