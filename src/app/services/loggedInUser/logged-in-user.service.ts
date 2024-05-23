import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserService {

  constructor() { }

  getLoggedInUserId() {
    return JSON.parse(localStorage.getItem('loggedInUser') as string)?.user?._id;
  }

  getLoggedInUserData() {
    return JSON.parse(localStorage.getItem('loggedInUser') as string)?.user;
  }
}
