import { HttpErrorResponse } from '@angular/common/http';
import { Usuario } from 'src/app/entities/usuario';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { membersObject } from 'src/app/entities/membersObject';
import { DialogRemoveStudentService } from './dialog-remove-student.service';
import { CourseMembersService } from '../course-members.service';
import { CourseMembersComponent } from '../course-members.component';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-dialog-remove-student',
  templateUrl: './dialog-remove-student.component.html',
  styleUrls: ['./dialog-remove-student.component.css']
})
export class DialogRemoveStudentComponent implements OnInit {
  public members: membersObject=<membersObject>{};
  public teacher: Usuario=<Usuario>{};
  public students: Usuario[]=[];
  //public course:string = sessionStorage.getItem('currentCourse')!;
  public course:string = window.location.href.split("/")[4];
  public myId:string = sessionStorage.getItem('id')!;

  constructor(private removeStudentSvc: DialogRemoveStudentService,
              private courseMembersSvc: CourseMembersService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DialogRemoveStudentComponent>) { }

  ngOnInit(): void {
  }
  /*public removeStudent(): void{
    this.dialogRef.close();
    this.profileService.DeleteProfile().subscribe(
      res=>{
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
  }*/
  public removeStudent(student_id:number,course_id:string): void{
    this.removeStudentSvc.deleteStudent(student_id,course_id).subscribe(
      (response: Usuario[]) => {
        console.log(response);
        this.getMembers(this.course);
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }
  public getMembers(id:string): void{
    this.courseMembersSvc.getMembersByCourse(id).subscribe(
      (response: membersObject) => {
        this.members = response;
        this.teacher = this.members.teacher;
        this.students = this.members.students;
        console.log(this.members)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  public closeDialog(){
    this.dialogRef.close(false);
  }
}
