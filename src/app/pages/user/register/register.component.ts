import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { ErrorMsgService } from '../../../services/errorMessage/error-msg.service';
import { ToasterService } from '../../../services/toaster/toaster.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm : FormGroup;
  avatarImage : any;
  coverImage : any;
  constructor(
    private fb : FormBuilder ,
    private router : Router,
    private user : UserService,
    private errormsg : ErrorMsgService,
    private message : ToasterService,
  ) { 
    this.registerForm = fb.group({
      password:[],
      fullName:[],
      email:[],
      username:[],
      mobNo:[],
    })
  }

  fileUpload(event : any ) {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file,event.target.id);
      if(event.target.id == 'avatarImage') {
        this.avatarImage = file;
      } else {
        this.coverImage = file;
      }
    }
  }

  userRegister() {
    const formData = new FormData();
    formData.append('avatar',this.avatarImage);
    if(this.coverImage) {
      formData.append('coverImage',this.coverImage );
    }
    console.log(this.coverImage,this.avatarImage);
    for (const key in this.registerForm.value) {
      formData.append(key, this.registerForm.value[key]);
    }
    this.user.register(formData).subscribe((res : any) => {
      console.log(res);
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
      this.message.showToast(this.errormsg.errorMsgDisp(error.error) , 'error')   
    }
  )

  }

}
