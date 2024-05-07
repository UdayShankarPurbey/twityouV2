import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
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
    private http : HttpClient
  ) {}

  ngOnInit(): void {
    this.loadVideos();
  }  

  loadVideos() {
    this.http.get(`http://localhost:8000/api/v1/videos/?page=${this.page}&limit=${this.limit}`).subscribe(
      (res: any) => {
        console.log(res);
        this.videoData = res.message;
      }
    )
  }
}
