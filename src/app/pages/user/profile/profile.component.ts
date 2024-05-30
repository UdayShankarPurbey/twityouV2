import { Component, OnInit } from '@angular/core';
import { LoggedInUserService } from '../../../services/loggedInUser/logged-in-user.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent  implements OnInit{

  constructor(
    private loginUser : LoggedInUserService,
    private userService : UserService,
  ) {}

  ngOnInit(): void {
    this.userProfile();
  }

  userProfile(){
    let loggedInUser = this.loginUser.getLoggedInUserId();

  }

}
