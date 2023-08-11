import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Product } from 'shared/models/product';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css'],
})
export class ProductQuantityComponent {
  @Input('product') product;
  @Input('shopping-cart') shoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) {}

  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product);
  }

  removeFromCart(product) {
    this.shoppingCartService.removeFromCart(product);
  }
}
