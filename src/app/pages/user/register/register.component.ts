import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm : FormGroup;
  constructor(private fb : FormBuilder) { 
    this.registerForm = fb.group({
      password:[],
      fullName:[],
      email:[],
      username:[],
      mobNo:[],
      avatarImage : [],
    })
  }

  userRegister() {
    console.log(this.registerForm.value);
  }


}
