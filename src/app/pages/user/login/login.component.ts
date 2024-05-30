import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule,Router } from '@angular/router';
import { ErrorMsgService } from '../../../services/errorMessage/error-msg.service';
import { ToasterService } from '../../../services/toaster/toaster.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm : FormGroup
  constructor(private fb : FormBuilder ,
    private router : Router,
    private errormsg : ErrorMsgService,
    private message : ToasterService,
    private user : UserService
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      username: [''],
      password: ['']
    })
  }

  loginData() {
    this.user.login(this.loginForm.value).subscribe((res : any) => {
      console.log(res)
      localStorage.setItem('loggedInUser',JSON.stringify(res?.message));
      this.message.showToast(res?.data , 'success')
      if(res?.message?.user) {
        this.router.navigate(['/youtube'])
      } else {
        this.message.showToast('Login First' , "warning")
        this.router.navigate(['/login']);
      }

    },
    (error) => {
      console.log(error.error);
      this.message.showToast(this.errormsg.errorMsgDisp(error.error) , 'question')   
    }
  )


  }

  

}
