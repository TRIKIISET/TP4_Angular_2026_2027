import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Counter } from './counter/counter';
import { Cart } from './cart/cart';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  Counter, Cart],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TP4');
}
