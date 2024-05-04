import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm : FormGroup
  constructor(private fb : FormBuilder , private http : HttpClient) {
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
      localStorage.setItem('accessToken',res.message.accessToken)
      localStorage.setItem('refreshToken',res.message.refreshToken)
    })

  }

}
