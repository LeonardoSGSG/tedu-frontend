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
    if(this.data.postId==null){
      var e = document.getElementById("contenedorPrincipal");
      var child = e!.lastElementChild; 
      while (child) {
          e!.removeChild(child);
          child = e!.lastElementChild;
      }
    }
    var h1 = document.createElement("h1");
    h1.textContent="No cierre ni recargue el navegador"
    h1.style.padding="5%";
    e!.appendChild(h1);
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
