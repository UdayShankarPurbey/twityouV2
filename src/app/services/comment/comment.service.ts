import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { end_points } from '../../core/endpoints';
import { GetTokenService } from '../get-token.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {


  constructor(private http : HttpClient , private token : GetTokenService) { }

  
  getVideoComment(videoId : string, page? : number , limit ?: number) {
    page = page || 1;
    limit = limit || 10;
    return this.http.get(`${environment.api_base_url+end_points.comment}/${videoId}/?page=${page}&limit=${limit}`, {headers : this.token.getToken()});
  }
}
