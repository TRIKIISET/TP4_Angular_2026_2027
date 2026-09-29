import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartC } from './cart-c/cart-c';
import { Counter } from './counter/counter';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CartC, Counter],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TP4');
}
