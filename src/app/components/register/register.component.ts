import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormularioRegister } from './DTOS/FormularioRegister';
import { RegisterService } from 'src/app/components/register/register.service';
export * from './register.component'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  hide=true;
  usuario:FormularioRegister={
    name:'',
    email:'',
    password:'',
    institution:'',
    phone:''
  }
  constructor(private api:RegisterService) { }

  ngOnInit(): void {
  }
  
  public submitRegister(): void{
    this.api.postUser(this.usuario).subscribe(
      res =>{
        console.log(res.user.token);
      },
      err=>{
        console.log(err);
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
