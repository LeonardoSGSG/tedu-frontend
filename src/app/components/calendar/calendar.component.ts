import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Router } from '@angular/router';
import { CalendarService } from './calendar.service';
import { EventI } from 'src/app/entities/event';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CreateEventComponent } from './create-event/create-event.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteEventComponent } from './delete-event/delete-event.component';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public events: EventI[]=[];
  public options: any;
  durationInSeconds = 5;
  
  constructor(private router: Router, private calendarService: CalendarService,public dialog: MatDialog,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.options = {
      plugins: [dayGridPlugin,timeGridPlugin,interactionPlugin],
      defaultDate: new Date(),
      locale: 'es',
      header: {
        left:'prev,next',
        center:'title',
        right:'dayGridMonth,timeGridWeek,timeGridDay'
      },
      height: 500,
      displayEventTime: false,
      selectable: true,
      selectHelper: true,
      editable: false,
      eventClick: (info:any) => {
        let data = {          
          id: info.event.id,
          title: info.event.title
        };
        this.openModal(data.id,data.title);
        console.log(data.id)
      }  
      /*eventClick: function(info: any){
        let data = {          
          id: info.event.id,          
        };
        //this.openModal(data);
        this.event_id = data.id
        console.log(this.event_id)
      }  */
    }
    
    this.getAllUserEvents();
  }
  openModal(id:any,title:string) {
    const modalRef = this.dialog.open(DeleteEventComponent,{
      disableClose: false,
      data:{
        id: id,
        title: title
      }
    }).afterClosed().subscribe(res =>{
      //console.log(res)
      if(res){
        this._snackBar.openFromComponent(snackBarDeleteEvent, {
          duration: this.durationInSeconds * 1000,
        }); 
        this.getAllUserEvents(); 
      }                
    });
    //modalRef.componentInstance.data = data;    
  }
  public redirProfile(){
    this.router.navigate(['/profile']);
  }
  public LogOut(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  regresarCursos(){
    this.router.navigate(['/courses']);
  }
  onCreateEvent(){
    return this.dialog.open(CreateEventComponent,{
      disableClose:true,
      autoFocus:true,
      width: "25%"
    }).afterClosed().subscribe(res =>{
      console.log(res);      
      if(res){        
        this._snackBar.openFromComponent(snackBarAddEvent, {
          duration: this.durationInSeconds * 1000,
        });   
        window.location.reload();    
      }
    })
  }
  public onDeleteEvent(event_id:number,event_title:string){
    this.dialog.open(DeleteEventComponent,{
      disableClose: true,
      data:{
        event_id: event_id,
        event_title: event_title
      }
    }).afterClosed().subscribe(res =>{
      //console.log(res)
      if(res){
        this._snackBar.openFromComponent(snackBarDeleteEvent, {
          duration: this.durationInSeconds * 1000,
        }); 
        this.getAllUserEvents(); 
      }                
    })
  }
  public getAllUserEvents(){
    this.calendarService.findAllUserEvents().subscribe(
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

@Component({
  selector: 'snack-bar-add-event',
  templateUrl: 'snack-bar-add-event.html'
})
export class snackBarAddEvent {}

@Component({
  selector: 'snack-bar-delete-event',
  templateUrl: 'snack-bar-delete-event.html'
})
export class snackBarDeleteEvent {}