import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnDestroy, OnInit {
  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;
  dtOptions: DataTables.Settings = {};

  constructor(private productService: ProductService) {
    this.subscription = this.productService
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
      .subscribe(
        (products) => (this.filteredProducts = this.products = products)
      );
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter((p) =>
          p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        )
      : this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      dom: 'lrtip',
      columnDefs: [{ orderable: false, targets: [2, 3] }],
    };
  }
}
