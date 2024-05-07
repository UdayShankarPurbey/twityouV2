import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { end_points } from '../../core/endpoints';
import { GetTokenService } from '../get-token.service';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http : HttpClient , private token : GetTokenService) { }
  
  getAllVideo(page : number , limit : number , userId ?: string){
    if(userId) {
      return this.http.get(`${environment.api_base_url+end_points.video}/?page=${page}&limit=${limit}&userId=${userId}`,{headers : this.token.getToken()});
    } else {
      return this.http.get(`${environment.api_base_url+end_points.video}/?page=${page}&limit=${limit}`,{headers : this.token.getToken()});
    }
  }

  getVideoById(id : string) {
    return this.http.get(`${environment.api_base_url+end_points.video}/${id}`,{headers : this.token.getToken()});
  }
}
