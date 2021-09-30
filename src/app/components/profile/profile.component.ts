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
  public editar(): void
  {
    this.profileService.Profile(this.formularioProfile).subscribe(
      res=>{
        
        this.router.navigate(['/courses'])
      },
      err=>
      {
        console.log(err);
      }
    )
  }

  ngOnInit(): void {
  }

}
