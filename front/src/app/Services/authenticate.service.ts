import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private router : Router) { }

  login(email : string , password : string){
    let user = {
      email : email,
      password : password,
      role : "admin"
    }
    // @ts-ignore
    localStorage.setItem("currentUser",JSON.stringify(user));
    this.router.navigate(['/home']);
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    window.location.reload();
  }

  signup (email : string , password : string){
    let user = {
      email : email,
      password : password
    }
    // @ts-ignore
    localStorage.setItem("currentUser",JSON.stringify(user));
    this.router.navigate(['/login']);
  }
  currentUserType() {
    return(JSON.parse(<string>localStorage.getItem('currentUser')).role);
  }
}
