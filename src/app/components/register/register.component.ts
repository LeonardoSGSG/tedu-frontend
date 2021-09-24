import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserI } from 'src/app/models/user.interface';
export * from './register.component'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  name = new FormControl('',[Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('',[Validators.required]);
  registerForm = new FormGroup({
    id : new FormControl(''),
    name : new FormControl('',[Validators.required]),
    email : new FormControl('', [Validators.required, Validators.email]),
    institucion : new FormControl(''),
    phone : new FormControl(''),
    password : new FormControl('',[Validators.required])
  })
  constructor() { }

  ngOnInit(): void {
  }
  
  getErrorCampo() {
    if (this.name.hasError('required') || this.email.hasError('required') || this.password.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return this.registerForm.hasError('') ? 'El valor del campo no es válido' : '';
  }
  postForm(form:UserI){
    console.log(form);
    /*this.api.postUser(form).subscribe(data =>{
      console.log(data);
    })
    this.dialog.open(SuccessfulRegistrationComponent);
    this.router.navigateByUrl('/login');*/
}
}
