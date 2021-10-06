import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { confirmDelete } from './confirm-delete.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-confirm-delete-profile',
  templateUrl: './confirm-delete-profile.component.html',
  styleUrls: ['./confirm-delete-profile.component.css']
})
export class ConfirmDeleteProfileComponent implements OnInit {

  constructor(private profileService: confirmDelete, private router: Router,
    public dialogRef: MatDialogRef<ConfirmDeleteProfileComponent>) { }

  ngOnInit(): void {
  }
  public closeDialog()
  {
    this.dialogRef.close();
  }
  public eliminar(): void

  {
    this.dialogRef.close();
    this.profileService.DeleteProfile().subscribe(
      res=>
      {
        var message:string= res.message;

        console.log(message);
        sessionStorage.clear();
        this.router.navigate(['/login']);
      },
      err=>
      {
        console.log(err);
      }
    )
  }

}
