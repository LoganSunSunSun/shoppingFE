import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header>
      <nav class="nav-bar">
        <div class="nav-left">
        <a routerLink="/dashboard">Home</a>
        <a routerLink="/cart">Shopping Cart</a>
        <a routerLink="/orders">Orders</a>
        <a routerLink="/watchlist">Watchlist</a>
        <a routerLink="/stats">Stats</a>
        </div>
        <div class="nav-right">
          <a routerLink="/logout">Logout</a>
        </div>
      </nav>
    </header>
  `,
  styles: `
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e293b;
  padding: 10px 20px;
  border-radius: 8px;
}

.nav-left a, .nav-right a {
  color: #f1f5f9;
  text-decoration: none;
  font-weight: 500;
  margin-right: 20px;
  transition: color 0.2s;
}

.nav-left a:last-child {
  margin-right: 0;
}

.nav-left a:hover, .nav-right a:hover {
  color: #38bdf8;
}

.nav-left a.active {
  border-bottom: 2px solid #38bdf8;
}
`
})
export class Header {

}
