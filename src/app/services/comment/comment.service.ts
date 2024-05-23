import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { end_points } from '../../core/endpoints';
import { GetTokenService } from '../getToken/get-token.service';
import { TypeEnum } from '../../core/type-enum';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http : HttpClient , private token : GetTokenService) { }
  
  getAllComment(type : TypeEnum,id : string, page? : number , limit ?: number) {
    page = page || 1;
    limit = limit || 10;
    console.log(this.token.getToken());
    return this.http.get(`${environment.api_base_url+end_points.comment}/${type}/${id}/?page=${page}&limit=${limit}`, {headers : this.token.getToken()});
  }

  updateComment(id : string , body : any) {
    let reqobj = {
      content : body
    }
    return this.http.patch(`${environment.api_base_url+end_points.commentUpdation}/${id}`, reqobj, { headers: this.token.getToken() });
  }

  deleteComment(id : string) {
    return this.http.delete(`${environment.api_base_url+end_points.commentUpdation}/${id}`, { headers: this.token.getToken() });
  }

  addComment(type : TypeEnum , id : string, data : string) {
    let reqobj = {
      content : data
    }
    return this.http.post(`${environment.api_base_url+end_points.comment}/${type}/${id}`, reqobj, { headers: this.token.getToken() });
  }

  addRepliedComment(id :string, data : any) {
    return this.http.post(`${environment.api_base_url+end_points.commentReplied}/${id}`, {  
      content : data
    }, { headers: this.token.getToken() });
  }

  editRepliedComment(commentId :string,repliedCommentId : string, data : any) {
    return this.http.patch(`${environment.api_base_url+end_points.commentReplied}/${commentId}/${repliedCommentId}`, {  
      content : data
    }, { headers: this.token.getToken() });
  }

  deleteRepliedComment(commentId :string,repliedCommentId : string) {
    return this.http.delete(`${environment.api_base_url+end_points.commentReplied}/${commentId}/${repliedCommentId}`, { headers: this.token.getToken() });
  }

}
