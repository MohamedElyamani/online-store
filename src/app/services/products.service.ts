import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
constructor(private _http: HttpClient) { }
getProducts(itemsPerPage?: number, currentPage?: number):Observable<any>{
  return this._http.get(`${environment.baseUrl}/api/v1/products`, {
    params: {
      limit: itemsPerPage ? itemsPerPage.toString() : '' ,
      page: currentPage ? currentPage.toString() : ''
    }
  });
}
getProductById(ProductId : string):Observable<any>{
  return this._http.get(`${environment.baseUrl}/api/v1/products/${ProductId}`);
}
getProductsByCategory(categoryId: string, itemsPerPage: number, currentPage: number): Observable<any> {
  return this._http.get(`${environment.baseUrl}/api/v1/products`, {
    params: {
      category: categoryId,
      limit: itemsPerPage.toString(),
      page: currentPage.toString(),
    }
  });
}
}
