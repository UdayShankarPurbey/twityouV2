import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { end_points } from '../../core/endpoints';
import { GetTokenService } from '../getToken/get-token.service';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(
    private http : HttpClient,
    private token : GetTokenService
  ) { }

  getTweets() {
    return this.http.get(`${environment.api_base_url + end_points.tweet}/`, { headers: this.token.getToken() });
  }

  getUserTweets(userId : string) {
    return this.http.get(`${environment.api_base_url + end_points.tweetData}/${userId}`, { headers: this.token.getToken() });
  }

  createTweet(data : string) {
    let reqobj = {
      content : data
    }
    return this.http.post(`${environment.api_base_url + end_points.tweet}/`, reqobj, { headers: this.token.getToken() });
  }

  updateTweet(tweetId : string,data : string) {
    let reqobj = {
      content : data
    }
    return this.http.patch(`${environment.api_base_url + end_points.tweet}/${tweetId}`, reqobj, { headers: this.token.getToken() });
  }

  deleteTweet(tweetId : string) {
    return this.http.delete(`${environment.api_base_url + end_points.tweet}/${tweetId}`, { headers: this.token.getToken() });
  }

}
