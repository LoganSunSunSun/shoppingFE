import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header>
      <nav>
        <a routerLink="/admin/dashboard">Home</a>
        <a routerLink="/admin/orders">Orders</a>
      </nav>
    </header>
  `,
  styles: ``
})
export class AdminHeader {

}
