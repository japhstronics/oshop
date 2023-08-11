import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';
import { GoogleAuthProvider, getAuth, signInWithRedirect } from 'firebase/auth';
import { Observable, switchMap, of } from 'rxjs';
import * as firebase from 'firebase/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'shared/services/user.service';
import { AppUser } from 'shared/models/app-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User>;
  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private useService: UserService
  ) {
    this.user$ = afAuth.authState;
  }

  login() {
    // Sign in using a redirect.
    const firebaseApp = initializeApp(environment.firebase);
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    signInWithRedirect(auth, provider);
  }

  logout() {
    this.afAuth.signOut().then((result: any) => {
      this.router.navigate(['/']);
    });
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.useService.get(user.uid).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
}
