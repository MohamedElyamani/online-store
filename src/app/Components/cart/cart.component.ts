import { Component, inject, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { ICart } from '../../interface/icart';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

 

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [OrderSummaryComponent, CurrencyPipe ]
})
export class CartComponent implements OnInit {

  cartDetails: ICart = {} as ICart;
  total: number = 0;
  totalTax : number = 0
  private _cartService = inject(CartsService)
  private _router = inject(Router)
  

  ngOnInit() {
    this.getCart();
  }

  getCart() {
    this._cartService.getCart().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        this.calcTotal();
        this.calcTotalTax();
        //console.log(this.cartDetails);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  calcTotalTax() {
    this.totalTax = (this.cartDetails.totalCartPrice * 14) / 100;
  }
  calcTotal() {
    this.calcTotalTax();
    this.total = this.cartDetails.totalCartPrice + this.totalTax;
  }
  updateProductCount(productId:string, count: number) {
   if(count > 0){
    this._cartService.updateProductCount(productId, count).subscribe({
      next: (cartRes) => {
        this.getCart();
        this._cartService.updateCartCount(cartRes.numOfCartItems);
      }
    })
   }
  }
  removeFromCart(productId:string){
    this._cartService.removeItemFromCart(productId).subscribe({
      next: (cartRes) => {
        this.getCart();
        this._cartService.updateCartCount(cartRes.numOfCartItems);
      }
    })
  }

}
