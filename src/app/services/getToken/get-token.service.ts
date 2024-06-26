import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetTokenService {

  constructor() { }
  getToken() {
    const header = new HttpHeaders({
      'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('loggedInUser') as string)?.accessToken}`
    })
    return header;
  }
}
