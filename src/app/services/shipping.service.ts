
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IShipping, stripeResponse } from '../interface/IShipping';
import { environment } from '../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
constructor(private HttpClient:HttpClient) { }

createShipping( cartId:string | null,shipping:IShipping) : Observable<stripeResponse>{
  return this.HttpClient.post<stripeResponse>(`${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${environment.urlServer}`,
  {'shippingAddress' : shipping}
  )
}

getUserOrders(userId:string | null){
return this.HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${userId}`);
}
}
