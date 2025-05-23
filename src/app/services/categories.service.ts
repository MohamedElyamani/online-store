import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
 
constructor(private _http: HttpClient) { }
getCategories():Observable<any>{
  return this._http.get(`${environment.baseUrl}/api/v1/categories`);
}
}
