import { Component, OnInit } from '@angular/core';
import { LoggedInUserService } from '../../../services/loggedInUser/logged-in-user.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  loggedUser : any;
  constructor(
    private loggedInUser : LoggedInUserService,
  ) {}
  ngOnInit(): void {
    this.loggedUser = this.loggedInUser.getLoggedInUserData();  
  }

}
