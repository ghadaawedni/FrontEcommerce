import {Injectable} from '@angular/core';
import {SignUpInfo} from '../../Models/signup-info';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SignupService
{
  constructor(private router: Router, private httpClient: HttpClient) { }


  // @ts-ignore
  // tslint:disable-next-line:typedef
  signUp(user: SignUpInfo){
  //   return this.httpClient.post<SignUpInfo>('http://localhost:8081/api/auth/signup', user);
  // }
    console.log(user);
    this.httpClient
      .post<any>('http://localhost:8081/api/auth/signup', user)
      .subscribe( (  ) => {
          this.router.navigate(['/login']);

        }, (error) => {

        // tslint:disable-next-line:triple-equals
          if (error.status == 400){
            console.log('your not registred yet !');
            // tslint:disable-next-line:triple-equals
          }else if (error.status == 404){
            console.log('data invalid');
          }
        }
      );
  }
}
