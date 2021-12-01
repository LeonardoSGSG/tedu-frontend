import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventI } from 'src/app/entities/event';
import { CalendarService } from '../calendar.service';
import { DeleteEventService } from './delete-event.service';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})
export class DeleteEventComponent implements OnInit {
  public events: EventI[]=[];
  constructor(private deleteEventService: DeleteEventService, 
              private calendarService: CalendarService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DeleteEventComponent>
              ) { }


  ngOnInit(): void {
  }
  public removeEvent(id:number): void{
    this.deleteEventService.deleteEvent(id).subscribe(
      (response: any) => {
        console.log(response);
        this.getAllUserEvents();
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }
  public getAllUserEvents(){
    this.deleteEventService.findAllUserEvents().subscribe(
      (response: EventI[]) => {
        this.events = response;
        console.log(this.events);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
