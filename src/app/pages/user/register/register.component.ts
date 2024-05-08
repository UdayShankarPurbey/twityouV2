import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { ErrorMsgService } from '../../../services/error-msg.service';
import { ToasterService } from '../../../services/toaster.service';

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
    formData.append('coverImage',this.coverImage);
    for (const key in this.registerForm.value) {
      formData.append(key, this.registerForm.value[key]);
    }
    this.user.register(formData).subscribe((res : any) => {
      console.log(res);
      this.message.showToast(res?.data , 'success')
    },
    (error) => {
      console.log(error.error);
      this.message.showToast(this.errormsg.errorMsgDisp(error.error) , 'error')   
    }
  )

  }

}
