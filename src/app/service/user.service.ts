import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interface/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 private apiLink = environment.apiLink;


  constructor(private http : HttpClient ) {}

  getUsers(): Observable<User[]> {
   return this.http.get<User[]>(`${this.apiLink}/users`);
  }

  createUser(user : User): Observable<User[]> {
    return this.http.post<User[]>(`${this.apiLink}/users`,user);
   }

   updateUser(user : User): Observable<User[]> {
    return this.http.put<User[]>(`${this.apiLink}/users`,user);
   }

  isLoggedIn():boolean{

    return false;

  }
}
