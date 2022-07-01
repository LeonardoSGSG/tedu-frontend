import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { FormularioLogin } from './DTOS/FormularioLogin';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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
    constructor(private loginService: LoginService, private router: Router, private snackBar: MatSnackBar) {
    }
    logForm = new FormGroup({
      emailFormControl : new FormControl('', [Validators.required, Validators.email]),
      passwordFormControl : new FormControl('', [Validators.required]),
    });
    matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
  }

submitLogin()
{
  console.log(this.formularioLogin)
}
 public ingresar(): void
  {
    if((<HTMLInputElement>(document.getElementById('inputCorreo'))).validity.typeMismatch){
      this.openSnackBar('Formato de correo incorrecto','Aceptar');
    }
    else if((<HTMLInputElement>(document.getElementById('passwordInput'))).validity.tooShort){
      this.openSnackBar('Contraseña incorrecta','Aceptar');
    }
    else{
      this.loginService.Login(this.formularioLogin).subscribe(
        res => {
          var token:string = res.user.token;
          var id:string= res.user.id.toString();
          sessionStorage.setItem('id', id);
          sessionStorage.setItem('token', token);
          console.log("token: " + res.user.token);
          this.router.navigate(['/courses']);
          
        },
        err => {
          if(err.status==404)
          {
            this.openSnackBar('Usuario no registrado','Aceptar');
          }
          if(err.status==401)
          {
            this.openSnackBar('Contraseña incorrecta', 'Aceptar');
          }
          if(err.status==400)
          {
            this.openSnackBar('Usuario no registrado', 'Aceptar');
          }
      }
      );
    }
   

  }
  public registrar(): void{
    this.router.navigate(['/register']);

  }
  openSnackBar(message: string, action: string)
  {
    this.snackBar.open(message, action,{duration:3000});
  }
  
}