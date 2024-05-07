import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-video-playing-page',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
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
    private http : HttpClient,
  ) { }


  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.videoId = params.get('id') || '';
    });

    if(this.videoId) {
      this.loadVideo(this.videoId);
      this.loadComment(this.videoId);
    }
  }

  loadVideo(id : string) {
    this.http.get(`http://localhost:8000/api/v1/videos/${this.videoId}`).subscribe((res : any) => {
      console.log(res)
      this.videoData = res?.message;
      this.loadSuggestedVideo(res?.message[0]?.owner);
    })
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

  loadComment(id : string) {
    id = '6618cd7d84a383b5d4c5bd2f'
    this.http.get(`http://localhost:8000/api/v1/comments/${id}/?page=1&limit=10`).subscribe((res : any) => {
      console.log(res)
      this.comments = res.message;
    })
  }

  loadSuggestedVideo(ownerId : string) {
    this.http.get(`http://localhost:8000/api/v1/videos/?page=1&limit=10&userId=${ownerId}`).subscribe((res : any) => {
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
