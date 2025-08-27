import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header>
      <nav>
        <a routerLink="/dashboard">Home</a>
        <a routerLink="/cart">Shopping Cart</a>
        <a routerLink="/orders">Orders</a>
        <a routerLink="/watchlist">Watchlist</a>
      </nav>
    </header>
  `,
  styles: ``
})
export class Header {

}
