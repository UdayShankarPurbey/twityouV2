import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

type Icon = "success" | "error" | "warning" | "info" | "question";

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor() { }

  showToast(msg : string , icon : Icon) : void {
    const toastMixin = Swal.mixin({
      toast: true,
      icon: icon,
      title: 'General Title',
      animation: false,
      position: 'top-right',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    toastMixin.fire({
      animation: true,
      title: msg
    });
  }
}
