import { Component, OnInit } from '@angular/core';
import { TweetService } from '../../../services/tweet/tweet.service';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../../services/comment/comment.service';
import { TypeEnum } from '../../../core/type-enum';
import { TimeAgoPipePipe } from '../../../services/pipe/TimeAgoPipe/time-ago-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { LoggedInUserService } from '../../../services/loggedInUser/logged-in-user.service';
import { LikeService } from '../../../services/like/like.service';
import { ToasterService } from '../../../services/toaster/toaster.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TimeAgoPipePipe,
    FormsModule,

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  userTweetData : any;
  userTweetInputData : any;
  loggedInUser : any;
  

  constructor(
    private tweetService : TweetService,
    private commentService : CommentService,
    private loggedUserService : LoggedInUserService,
    private likeService : LikeService,
    private tosterService : ToasterService,
  ) {}

  ngOnInit(): void {
    this.loggedUserFetch();
    this.getTweet();    
  }

  loggedUserFetch() {
    this.loggedInUser = this.loggedUserService.getLoggedInUserId();
  }
  getTweet() {
    this.tweetService.getTweets().subscribe((res : any) => {
      this.userTweetData = res.message;

      for(let comment of res.message) {

        this.likeService.likeData(TypeEnum.Tweet, comment._id).subscribe((res : any) => {
          this.likeService.likeCount(TypeEnum.Tweet , comment._id).subscribe((res : any) => {
            comment.likeCount = res?.message[0]?.liked;
          })
          comment.isLiked = res?.message?.length > 0? true : false;
        })

        this.commentService.getAllComment(TypeEnum.Tweet,comment._id).subscribe((res : any) => {
          comment.commentData = res.message;

          for(let subComment of res?.message) {
            this.likeService.likeData(TypeEnum.Comment, subComment._id).subscribe((res : any) => {
              this.likeService.likeCount(TypeEnum.Comment , subComment._id).subscribe((res : any) => {
                subComment.likeCount = res?.message[0]?.liked;
              })
              subComment.isLiked = res?.message?.length > 0? true : false;
            })

            this.commentService.getAllComment(TypeEnum.Comment,subComment._id).subscribe((res : any) => {
              subComment.commentData = res.message;
              for(let subSubComment of res?.message) {
                this.likeService.likeData(TypeEnum.Comment, subSubComment._id).subscribe((res : any) => {
                  
                  this.likeService.likeCount(TypeEnum.Comment , subSubComment._id).subscribe((res : any) => {
                    subSubComment.likeCount = res?.message[0]?.liked;
                  })
                  subSubComment.isLiked = res?.message?.length > 0? true : false;
                })
                for(let repliedComment of subSubComment?.repliedComment) {
                    this.likeService.repliedCommentData(subSubComment._id , repliedComment._id).subscribe((res : any) => {
                      this.likeService.repliedLikeCount(repliedComment._id).subscribe((res : any) => {
                        repliedComment.likeCount = res?.message[0]?.liked;
                      })
                      repliedComment.isLiked = res?.message?.length > 0 ? true : false;
                    })
                }
              }
            })
          }
        })
      }
      console.log(this.userTweetData);
    });
  }

  isEmptyObject(obj: any): boolean {
    return obj?.username == null ? true : false;
  }

  createTweet() {
    this.tweetService.createTweet(this.userTweetInputData).subscribe((tweets : any) => {
      this.userTweetInputData = '';
      this.getTweet();
    })
  }

  retweetTweet(data : any) {
    this.tosterService.showToast('Fetaure Implemented Soon Your ReTweet Data : ' + data?.content ,'info');
  }

  showComment() {
    this.tosterService.showToast('Fetaure Implemented Soon Untill Then its Viewed By default ','info');
  }

  commentData(data : any) {
    data.isEditing = true;
  }

  editData(data : any) {
    if(data.commentText) {
      data.mode = 'edit';
      data.isEditing = true;
      data.inputData = data.commentText;
    } else {
      data.mode = 'edit';
      data.isEditing = true;
      data.inputData = data.content;
    }
  }

  deleteData(data : any,mode : string ,parentId?: string) {
    if(mode === 'tweet') {
      this.tweetService.deleteTweet(data._id).subscribe((res : any) => {        
        this.getTweet();
      })
    } else if(mode === 'comment') {
      this.commentService.deleteComment(data._id).subscribe((res : any) => {
        this.getTweet();
      })
    } else if(mode === 'subComment') {
      this.commentService.deleteComment(data._id).subscribe((res : any) => {
        this.getTweet();
      })     
    } else if(mode ==='repliedComment') {
      if(parentId) {
        this.commentService.deleteRepliedComment(data._id , parentId).subscribe((res : any) => {
          this.getTweet();
        });
      } 
    } else {
      this.tosterService.showToast('Please Provide a Mode ','error');
    }

  }

  cancelReply(data : any) {
    data.isEditing = false;
    data.inputData = null;
  }

  submitReply(data : any , mode : string ,parentId?: string) {
    data.isEditing = false;
    if(mode === 'tweet') {
      if(data.mode == 'edit') {
        this.tweetService.updateTweet(data._id,data.inputData).subscribe((res : any) => {
          this.getTweet();
          data.inputData = null;
        })
      } else {
        this.commentService.addComment(TypeEnum.Tweet,data._id,data.inputData).subscribe((res : any) => {
          this.getTweet();
          data.inputData = null;
        })
      }
    } else if(mode === 'comment') {
      if(data.mode == 'edit') {
        this.commentService.updateComment(data._id , data.inputData).subscribe((res : any) => {
          console.log(res);
          this.getTweet();
          data.inputData = null;
        })
      } else {
        this.commentService.addComment(TypeEnum.Comment,data._id,data.inputData).subscribe((res : any) => {
          this.getTweet();
          data.inputData = null;
        })        
      }
    } else if(mode === 'subComment') {
      if(data.mode == 'edit') {
        this.commentService.updateComment(data._id, data.inputData).subscribe((res : any) => {
          this.getTweet();
          data.inputData = null;
        })
      } else {
        this.commentService.addRepliedComment(data._id,data.inputData).subscribe((res : any) => {
          this.getTweet();
          data.inputData = null;
        }) 
      }
    } else if(mode ==='repliedComment') {
      if(data.mode == 'edit') {
        if(parentId) {
          this.commentService.editRepliedComment(data._id,parentId,data.inputData).subscribe((res : any) => {
            this.getTweet();
            data.inputData = null;
          })
        }
      }   
    } else {
      this.tosterService.showToast('Please Provide a Mode ','error');
      data.inputData = null;
    }
  }

  toggleLike(data : any , mode : string ,parentId?: string) {
    console.log(data , 'mode ',mode, parentId);
    if(mode === 'tweet') {
      this.likeService.likeTweet(data._id).subscribe((res : any) => {
        this.getTweet();
      })
    } else if(mode === 'comment') {
      this.likeService.likeComment(data._id).subscribe((res : any) => {
        this.getTweet();
      })      
    } else if(mode === 'subComment') {
      this.likeService.likeComment(data._id).subscribe((res : any) => {
        this.getTweet();
      })        
    } else if(mode ==='repliedComment') {
      if(parentId) {
        this.likeService.likeRepliedComment(data._id ,parentId).subscribe((res : any) => {
          this.getTweet();
        })
      } 
    } else {
      this.tosterService.showToast('Please Provide a Mode ','error');
    }
    
  }



  
  

  

  
 

  


 
}
