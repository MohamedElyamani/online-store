import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ShippingService } from '../../services/shipping.service';
import { stripeResponse } from '../../interface/IShipping';

@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  imports: [ReactiveFormsModule, RouterLink]
})
export class CheckoutComponent implements OnInit {
  private _ShippingService = inject(ShippingService)
  private _Router = inject(ActivatedRoute)
  cartId !: string | null;
  checkoutForm:FormGroup = new FormGroup({
    details : new FormControl(''),
    phone : new FormControl(''),
    city : new FormControl('')
  });


  ngOnInit() {
    this.cartId = this._Router.snapshot.paramMap.get('id');
  }

  checkout() {
    this._ShippingService.createShipping(this.cartId , this.checkoutForm.value).subscribe({
      next:(res : stripeResponse) => {
        if(res.status === 'success') {
          window.open(res.session.url, 'self');
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  closePopup() {
    this.checkoutForm.reset();
  }
}