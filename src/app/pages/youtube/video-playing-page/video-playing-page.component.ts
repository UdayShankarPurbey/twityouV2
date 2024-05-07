import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ErrorMsgService } from '../../../services/error-msg.service';
import { ToasterService } from '../../../services/toaster.service';
import { VideoService } from '../../../services/video/video.service';
import { CommentService } from '../../../services/comment/comment.service';

@Component({
  selector: 'app-video-playing-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
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

  

  constructor(
    private activeRoute: ActivatedRoute,
    private errormsg : ErrorMsgService,
    private message : ToasterService,
    private video : VideoService,
    private comment : CommentService,
  ) { }


  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.videoId = params.get('id') || '';
    });

    if(this.videoId) {
      this.loadVideo(this.videoId);
      this.loadComment(this.videoId, 1 , 10);
    }
  }

  loadVideo(id : string) {
    this.video.getVideoById(this.videoId).subscribe((res : any) => {
      console.log(res)
      this.videoData = res?.message;
      this.loadSuggestedVideo(1 , 10 ,res?.message[0]?.owner);
    },
    (error) => {
      console.log(error.error);
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

  loadComment(id : string , page?: number , limit ?: number) {
    id = '6618cd7d84a383b5d4c5bd2f'
    this.comment.getVideoComment(id ,page,limit).subscribe((res : any) => {
      console.log(res)
      this.comments = res.message;
    })
  }

  loadSuggestedVideo(page : number , limit : number ,ownerId : string) {
    this.video.getAllVideo(page ,limit ,ownerId).subscribe((res : any) => {
      console.log(res)
      this.suggestedVideo = res?.message
      this.suggestedVideo = this.suggestedVideo.filter((v : any) => v._id !== this.videoId)
      console.log(this.suggestedVideo);
    })
  }


  editComment(comment: any): void {
    // Logic for editing comment
  }

  likeComment(comment: any): void {
    // Logic for liking comment
  }

  deleteComment(comment: any): void {
    // Logic for deleting comment
  }

  commentOnComment(comment: any): void {
    // Logic for commenting on a comment
  }
}
