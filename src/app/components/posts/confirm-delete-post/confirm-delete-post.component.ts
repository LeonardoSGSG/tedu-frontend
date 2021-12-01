import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Archivo } from 'src/app/entities/archivo';
import { StorageService } from '../../storage/storage.service';
import { CommentService } from '../comment.service';
import { PostsService } from '../posts.service';
import { ConfirmDeletePostService } from './confirm-delete-post.service';

@Component({
  selector: 'app-confirm-delete-post',
  templateUrl: './confirm-delete-post.component.html',
  styleUrls: ['./confirm-delete-post.component.css']
})
export class ConfirmDeletePostComponent implements OnInit {

  public course=sessionStorage.getItem('currentCourse');
  constructor(private service: ConfirmDeletePostService, private posService: PostsService, private comService:CommentService, private apiFiles:StorageService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  deletePost(postId:string, archivos:Archivo[]){
    this.comService.getComment(this.course!,postId).subscribe((response:any)=>{
      for(let i=0;i<response.length; i++){
        this.apiFiles.eliminarImagenes(response[i].files);
      }
    })
    this.service.deletePost(this.course!,postId).subscribe(
      data =>{
        this.apiFiles.eliminarImagenes(archivos)
      }
    ),
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  }
}
