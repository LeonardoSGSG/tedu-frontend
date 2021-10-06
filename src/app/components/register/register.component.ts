import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormularioRegister } from './DTOS/FormularioRegister';
import { RegisterService } from 'src/app/components/register/register.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
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
  constructor(private api:RegisterService, private router:Router) { }

  ngOnInit(): void {
  }
  
  public submitRegister(): void{
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
