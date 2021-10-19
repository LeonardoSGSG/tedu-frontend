import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormularioRegister } from './DTOS/FormularioRegister';
import { RegisterService } from 'src/app/components/register/register.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

//export * from './register.component'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  hide=true;
  usuario:FormularioRegister={
    id : 0,
    name:'',
    email:'',
    password:'',
    institution:'',
    phone:''
  }
  constructor(private api:RegisterService, private router:Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  openSnackBar(message: string, action: string)
  {
    this.snackBar.open(message, action);
  }
  
  public submitRegister(): void{
    if (this.usuario.institution=="")
    {
      this.usuario.institution=null;
    }
    if (this.usuario.phone=="")
    {
      this.usuario.phone=null;
    }

    this.api.postUser(this.usuario).subscribe(
      res =>{
        var token:string = res.user.token;
        var id:string= res.user.id.toString();
        console.log(res.user.token);
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('id', id);
        this.router.navigate(['/courses'])
        if(res.statusCode==409)
        {
          console.log(res.error);
        }
      },
      err=>{
        if(err.status==400)
        {
          if(err.error.message[0]=="name must be longer than or equal to 2 characters")
          {
            this.openSnackBar('El nombre del usuario debe tener al menos 2 caracteres', 'Aceptar');

          }
          if(err.error.message[0]=="institution must be longer than or equal to 2 characters")
          {
            this.openSnackBar('El nombre de la institución debe tener al menos 2 caracteres', 'Aceptar');
          }
          if(err.error.message[0]=="phone must be a valid phone number")
          {
            this.openSnackBar('Número de teléfono inválido', 'Aceptar');
          }
          if(err.error.message[0]=="email must be longer than or equal to 4 characters")
          {
            this.openSnackBar('El email debe tener al menos 4 caracteres', 'Aceptar');
          }
          if(err.error.message[0]=="email must be an email")
          {
            this.openSnackBar('Formato de email inválido', 'Aceptar');
          }
          if(err.error.message[0]=="password must be longer than or equal to 4 characters")
          {
            this.openSnackBar('La contraseña debe tener al menos 4 caracteres', 'Aceptar');
          }

          
          
          //alert(err.error.message[0]);
        }
        console.log(err);
        //TODO: validar qué salió mal
      }
    )
  }
  /*
  getErrorCampo() {
    if (this.name.hasError('required') || this.email.hasError('required') || this.password.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return this.registerForm.hasError('') ? 'El valor del campo no es válido' : '';
  }
  */
 /*
  postForm(form:Usuario){
    this.api.postUser(form).subscribe(data =>{
      console.log(data);
    },
    err =>{
      console.log(err)
    }
    )
    */
    /*
    this.dialog.open(SuccessfulRegistrationComponent);
    this.router.navigateByUrl('/login');*/
}
