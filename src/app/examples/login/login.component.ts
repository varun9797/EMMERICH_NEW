import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    data : Date = new Date();
    focus;
    focus1;
    email;
    password;

    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }
    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

    async login(){
        let loginResponse:any = await this.http.post('https://cosmo-thoughts.herokuapp.com/api/auth/userlist/login',{email:this.email,password:this.password}).toPromise();
        console.log(loginResponse);  
        if(loginResponse.token){
            localStorage.setItem ('emmerichtoken', loginResponse.token);
            this.router.navigateByUrl('/examples/profile');
        } else {
            alert(loginResponse.msg)
        }

    }

}
