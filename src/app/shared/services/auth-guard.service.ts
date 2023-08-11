import { Injectable } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private auth: AuthService, private router: Router) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    return this.auth.user$.pipe(
      map((user) => {
        if (user) {
          // authorised so return true
          return true;
        } else {
          // not logged in so redirect to login page with the return url
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: state.url },
          });
        }
        return false;
      })
    );
  }
}
