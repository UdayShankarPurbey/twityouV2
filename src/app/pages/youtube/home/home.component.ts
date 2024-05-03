import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  mouseEnter(event : MouseEvent) {
    const video = event.target as HTMLVideoElement;
    video.play();
  }

  mouserOut( event : MouseEvent) {
    const video = event.target as HTMLVideoElement;
    video.pause();
    video.currentTime = 0; // Reset video to start
  }
 

  
}
