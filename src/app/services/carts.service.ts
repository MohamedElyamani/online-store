import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
private cartCountSubject = new BehaviorSubject<number>(0);
cartCount$ = this.cartCountSubject.asObservable();
constructor(private _http: HttpClient) { }

getCart():Observable<any>{
return this._http.get(`${environment.baseUrl}/api/v1/cart`);
}
updateCartCount(count: number): void {
  this.cartCountSubject.next(count);
}
//Update cart product quantity
updateProductCount(productId: string, count: number): Observable<any> {
  return this._http.put(`${environment.baseUrl}/api/v1/cart/${productId}`,{"count": count});
}
removeItemFromCart(productId: string): Observable<any> {
  return this._http.delete(`${environment.baseUrl}/api/v1/cart/${productId}`);
}
addProductToCart(productId: string): Observable<any> {
    return this._http.post(`${environment.baseUrl}/api/v1/cart`, { "productId": productId });
  }
}