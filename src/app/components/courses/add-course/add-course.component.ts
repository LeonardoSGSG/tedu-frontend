import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Curso } from 'src/app/entities/curso';
import { CoursesComponent } from '../courses.component';
import { CoursesService } from '../courses.service';

interface Dia {
  value: number;
  viewValue: string;
}
interface Hora {
  viewValue: string;
}

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  addCourseForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    start_date: new FormControl('',[Validators.required]),
    weeks: new FormControl('',[Validators.required]),
    vacancies: new FormControl('',[Validators.required]),
    desc: new FormControl(''),
    schedule: new FormArray([
      new FormGroup({
        'day': new FormControl('',[Validators.required]),
        'start': new FormControl('',[Validators.required]),
        'end': new FormControl('',[Validators.required]),
      })
    ])
  })
  dias: Dia[] = [
    {value: 0, viewValue: 'Domingo'},
    {value: 1, viewValue: 'Lunes'},
    {value: 2, viewValue: 'Martes'},
    {value: 3, viewValue: 'Miércoles'},
    {value: 4, viewValue: 'Jueves'},
    {value: 5, viewValue: 'Viernes'},
    {value: 6, viewValue: 'Sábado'},
  ];
  horas: Hora[] = [
    {viewValue: '7:00'},{viewValue: '8:00'},{viewValue: '9:00'},{viewValue: '10:00'},
    {viewValue: '11:00'},{viewValue: '12:00'},{viewValue: '13:00'},{viewValue: '14:00'},
    {viewValue: '15:00'},{viewValue: '16:00'},{viewValue: '17:00'},{viewValue: '18:00'},
    {viewValue: '19:00'},{viewValue: '20:00'},{viewValue: '21:00'},{viewValue: '22:00'},
  ]
  constructor(private api:CoursesService,
              public router:Router,
              private dialog:MatDialog,
              private dialogRef: MatDialogRef<CoursesComponent>,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
  get schedule(){
    return this.addCourseForm.get('schedule') as FormArray;
  }
  agregarSchedule(){
    const scheduleFormGroup = this.formBuilder.group({
      day: '',
      start: '',
      end: ''
    });
    this.schedule.push(scheduleFormGroup);
  }
  removerSchedule(indice: number){
    this.schedule.removeAt(indice);
  }
  refrescar(){
    this.schedule.controls.splice(0,this.schedule.length);
  }
  postForm(form:Curso){
    this.api.addCourse(form).subscribe(data =>{
      console.log(form);
    })
  }
  public agregar(){
    this.dialogRef.close();
  }
}
