import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EventI } from 'src/app/entities/event';
import { CalendarComponent } from '../calendar.component';
import { CalendarService } from '../calendar.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  addEventForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    start: new FormControl('',[Validators.required]),
    end: new FormControl('',[Validators.required])    
  })

  constructor(private api:CalendarService,public router:Router,private dialog:MatDialog,
              private dialogRef: MatDialogRef<CalendarComponent>
              ) { }

  ngOnInit(): void {
  }
  postForm(form:EventI){
    this.api.createEvent(form).subscribe(data =>{
      console.log(form);
    })
  }
  public agregar(){
    this.dialogRef.close();
  }
}
