import { computed, Service, signal } from '@angular/core';
export interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
@Service()
export class Cart {
    cartItems = signal<Item[]>([
    { id: 1, name: 'Clavier Mécanique', price: 80, quantity: 1 },
    { id: 2, name: 'Souris Sans Fil', price: 45, quantity: 2 }
  ]);

  // 2. Computed Signals (Calculs dérivés automatiques)
  totalItems = computed(() => 
    this.cartItems().reduce((acc, item) => acc + item.quantity, 0)
  );

  totalPrice = computed(() => 
    this.cartItems().reduce((acc, item) => acc + (item.price * item.quantity), 0)
  );

  // Remise automatique si total > 150
  discount = computed(() => this.totalPrice() > 150 ? 20 : 0);
  finalPrice = computed(() => this.totalPrice() - this.discount());

  // Actions
  updateQuantity(id: number, delta: number) {
    this.cartItems.update(items =>
      items.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  }

  addItem(name: string, price: number) {
    const newItem: Item = { id: Date.now(), name, price, quantity: 1 };
    this.cartItems.update(items => [...items, newItem]);
  }
}
