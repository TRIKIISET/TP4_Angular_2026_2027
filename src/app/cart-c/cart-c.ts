import { Component, effect, inject } from '@angular/core';
import { Cart } from '../cart';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-cart-c',
  styleUrl: './cart-c.css',
  templateUrl: './cart-c.html',
})
export class CartC {
  cart = inject(Cart);

  constructor() {
    // 3. Effect : Exécuté à chaque fois qu'un signal lu à l'intérieur change
    effect(() => {
      console.log(`[LOG CART] Articles dans le panier: ${this.cart.totalItems()} | Total: ${this.cart.finalPrice()} €`);
    });
  }
}
