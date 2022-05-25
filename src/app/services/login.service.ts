import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  
  constructor() {this.loadUser()}

  storeUser(userData:{name: string, password: string}): Observable<any>{
    localStorage.setItem('user', JSON.stringify(userData))
    this.setUser(userData);
    return this.getUser();
  }

  loadUser(){
    var user = localStorage.getItem('user');
      if(user){
        this.currentUser.next(JSON.parse(user));
      }else{
        this.currentUser.next(false);
      }
  }

  setUser(user:{name: string, password: string}){
    this.currentUser.next(user);
  }

  getUser(){
    return this.currentUser.asObservable();
  }
}
