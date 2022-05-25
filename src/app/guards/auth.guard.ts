import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,CanActivate, Route, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  canActivate( route: ActivatedRouteSnapshot){
    return this.loginService.getUser().pipe(
      filter(val=> val !== null),
      take(1),
      map(user=>{
        if(!user){
          return this.router.parseUrl('/login');
        }else{
          return true;
        }
      })
    );
  }

  canLoad( route: ActivatedRouteSnapshot){
    return this.loginService.getUser().pipe(
      filter(val=> val !== null),
      take(1),
      map(user=>{
        if(user){          
          return this.router.parseUrl('invoice/list');
        }else{
          return true;
        }
      })
    );
  }
}
