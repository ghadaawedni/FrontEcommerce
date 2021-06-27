import {Product} from './Product';
import {SignUpInfo} from './signup-info';
import {Observable} from 'rxjs';

export class Command {
  // tslint:disable-next-line:variable-name
  command_id: number;
  date: string;
  products: Product[] = [];
  // tslint:disable-next-line:ban-types
  user: Object;


  // tslint:disable-next-line:ban-types
  constructor(date: string, products: Product[], user: Object) {
    this.date = date;
    this.products = products;
    this.user = user;
  }
}
