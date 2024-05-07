import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { end_points } from '../../core/endpoints';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http : HttpClient) { }
  getToken() {
      const header = new HttpHeaders({
      'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
    })
    return header;
  }
  
  getAllVideo(page : number , limit : number){
    const headers = this.getToken();
    return this.http.get(`${environment.api_base_url+end_points.getAllVideo}/?page=${page}&limit=${limit}`,{headers });
  }
}
