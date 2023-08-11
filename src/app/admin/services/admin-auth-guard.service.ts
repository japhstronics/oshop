import { Injectable } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from 'shared/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard {
  constructor(private auth: AuthService, private useService: UserService) {}
  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(map((appUser) => appUser.isAdmin));
  }
}
