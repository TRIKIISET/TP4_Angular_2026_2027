import { Component, computed, effect, signal, WritableSignal } from '@angular/core';
import { Item } from '../item';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { QueueAction } from 'rxjs/internal/scheduler/QueueAction';

@Component({
  imports: [DecimalPipe, TitleCasePipe],
  selector: 'app-cart-formatted',
  styleUrl: './cart-formatted.css',
  templateUrl: './cart-formatted.html',
})
export class CartFormatted {
    items : WritableSignal<Item[]>= signal<Item[]>([
    { id: 11, photo: 'articles/lait.jpg', name: 'lait', price: 1.35, quantity: 2 },
    { id: 12, photo: 'articles/pate.jpg', name: 'pâtes', price: 0.41, quantity: 1 },
    { id: 13, photo: 'articles/riz.jpg', name: 'riz', price: 3.8, quantity: 1 },
    { id: 14, photo: 'articles/yaourt.jpg', name: 'yaourt', price: 0.6, quantity: 6 }
  ]);

  totalItems = computed(() =>
    this.items().reduce((acc, item) => item.quantity + acc, 0))

  totalPrice = computed(() =>
    this.items().reduce((acc, item) => acc + item.quantity * item.price, 0)
  )
  discount = computed(()=>{
    if(this.totalPrice() >=100)
      return this.totalPrice()*0.02
    return 0
  })

  finalPrice = computed(()=>
  this.totalPrice() - this.discount()
)

  // updateQuantity(item: Article, value: number) {
  //   this.items.update(items =>
  //     items.map(art => {
  //       if (item.id == art.id)
  //         art.quantity = Math.max(art.quantity + value, 0)
  //       return art
  //     }).filter(art => art.quantity >0)
  //   )
  // }
  updateQuantity(item: Item, value: number) {
    item.quantity = item.quantity+value;
    this.items.update(items=>[...this.items()].filter(item=>item.quantity>0))

    // let copie = [...this.items()].filter(item=>item.quantity>0)

    // this.items.set(copie)
    // this.items.update(items=>
    //   [...items]
    //   (items.map(art=>(art.id==item.id)?
    //  {...art, quantity:Math.max(0, item.quantity+value)}
    //   :art
    // )).filter(art => art.quantity >0)
    // )
  }
  addItem(){
     let id= this.items()[this.items().length-1].id+1;
      let newItem = { id: id, photo: 'articles/eau.jpg', name: 'eau', price: 0.7, quantity: 1 }
    this.items.update(items=>[...items, newItem]   
    )
  }
    deleteItem(name:string){
    this.items.update(items => items.filter(a=>a.name !=name))
  }

  constructor(){
    effect(()=>
    console.log(this.items()))
  }
}

