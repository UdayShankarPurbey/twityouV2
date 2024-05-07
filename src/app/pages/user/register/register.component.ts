import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm : FormGroup;
  constructor(
    private fb : FormBuilder ,
    private http : HttpClient
  ) { 
    this.registerForm = fb.group({
      password:[],
      fullName:[],
      email:[],
      username:[],
      mobNo:[],
      avatarImage : [],
      coverImage : [],
    })
  }

  userRegister() {
    console.log(this.registerForm.value);
    this.http.post('http://localhost:8000/api/v1/users/register', this.registerForm.value).subscribe((res : any) => console.log(res) )

  }
//   this.http.post('http://localhost:8000/api/v1/users/login',this.loginForm.value).subscribe((res : any) => {
//     console.log(res)
//     localStorage.setItem('accessToken',res.message.accessToken)
//     localStorage.setItem('refreshToken',res.message.refreshToken)
//     if(res?.message?.user) {
//       this.router.navigate(['/youtube'])
//     } else {
//       this.message.showToast('Login First' , "warning")
//       this.router.navigate(['/login']);
//     }

//   },
//   (error) => {
//     console.log(error.error);
//     this.message.showToast(this.errormsg.errorMsgDisp(error.error) , 'question')   
//   }
// )



}
