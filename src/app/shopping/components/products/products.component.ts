import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;

  cart$: Observable<ShoppingCart>;
  constructor(
    private productService: ProductService,
    private CartService: ShoppingCartService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.cart$ = await this.CartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.productService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((action) =>
          action.map((a) => {
            const key = a.payload.key;
            const data = a.payload.val();
            return { key, ...data };
          })
        )
      )
      .subscribe((products) => {
        this.products = products;
        this.route.queryParamMap.subscribe((params) => {
          this.category = params.get('category');
          this.applyFilter();
        });
      });
  }

  private applyFilter() {
    this.filteredProducts = this.category
      ? this.products.filter((p) => p.category === this.category)
      : this.products;
  }
}
