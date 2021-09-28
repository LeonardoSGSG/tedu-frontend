import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { FormularioLogin } from './DTOS/FormularioLogin';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    formularioLogin:FormularioLogin={
      email: '',
      password: ''
    }
    constructor(private loginService: LoginService) {
      

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
      console.log(res.user.token);
      sessionStorage.setItem('token', token);
      
    },
    err => {
      console.log(err);
  }
  )

  }
}