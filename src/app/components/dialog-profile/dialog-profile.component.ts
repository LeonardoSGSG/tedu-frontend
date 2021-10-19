import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormularioProfile } from './DTOS/FormularioProfile';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogProfileService } from './dialog-profile.service';
@Component({
  selector: 'dialog-profile',
  templateUrl: 'dialog-profile.component.html',
  //styleUrls: ['./profile.component.css']
})
export class DialogProfileComponent implements OnInit {

  hide=true;
    formularioProfile:FormularioProfile={
      institution: '',
      phone: '',
      name: ''
    }
  constructor(private DialogProfileService: DialogProfileService, private router: Router, private dialog: MatDialog, private dialog2: MatDialogRef<DialogProfileComponent>) { 

  }
  ngOnInit(): void {
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogProfileComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  public closeDialog()
  {
    this.dialog2.close();
  }
  public editar(): void
  {
    if (this.formularioProfile.institution=="")
    {
      this.formularioProfile.institution=null;
    }
    if (this.formularioProfile.phone=="")
    {
      this.formularioProfile.phone=null;
    }
    
    this.DialogProfileService.UpdateProfile(this.formularioProfile).subscribe(
      res=>{
        var id:number= res.id;
        console.log(id);
        this.router.navigate(['/profile']).then(()=>{
          window.location.reload();
        });
      },
      err=>
      {
        console.log(err);
      }
    )
  }
  /*public eliminar(): void

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
  }*/

  
}

