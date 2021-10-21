import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { membersObject } from 'src/app/entities/membersObject';
import { Usuario } from 'src/app/entities/usuario';
import { CourseMembersService } from './course-members.service';

@Component({
  selector: 'app-course-members',
  templateUrl: './course-members.component.html',
  styleUrls: ['./course-members.component.css']
})
export class CourseMembersComponent implements OnInit {
  public members: membersObject=<membersObject>{};
  public teacher: Usuario=<Usuario>{};
  public students: Usuario[]=[];
  public course:string = sessionStorage.getItem('currentCourse')!;
  public myId:string = sessionStorage.getItem('id')!;
  displayedColumns: string[]=['index','name','email','action'];
  dataSource = new MatTableDataSource<Usuario>(this.students);

  constructor(private courseMembersSvc: CourseMembersService) { }

  ngOnInit(): void {
    this.getMembers(this.course);
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
  public removeStudent(student_id:number,course_id:string): void{
    this.courseMembersSvc.deleteStudent(student_id,course_id).subscribe(
      (response: Usuario[]) => {
        console.log(response);
        this.getMembers(this.course);
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }

}
