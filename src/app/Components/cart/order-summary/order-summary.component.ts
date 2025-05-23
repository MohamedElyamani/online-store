import { CurrencyPipe } from '@angular/common';
import { Component, inject, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-order-summary',
  standalone: true,
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
  imports: [FormsModule, CurrencyPipe, RouterLink]
})
export class OrderSummaryComponent implements OnInit {

  @Input() subTotal: number = 0;
  @Input() total: number = 0;
  @Input() totalTax: number = 0;
  @Input() itemId!: string;
  discount: number = 0;
  //@ViewChild('checkOut', { read: ViewContainerRef }) checkOut!: ViewContainerRef;
  private _router = inject(Router)

  ngOnInit() {
  }

  applyDiscount() {
    this.total = (this.subTotal + this.totalTax) - this.discount;
  }

// showCheckOut() : void {
//   this.checkOut.clear();
//   this.checkOut.createComponent(CheckoutComponent);
// }
  
}
