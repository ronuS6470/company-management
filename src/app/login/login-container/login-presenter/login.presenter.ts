/**
 * @author TapasVashi
 */
import { Injectable } from '@angular/core';
import { Login } from '../../login.model';

@Injectable()
export class LoginPresenter {

    constructor() {}

    /**
     * 
     * @param username check username in json-server
     * @param password check password in json-server
     * @param login Used to iterate in json-server
     */
    authenticate(username: string, password: string,login:Login[]){
        for(let i=0;i<login.length;i++)
        {
        if (username === login[i].username && password === login[i].password) {
          localStorage.setItem('username', login[i].username );                 // It will set value in local storage
          return true;
        }
    }
      return false;
}
}
