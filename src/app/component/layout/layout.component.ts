import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { GetTokenService } from '../../services/getToken/get-token.service';
import { CommonModule } from '@angular/common';
import { LoggedInUserService } from '../../services/loggedInUser/logged-in-user.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent  implements OnInit {
  userData : any;
  modalVisibility : boolean = false;
  constructor(private loggedInUser : LoggedInUserService) {}
  ngOnInit(): void {
    this.userData = this.loggedInUser.getLoggedInUserData()
    console.log(this.userData);
  }

  OpenMenu() {
    this.modalVisibility = !this.modalVisibility;
  }
}
