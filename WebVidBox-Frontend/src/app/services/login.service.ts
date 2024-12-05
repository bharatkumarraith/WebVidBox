import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from '../models/login';
import { registartion } from '../models/registration';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient) { }

  login(login:login){
    return this.httpClient.post('http://localhost:5000/users/login',login);
  }

  register(login:registartion){
    return this.httpClient.post('http://localhost:5000/users/register',login);
  }
  getAccessToken(){
    return localStorage.getItem('token');
  }

  loginWithGoogle(){
    return this.httpClient.get('http://localhost:5000/auth/google/callback');
  }
}
