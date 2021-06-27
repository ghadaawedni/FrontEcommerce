import { Component, OnInit } from '@angular/core';
import {Product} from '../../Models/Product';
import {Command} from '../../Models/Command';
import {ProductService} from '../../Services/Product/product.service';
import { AuthService } from '../../Services/Auth/auth.service';
import {TokenStorageService} from '../../Services/Auth/token-storage.service';
import {SignUpInfo} from '../../Models/signup-info';
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  info: any;
  isLoggedIn = false;
  authority: string;
  roles: string[] = [];
  products: Product[] = [];
  // tslint:disable-next-line:ban-types
  role: String = ' ';
  listProducts: Product[]  = [] ;
  // tslint:disable-next-line:ban-types
  nbProducts: Number = 0;
  // tslint:disable-next-line:ban-types
  finalPrice: Number = 0;
 // commands: Observable<Command[]> = [];

  constructor(private authenticateService: AuthService,
              private productService: ProductService,
              private tokenStorage: TokenStorageService) {
    // // @ts-ignore
    // this.products    = this.productService.getAllProducts();
    // this.role = this.authenticateService.currentUserType();
    // this.isAdmin = this.role == "admin";
  }

  ngOnInit(): void {
    this.info = {
    token: this.tokenStorage.getToken(),
    username: this.tokenStorage.getUsername(),
    authorities: this.tokenStorage.getAuthorities()
  };
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
    this.getProducts();
  }
  // tslint:disable-next-line:typedef
   buy(){
     // tslint:disable-next-line:no-unused-expression
    const user = {
      username: 'aymen'
    };
    // @ts-ignore
    const command = new Command( '22/08/2021', this.listProducts, user);
    console.log(command);
    this.productService.addCommand(command);
   }
  // tslint:disable-next-line:typedef
   getProducts(){
    this.products = this.productService.getProducts();
   }
  // // tslint:disable-next-line:typedef
  //  getCommands(){
  //   this.commands = this.productService.loadCommands();
  //  }
  // tslint:disable-next-line:typedef
  logout(){
    this.tokenStorage.signOut();  }
  // tslint:disable-next-line:typedef

  addToCard(i: number) {
    const prod  = this.products[i];
    // @ts-ignore
    this.nbProducts += 1;
    this.listProducts.push(prod);
    // @ts-ignore
    this.finalPrice += prod.price;
  }


}
