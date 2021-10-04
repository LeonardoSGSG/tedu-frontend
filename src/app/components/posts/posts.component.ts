import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/entities/post';
import { postDTO } from './DTOS/postDTO';
import { PostsService } from './posts.service';
import { formularioPost } from './DTOS/formularioPost';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  public posts: postDTO[] = [];
  formPost:formularioPost={
    text:''
  }

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    var idCurso = sessionStorage.getItem('currentCourse');
    this.getPosts(idCurso!);
  }
  public getPosts(id:string): void{
    this.postsService.getPostsByCourseID(id).subscribe(
      (response: postDTO[]) => {
        this.posts = response;
        console.log("se cargaron los posts de este curso")
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }
  public crearPost():void{
    var idCurs = sessionStorage.getItem('currentCourse');
    
    this.postsService.createPost(this.formPost,idCurs!).subscribe(
      res =>{

      },
      err =>{
        
      }
    )
  }
}


