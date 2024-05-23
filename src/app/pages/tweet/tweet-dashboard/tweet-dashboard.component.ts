import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoggedInUserService } from '../../../services/loggedInUser/logged-in-user.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-tweet-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    HeaderComponent
  ],
  templateUrl: './tweet-dashboard.component.html',
  styleUrl: './tweet-dashboard.component.css'
})
export class TweetDashboardComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  

}
