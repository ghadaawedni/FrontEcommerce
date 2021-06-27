import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from '../../Models/Product';
// @ts-ignore
import {Command} from '../../Models/Command';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [];
  commands: Command[] = [];
  // tslint:disable-next-line:ban-types
  user: Object ;

  constructor(private router: Router, private httpClient: HttpClient) { }

  // tslint:disable-next-line:typedef
  getUserByUsername(username: string){
    const user = this.httpClient.get('http://localhost:8081/user/' + username)
      .subscribe(data => {
        return data;
      });
  }
  // tslint:disable-next-line:typedef
  getProducts(){
    this.products = [];

    this.httpClient
      .get('http://localhost:8081/product/getProducts')
      .subscribe( ( data ) => {
        // @ts-ignore
        data.map( dt => {
          if( dt.etat == 0)
          {
            this.products.push(dt);
          }
          console.log('ok');
        });
      });
    return this.products;
  }

  loadCommands(): Observable<Command[]>{
    const headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    headers.append('accept', 'application/json');
    return this.httpClient.get<Command[]>('http://localhost:8081/command/getCommands', {headers});
  }
  // getCommandes(){
  //   this.httpClient
  //     .get('http://localhost:8081/command/getCommands')
  //     .subscribe( ( data ) => {
  //       localStorage.setItem('currentUser',JSON.stringify(data));
  //       this.commandes = commandes;
  //     });
  //   return this.commandes;
  // }

  // tslint:disable-next-line:typedef
  addCommand(command: Command){
    this.httpClient
      .post<any>('http://localhost:8081/command/add', command)
      .subscribe( (  ) => {
          window.location.reload();
        }, (error) => {
          if (error.status === 400){
            console.log('your not registred yet !');
          }else if (error.status === 404){
            console.log('data invalid');
          }
        }
      );
  }

  updateProduct(product: Product): Observable<Product>{
    return this.httpClient.put<Product>('http://localhost:8081/product/update', product);
  }

  deleteProduct(product: Product){
    console.log(product.product_id);
    this.httpClient.get('http://localhost:8081/product/delete/' + product.product_id)
      .subscribe(data => {
          window.location.reload();
        }
      )
  }

  // tslint:disable-next-line:typedef
  addProduct(product: Product){
    this.httpClient
      .post<any>('http://localhost:8081/product/add', product)
      .subscribe( (  ) => {
          window.location.reload();
        }, (error) => {
          if (error.status === 400){
            console.log('your not registred yet !');
          }else if (error.status === 404){
            console.log('data invalid');
          }
        }
      );
  }
}
