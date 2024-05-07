import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VideoService } from '../../../services/video/video.service';
import { error } from 'console';
import { ErrorMsgService } from '../../../services/error-msg.service';
import { ToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  videoData : any[] = [];
  page : number = 1;
  limit : number = 12;
  constructor(
    private video : VideoService,
    private errormsg : ErrorMsgService,
    private message : ToasterService,
  ) {}

  ngOnInit(): void {
    this.loadVideos();
  }  

  loadVideos() {

    this.video.getAllVideo(this.page , this.limit).subscribe(
      (res: any) => {
        console.log(res);
        this.videoData = res.message;
      },
      (error) => {
        console.log(error.error);
        this.message.showToast(this.errormsg.errorMsgDisp(error.error) , 'error')   
      }
    )
  }
}
