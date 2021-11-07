import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentService } from '../comment.service';
import { ConfirmDeleteCommentService } from './confirm-delete-comment.service';

@Component({
  selector: 'app-confirm-delete-comment',
  templateUrl: './confirm-delete-comment.component.html',
  styleUrls: ['./confirm-delete-comment.component.css']
})
export class ConfirmDeleteCommentComponent implements OnInit {
  public course:string = sessionStorage.getItem('currentCourse')!;

  constructor(private service: ConfirmDeleteCommentService, private comService: CommentService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  deleteComment(postId:string,commentId:number){
    this.service.deleteComment(this.course,postId,commentId).subscribe(
      data =>{    
        console.log(data) 
        this.getComments(postId); 
      }
    ),
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  }
  public getComments(idPost:string): void{
    this.comService.getComment(this.course,idPost).subscribe(
      (response: any) => {        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
