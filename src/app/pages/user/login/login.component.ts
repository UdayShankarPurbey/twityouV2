import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule,Router } from '@angular/router';
import { ErrorMsgService } from '../../../services/error-msg.service';
import { ToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm : FormGroup
  constructor(private fb : FormBuilder ,
    private http : HttpClient ,
    private router : Router,
    private errormsg : ErrorMsgService,
    private message : ToasterService,
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      username: [''],
      password: ['']
    })
  }

  loginData() {
    console.log(this.loginForm.value);
    this.http.post('http://localhost:8000/api/v1/users/login',this.loginForm.value).subscribe((res : any) => {
      console.log(res)
      localStorage.setItem('accessToken',res?.message?.accessToken)
      localStorage.setItem('refreshToken',res?.message?.refreshToken)
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
