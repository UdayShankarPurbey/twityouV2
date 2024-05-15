import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ErrorMsgService } from '../../../services/error-msg.service';
import { ToasterService } from '../../../services/toaster.service';
import { VideoService } from '../../../services/video/video.service';
import { CommentService } from '../../../services/comment/comment.service';
import { LikeService } from '../../../services/like/like.service';
import { FormsModule } from '@angular/forms';
import { GetTokenService } from '../../../services/get-token.service';
import { TypeEnum } from '../../../core/type-enum';

@Component({
  selector: 'app-video-playing-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './video-playing-page.component.html',
  styleUrl: './video-playing-page.component.css'
})
export class VideoPlayingPageComponent implements OnInit {
  videoId: string = '';
  videoData: any;
  comments : any;
  suggestedVideo : any;
  thumbnailToshow: boolean = false;
  isVideoPlaying : boolean = false;
  buttonOpacity : number = 1;
  loggedInUserId : any;
  commentInputData : any;

  

  constructor(
    private activeRoute: ActivatedRoute,
    private errormsg : ErrorMsgService,
    private message : ToasterService,
    private video : VideoService,
    private commentService : CommentService,
    private like : LikeService,
    private token : GetTokenService,
  ) { }


  ngOnInit(): void {
    this.loggedInUserId = this.token.getLoggedInUserId();
    this.activeRoute.paramMap.subscribe(params => {
      this.videoId = params.get('id') || '';
    });

    if(this.videoId) {
      this.loadVideo(this.videoId);
      this.loadComment(1 , 10);
      this.loadLikeData();
    }
  }

  loadLikeData() {
    this.like.likeData(TypeEnum.Video,this.videoId).subscribe((res : any) => {
      console.log(res);
    })
  }

  loadVideo(id : string) {
    this.video.getVideoById(this.videoId).subscribe((res : any) => {
      this.videoData = res?.message;
      this.loadSuggestedVideo(1 , 10 ,res?.message[0]?.owner);
    },
    (error) => {
      console.error(error.error);
      this.message.showToast(this.errormsg.errorMsgDisp(error.error) , 'error')   
    }
  )
  }

  playVideo() {
    this.thumbnailToshow = true;
    const video = document.getElementById('videoPlayer') as HTMLVideoElement;  
    if (video.paused) {
      this.isVideoPlaying = true;
      video.play();
    } else {
      this.isVideoPlaying = false;
      video.pause();
    }
  }

  loadComment(page?: number , limit ?: number) {
    this.commentService.getAllComment(TypeEnum.Video,this.videoId ,page,limit).subscribe((res : any) => {
      this.comments = res?.message;
      for(let comment of this.comments) {
        this.CommentofComment(comment?._id).then((comments) => {
          comment.commentData = comments;
        });
      }
    })
  }

  CommentofComment(commentId : string, page ?: number, limit ?: number) {
    return this.commentService.getAllComment(TypeEnum.Comment,commentId,page,limit).toPromise().then((commentData : any) => {
      return commentData?.message?.length > 0 ? commentData?.message : [];
    })
  }
  // CommentofComment(commentId: string, page?: number, limit?: number) {
  //   return this.commentService.getAllComment(CommentTypeEnum.Comment, commentId, page, limit).toPromise().then((commentData: any) => {
  //     return commentData?.message?.length > 0 ? commentData?.message : [];
  //   });
  // }

  loadSuggestedVideo(page : number , limit : number ,ownerId : string) {
    this.video.getAllVideo(page ,limit ,ownerId).subscribe((res : any) => {
      this.suggestedVideo = res?.message
      this.suggestedVideo = this.suggestedVideo.filter((v : any) => v._id !== this.videoId)
    })
  }


  editComment(commentData: any): void {
    console.log(commentData);
    commentData.isEditing = true;
    commentData.isReplying = commentData?.content;
    commentData.mode = 'edit';
  }

  likeComment(commentData: any): void {
    this.like.likeComment(commentData?._id).subscribe((res : any) => {
      this.message.showToast(res?.data , 'success')
      this.loadComment()
    },
    (error) => {
      console.error(error.error);
      this.message.showToast(this.errormsg.errorMsgDisp(error.error) , 'error')   
    }
    )
  }

  deleteComment(commentData: any): void {
    this.commentService.deleteComment(commentData?._id).subscribe((res : any) => {
      this.message.showToast(res?.data , 'warning');
      this.loadComment()
    },
    (error) => {
      console.error(error.error);
      this.message.showToast(this.errormsg.errorMsgDisp(error.error) , 'error')   
    })
  }

  commentOnComment(commentData: any): void {
    commentData.isEditing = true;
    if(commentData.commentData) {
      commentData.mode = 'comment';
    } else {
      commentData.mode = 'subComment';
    }
  }

  showButtons() {
    document.getElementById("commentButtons")!.style.display = "block";
  }

  submitComment(data ?: any) {
    if(this.commentInputData) {
      this.commentService.addComment(TypeEnum.Video,this.videoId , this.commentInputData).subscribe((res : any) => {
        
        this.message.showToast(res?.data , 'success')
        this.commentInputData = '';
        this.loadComment()
      } ,
      (error) => {
        console.error(error.error);
        this.message.showToast(this.errormsg.errorMsgDisp(error.error) , 'error')   
      })
    } else {
      this.message.showToast('Please Enter comment  To Add Comment' , 'info')
    }
    
    document.getElementById("commentButtons")!.style.display = "none"; // Hide buttons
  }

  cancelComment() {
    document.getElementById("commentButtons")!.style.display = "none"; // Hide buttons
  }


  submitEditedComment(comment: any) {
    if(comment?.mode === 'edit') {
      this.commentService.updateComment(comment?._id, comment?.isReplying).subscribe((res : any) => {
        this.message.showToast(res?.data , 'success')
        this.loadComment()
      },
      (error) => {
        console.error(error.error);
        this.message.showToast(this.errormsg.errorMsgDisp(error.error) , 'error')   
      })
    } else if(comment?.mode === 'subComment') {
      // console.log(comment);
      this.commentService.addComment(TypeEnum.Comment,comment?._id,comment?.isReplying).subscribe((res : any) => {
        this.message.showToast(res?.data , 'success')
        this.loadComment();
      },
      (error) => {
        console.error(error.error);
        this.message.showToast(this.errormsg.errorMsgDisp(error.error) , 'error')   
      })

    } else {
      this.commentService.addComment(TypeEnum.Comment,comment?._id,comment?.isReplying).subscribe((res : any) => {
        this.message.showToast(res?.data , 'success')
        this.loadComment();
      },
      (error) => {
        console.error(error.error);
        this.message.showToast(this.errormsg.errorMsgDisp(error.error) , 'error')   
      })
    }
   
    comment.isEditing = false;
  }

  cancelEdit(comment: any) {
    console.log(comment);
    comment.isEditing = false;
    comment.isReplying = null;
  }
}
