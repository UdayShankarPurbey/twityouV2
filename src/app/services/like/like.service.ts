import { Injectable } from '@angular/core';
import { GetTokenService } from '../get-token.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { end_points } from '../../core/endpoints';
import { TypeEnum } from '../../core/type-enum';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http : HttpClient , private token : GetTokenService) { }

  likeComment(commentId : string) {
    return this.http.post(`${environment.api_base_url+end_points.likeComment}/${commentId}`,{}, {headers : this.token.getToken()});
  }

  likeVideo(videoId : string) {
    return this.http.post(`${environment.api_base_url+end_points.likeVideo}/${videoId}`,{}, {headers : this.token.getToken()});
  }

  likeTweet(tweetId : string) {
    return this.http.post(`${environment.api_base_url+end_points.likeTweet}/${tweetId}`,{}, {headers : this.token.getToken()});
  }

  likeData(type : TypeEnum ,id : string) {
    return this.http.post(`${environment.api_base_url+end_points.likeData}/${type}/${id}`,{}, {headers : this.token.getToken()});
  }
}
