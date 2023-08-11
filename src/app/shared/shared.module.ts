import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ProductCardComponent, ProductQuantityComponent],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    NgbModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  exports: [
    CommonModule,
    ProductCardComponent,
    ProductQuantityComponent,
    FormsModule,
    DataTablesModule,
    NgbModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
  ],
})
export class SharedModule {}
