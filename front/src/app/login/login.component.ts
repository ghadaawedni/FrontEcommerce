import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/Auth/auth.service'
import { AuthLoginInfo } from '../Models/login-info';
import { TokenStorageService } from '../Services/Auth/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  errorMessage: '' | undefined ;
  form: any =  {};
  isLoginFailed = false;
  authority: string | undefined;
  private  roles: string[] | undefined;
  info: any;
  private loginInfo: AuthLoginInfo | undefined;
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void{
  }

  // tslint:disable-next-line:typedef
  onSubmit()
  {
    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.signIn(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
        this.isLoginFailed = false;
        this.roles = this.tokenStorage.getAuthorities();
        console.log(this.roles.toString());
        console.log(this.tokenStorage.getToken());
        if (this.roles.toString() === 'ROLE_ADMIN')
        {
          this.router.navigate(['/administration']);
        }
        else {
          this.router.navigate(['/home']);
        }
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
    // if (this.tokenStorage.getToken())
    //  {
    //    this.roles = this.tokenStorage.getAuthorities();
    //    this.roles.every(role => {
    //      if (role === 'ROLE_ADMIN') {
    //        this.authority = 'admin';
    //        return false;
    //      }
    //      console.log('role ' , this.authority);
    //    });
    //  }
  }

}
