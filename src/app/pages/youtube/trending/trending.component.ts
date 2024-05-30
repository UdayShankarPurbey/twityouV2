import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../../services/comment/comment.service';
import { TypeEnum } from '../../../core/type-enum';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css'
})
export class TrendingComponent implements OnInit {
  videoId : string = '';
  commentData : any;

  constructor(
    private activeRoute: ActivatedRoute,
    private commentService : CommentService,
  ) {}
  ngOnInit(): void {

  this.videoId = '6618cdcf84a383b5d4c5bd32'

    if(this.videoId) {
      this.getComments(this.videoId);     
    }
   
  }

  getComments(videoId : string) {
    this.commentService.getAllComment(TypeEnum.Video,videoId).subscribe((res : any) => {
      res.message
      this.commentData = res.message;
      
    })

  }

  

}
