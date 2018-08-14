import { Component, OnInit } from '@angular/core';
import {AuthenticationServcie} from '../Service/authentication-servcie';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mode:number = 0 ;
  constructor(private authService : AuthenticationServcie, private router :Router) { }

  ngOnInit() {
  }

  onLogin(user){

    this.authService.login(user)
        .subscribe(resp=>{
          let jwt = resp.headers.get('Authorization') ;
          // vérifier si on récupère le JWT
          console.log(jwt);
          this.authService.saveToken(jwt) ;
          this.router.navigateByUrl('/snapshot') ;
        },
          err=>{
             this.mode = 1 ;
          })
  }

}
