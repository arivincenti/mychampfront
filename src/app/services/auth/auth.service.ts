import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{

  url = "http://mychampapi.test/api/";
  userToken: string;
  user: UserModel;

  constructor(private http: HttpClient, private router: Router)
  {
    this.readToken();
  }

  getToken(user: UserModel)
  {

    let data = {
      grant_type: "password",
      client_id: 2,
      client_secret: "QWXOF0s3hRXnd5SHVOXpN1IbKH88hRH25wdPIEzC",
      username: user.email,
      password: user.password
    }

    return this.http.post(this.url + 'oauth/token', data).pipe(map(data =>
    {
      this.storageToken(data['access_token'], data['expires_in']);
      return data;
    }));
  }

  logout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('expireIn');
    this.router.navigateByUrl('/login');
  }

  signup(user: UserModel, passwordConfirmation: string)
  {
    let data = {
      name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: passwordConfirmation
    }
    return this.http.post(this.url + 'users', data);

  }

  private storageToken(idToken: string, expireIn: string)
  {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let toDay = new Date();
    toDay.setSeconds(Number(expireIn));

    localStorage.setItem('expireIn', toDay.getTime().toString());
  }

  readToken()
  {
    if (localStorage.getItem('token'))
    {
      this.userToken = localStorage.getItem('token');
    } else
    {
      this.userToken = '';
    }

    return this.userToken;
  }

  isAuthenticated(): boolean
  {
    this.readToken();
    if (this.userToken.length < 2)
    {
      return false;
    }

    const expire = Number(localStorage.getItem('expireIn'));
    const expireDate = new Date();
    expireDate.setTime(expire);

    if (expireDate > new Date())
    {
      return true;
    } else
    {
      return false;
    }
  }
}
