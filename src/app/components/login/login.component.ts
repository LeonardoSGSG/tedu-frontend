import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { FormularioLogin } from './DTOS/FormularioLogin';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  hide=true;
    formularioLogin:FormularioLogin={
      email: '',
      password: ''
    }
    constructor(private loginService: LoginService, private router: Router) {
      

    }

  ngOnInit(): void {
  }

submitLogin()
{
  console.log(this.formularioLogin)
}
 public ingresar(): void
  {


   this.loginService.Login(this.formularioLogin).subscribe(
    res => {
      var token:string = res.user.token;
      var id:string= res.user.id.toString();
      sessionStorage.setItem('id', id);
      sessionStorage.setItem('token', token);
      console.log("token: " + res.user.token);
      this.router.navigate(['/courses'])
      

    },
    err => {
      console.log(err);
  }
  )

  }
}