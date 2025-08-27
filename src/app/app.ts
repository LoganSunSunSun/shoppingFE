import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Home } from './home/home';
import { Authenticate } from './authenticate/authenticate';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Authenticate],
  template: 
  `

    <section class="content">
      <router-outlet />
    </section>
    
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('test');
}
