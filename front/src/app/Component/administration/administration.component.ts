import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../Models/Product';
import {ProductService} from '../../Services/Product/product.service';
import { AuthService } from '../../Services/Auth/auth.service';
import {TokenStorageService} from '../../Services/Auth/token-storage.service';


@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  x = false;
  info: any;
  isLoggedIn = false;
  authority: string;
  roles: string[] = [];
  products: Product[]  = [] ;
  addForm: FormGroup = this.fb.group({
    productName: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    url : ['', Validators.required],
  });
  constructor(private authenticateService: AuthService,
              private productService: ProductService,
              private fb: FormBuilder,
              private tokenStorage: TokenStorageService) {
    this.info = {
      token: this.tokenStorage.getToken(),
      username: this.tokenStorage.getUsername(),
      authorities: this.tokenStorage.getAuthorities()
    };
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
    // @ts-ignore
    console.log(this.productService.getProducts().length);
  }

  ngOnInit(): void {
    this.products  = this.productService.getProducts();
  }

  // tslint:disable-next-line:typedef
  show(){
    this.x = true;
  }
  // tslint:disable-next-line:typedef
  update( i: number){
    const prod  = this.products[i];
    // @ts-ignore
    this.productService.update(prod);
  }
  // tslint:disable-next-line:typedef
  delete(i: number){
    const prod  = this.products[i];
    console.log(i);
    console.log(prod);
    // @ts-ignore
    this.productService.deleteProduct(prod);
  }

  // tslint:disable-next-line:typedef
  logout(){
   this.tokenStorage.signOut();  }

  // tslint:disable-next-line:typedef
  addProduct(){
    this.x = false;
    const str = this.addForm.value.url;
    const splitted = str.split('\\', 3);
    console.log(splitted[2]);
    const product = new Product(this.addForm.value.productName, this.addForm.value.description, this.addForm.value.price, splitted[2]);
    console.log(product);
    this.productService.addProduct(product);
  }
}
