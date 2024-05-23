import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VideoService } from '../../../services/video/video.service';
import { error } from 'console';
import { ErrorMsgService } from '../../../services/errorMessage/error-msg.service';
import { ToasterService } from '../../../services/toaster/toaster.service';

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
    this.loadVideos(this.page , this.limit);
  }  

  loadVideos(page : number , limit : number) {
    this.video.getAllVideo(page , limit).subscribe(
      (res: any) => {
        console.log(res);
        this.videoData = [...this.videoData , ...res?.message];
      },
      (error) => {
        console.log(error.error);
        this.message.showToast(this.errormsg.errorMsgDisp(error.error) , 'error')   
      }
    )
  }
 
  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    // Your scroll handling code here
    // console.log(`
    // Scroll Height: ${document.documentElement.scrollHeight}px
    // Scroll Top: ${document.documentElement.scrollTop}px
    // Client Height: ${document.documentElement.clientHeight}px
    // `);
    if(document.documentElement.scrollTop + document.documentElement.clientHeight + 1 >= document.documentElement.scrollHeight) {
      console.log(`
    Scroll Height: ${document.documentElement.scrollHeight}px
    Scroll Top: ${document.documentElement.scrollTop}px
    Client Height: ${document.documentElement.clientHeight}px
    `);
      this.page += 1;
      this.loadVideos(this.page , this.limit)
    }
  }

}
