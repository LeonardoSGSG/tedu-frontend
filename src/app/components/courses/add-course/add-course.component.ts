import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Curso } from 'src/app/entities/curso';
import { CoursesComponent } from '../courses.component';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  addCourseForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    start_date: new FormControl(''),
    end_date: new FormControl(''),
    vacancies: new FormControl(''),
    desc: new FormControl(''),
  })
  constructor(private api:CoursesService,
              public router:Router,
              private dialog:MatDialog,
              private dialogRef: MatDialogRef<CoursesComponent>) { }

  ngOnInit(): void {
  }
  postForm(form:Curso){
    console.log(form);
    this.api.addCourse(form).subscribe(data =>{
      console.log(data);
    })
  }
  public agregar(){
    this.dialogRef.close();
  }
}
