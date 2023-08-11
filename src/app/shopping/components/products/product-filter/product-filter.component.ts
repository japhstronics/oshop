import { Component, Input } from '@angular/core';
import { map } from 'rxjs';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent {
  categories$;
  @Input('category') category;

  constructor(private categoryService: CategoryService) {
    this.categories$ = categoryService
      .getCategories()
      .snapshotChanges()
      .pipe(
        map((action) =>
          action.map((c) => {
            const key = c.payload.key;
            const data = c.payload.val();
            return { key, ...data };
          })
        )
      );
  }
}
