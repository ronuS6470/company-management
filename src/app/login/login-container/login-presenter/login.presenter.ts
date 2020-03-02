import { Injectable } from '@angular/core';
import { Login } from '../../login.model';

@Injectable()
export class LoginPresenter {

    constructor() {}

    authenticate(uname: string, pwd: string,login:Login[]){
        for(let i=0;i<login.length;i++)
        {
        if (uname === login[i].username && pwd === login[i].password) {
          localStorage.setItem('username', login[i].username );
          return true;
        }
    }
      return false;
}
}