import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { membersObject } from 'src/app/entities/membersObject';
import { Usuario } from 'src/app/entities/usuario';
import { CourseMembersService } from './course-members.service';
import { DialogRemoveStudentComponent } from './dialog-remove-student/dialog-remove-student.component';

@Component({
  selector: 'app-course-members',
  templateUrl: './course-members.component.html',
  styleUrls: ['./course-members.component.css']
})
export class CourseMembersComponent implements OnInit {
  public members: membersObject=<membersObject>{};
  public teacher: Usuario=<Usuario>{};
  public students: Usuario[]=[];
  //public course:string = sessionStorage.getItem('currentCourse')!;
  public course:string = window.location.href.split("/")[4];
  public myId:string = sessionStorage.getItem('id')!;
  public myIdN:number = Number(this.myId);
  displayedColumns: string[]=['index','name','action'];
  displayedColumnsStudents: string[]=['index','name'];
  dataSource = new MatTableDataSource<Usuario>(this.students);
  durationInSeconds = 5;

  constructor(private courseMembersSvc: CourseMembersService, private router: Router, public dialog: MatDialog,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMembers(this.course);
  }
  public getMembers(id:string): void{
    this.courseMembersSvc.getMembersByCourse(id).subscribe(
      (response: membersObject) => {
        this.members = response;
        this.teacher = this.members.teacher;
        this.students = this.members.students;
        //console.log(this.members)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  irChat(id: string, nombre: string)
  {
    sessionStorage.setItem('idChatDestino', id+'');
    sessionStorage.setItem('nombreChatDestino', nombre);

    this.router.navigate(['/chat']);
  }
  onDelete(student_id:number,course_id:string){
    return this.dialog.open(DialogRemoveStudentComponent,{
      disableClose: true,
      data:{
        student_id: student_id,
        course_id: course_id
      }
    }).afterClosed().subscribe(res =>{
      //console.log(res)
      if(res){
        this._snackBar.openFromComponent(snackBarRemoveStudent, {
          duration: this.durationInSeconds * 1000,
        }); 
        this.getMembers(this.course); 
      }                
    })
  }
}
@Component({
  selector: 'snack-bar-remove-student',
  templateUrl: 'snack-bar-remove-student.html',
  styles: [`
    .rs-snack-bar {
      color: hotpink;
    }
  `],
})
export class snackBarRemoveStudent {}
