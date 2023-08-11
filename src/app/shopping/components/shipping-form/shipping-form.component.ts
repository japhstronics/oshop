import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Order } from 'shared/models/order';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css'],
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping: any = {};
  UserSubscription: Subscription;
  userId;
  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.UserSubscription = this.authService.user$.subscribe(
      (user) => (this.userId = user.uid)
    );
  }

  ngOnDestroy() {
    this.UserSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['order-success', result.key]);
  }
}
