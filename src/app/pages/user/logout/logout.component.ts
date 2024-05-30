import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor(
    private router : Router,
    private userService : UserService,
  ) {}

  logoutUser() {
    localStorage.removeItem('loggedInUser');
    this.userService.logout().subscribe((res : any) => {
      console.log(res);
      this.router.navigateByUrl('/login');
    })

    
  }

}
