import { Component, inject, OnInit } from '@angular/core';
import { ShippingService } from '../../services/shipping.service';
import { jwtDecode } from 'jwt-decode'; 
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { IAllOrders } from '../../interface/IAllOrders';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css'],
  standalone: true,
  imports: [DatePipe, CurrencyPipe, CommonModule, RouterLink]
})
export class AllOrdersComponent implements OnInit {

  private _ShippingService = inject(ShippingService)
  userId = this.getUserIdFromToken();
  cartDetails:IAllOrders[] = [];
  activePopupId: number | null = null;
  ngOnInit() {
    this.getUserIdFromToken();
    this.getAllOrders();
  }

  getAllOrders(){
    this._ShippingService.getUserOrders(this.userId).subscribe({
      next:(res : any) => {
        console.log(res);
        this.cartDetails = res;
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

  getUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
    return decodedToken.id ;
    }
    return null;
  }

  togglePopup(orderId: number) : void{
    this.activePopupId = this.activePopupId === orderId ? null : orderId;
  }

  closePopup() :void {
    this.activePopupId = null;
  }
}
