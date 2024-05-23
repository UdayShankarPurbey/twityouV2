import { Component, OnInit } from '@angular/core';
import { TweetService } from '../../../services/tweet/tweet.service';
import { CommentService } from '../../../services/comment/comment.service';
import { CommonModule } from '@angular/common';
import { TypeEnum } from '../../../core/type-enum';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
   
  tweetData : any;

  constructor(
    private tweetservice : TweetService,
    private commentService : CommentService,
  ) {}

  ngOnInit(): void {
    this.tweetservice.getTweets().subscribe((res : any) => {
      console.log(res);
      this.tweetData = res.message;
      for(let tweet of this.tweetData) {
        this.CommentofTweet(tweet?._id).then((tweet) => {
          this.tweetData.commentData = tweet;
        });
      }
      console.log(this.tweetData);
    })
  }

  CommentofTweet(tweetId : string, page ?: number, limit ?: number) {
    return this.commentService.getAllComment(TypeEnum.Tweet,tweetId,page,limit).toPromise().then((tweetData : any) => {
      return tweetData?.message?.length > 0 ? tweetData?.message : [];
    })
  }

  createTweet(data : any) {

  }

  editTweet(data : any) {
    console.log(data);

  }

  deleteTweet(data : any) {
    console.log(data);

  }

  retweetTweet(data : any) {
    console.log(data);

  }

  commentTweet(data : any) {
    console.log(data);

  }

}
