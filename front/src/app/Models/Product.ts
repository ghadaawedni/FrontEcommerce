import {Command} from './Command';

export class Product {
  // tslint:disable-next-line:variable-name
  product_id: number ;
  productName: string ;
  description: boolean ;
  price: number;
  url: string ;



  constructor(productName: string, description: boolean, price: number, url: string) {
    this.productName = productName;
    this.description = description;
    this.price = price;
    this.url = url;
  }
}
