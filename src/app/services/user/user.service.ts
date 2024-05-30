import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { end_points } from '../../core/endpoints';
import { GetTokenService } from '../getToken/get-token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http : HttpClient, 
    private token : GetTokenService,
  ) { }

  register (data : any) {
    return this.http.post(`${environment.api_base_url+end_points.register}`, data);
  }

  login (data : any){
    return this.http.post(`${environment.api_base_url+end_points.login}`, data);
  }

  logout() {
    return this.http.get(`${environment.api_base_url+end_points.logout}`,  {headers : this.token.getToken()});
  }

}
