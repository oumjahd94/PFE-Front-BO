import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RequestMethod, RequestOptions} from '@angular/http';

@Injectable()
export  class AuthenticationServcie {

  private host:string ="http://localhost:8088";

  constructor(private http:HttpClient){

  }

  login(user){

    return this.http.post(this.host+"/login",user,{observe:'response'}) ;
  }

  saveToken(jwt:string){
    localStorage.setItem('token',jwt) ;

  }

}
