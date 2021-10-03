import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormularioProfile } from './DTOS/FormularioProfile';
import {ProfileService} from './profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  hide=true;
    formularioProfile:FormularioProfile={
      institution: '',
      phone: '',
      name: ''
    }
  constructor(private profileService: ProfileService, private router: Router) { 

  }
  ngOnInit(): void {
  }
  public editar(): void
  {
    this.profileService.UpdateProfile(this.formularioProfile).subscribe(
      res=>{
        var id:number= res.id;
        console.log(id);
        this.router.navigate(['/profile'])
      },
      err=>
      {
        console.log(err);
      }
    )
  }
  public eliminar(): void

  {
    this.profileService.DeleteProfile().subscribe(
      res=>
      {
        var message:string= res.message;

        console.log(message);
        this.router.navigate(['/profile']);
      },
      err=>
      {
        console.log(err);
      }
    )
  }

  

}
