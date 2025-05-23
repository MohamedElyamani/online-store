import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
constructor(private _http: HttpClient) { }
displayRegisterData(data : object): Observable<any>{
 return this._http.post(`${environment.baseUrl}/api/v1/auth/signup`, data);
} 
displayLoginData(data : object): Observable<any>{
  return this._http.post(`${environment.baseUrl}/api/v1/auth/signin`, data);
 }
}
