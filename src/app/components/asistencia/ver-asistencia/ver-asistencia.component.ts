import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AsistenciaGeneral } from 'src/app/entities/asistenciaGeneral';
import { AsistenciaComponent } from '../asistencia.component';
import { AsistenciaService } from '../asistencia.service';

@Component({
  selector: 'app-ver-asistencia',
  templateUrl: './ver-asistencia.component.html',
  styleUrls: ['./ver-asistencia.component.css']
})
export class VerAsistenciaComponent implements OnInit {
  myId: string = sessionStorage.getItem('id')!;
  asistenciaId: number = 0;
  asistencia:AsistenciaGeneral|undefined;
  constructor(private api:AsistenciaService, public router:Router, private dialogRef:MatDialogRef<AsistenciaComponent>) { }

  ngOnInit(): void {
    this.conseguirAsistencia();
  }
  conseguirAsistencia(){
    var encontrado:boolean=false;
    for(var i = 0; i < this.asistencia!.userAttendances!.length; i++){
      if(this.asistencia!.userAttendances![i].user.id+""==this.myId){
        encontrado = true
      }
    }
    console.log(encontrado);
    if(encontrado==false){
      var h1El = document.createElement("h3");
      const contenido = document.createTextNode("No apareces en el registro de esta clase"); 
      h1El.appendChild(contenido);
      //document.body.insertBefore(h1El,);
      document.getElementById('lista')!.appendChild(h1El);
    }
  }
}
