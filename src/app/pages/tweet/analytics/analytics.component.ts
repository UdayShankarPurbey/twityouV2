import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../../services/comment/comment.service';
import { TweetService } from '../../../services/tweet/tweet.service';
import { LikeService } from '../../../services/like/like.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit{

  userData : any;

  constructor(
  
    
  ) {}
  ngOnInit(): void {

  }

 

  

}
