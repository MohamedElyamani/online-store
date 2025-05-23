import { Subscription } from 'rxjs';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartsService } from '../../services/carts.service';
import { on } from 'events';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit, OnDestroy {
  private _Router  = inject(Router)
  cartCount : number = 0;
  Subscription !: Subscription;

  constructor(private _CartsService : CartsService) { }
  
  ngOnInit(): void {
    this._CartsService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  
    // Also fetch the cart initially
    this._CartsService.getCart().subscribe({
      next: (res) => {
        this._CartsService.updateCartCount(res.numOfCartItems);
      }
    });
  }
  logout() : void {
    this._Router.navigate(['login'])
    localStorage.removeItem('token');
  }

  ngOnDestroy(): void {
   // this.Subscription.unsubscribe();
  }
}
