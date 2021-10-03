import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/entities/post';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  public posts: Post[] = [];

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    var idCurso = sessionStorage.getItem('currentCourse');
    //this.getPosts(idCurso!);
  }
  public getPosts(id:string): void{
    this.postsService.getPostsByCourseID(id).subscribe(
      (response: Post[]) => {
        this.posts = response;
        console.log("se cargaron los posts de este curso")
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }
  public cargarPosts(){
    console.log("se dio click");
    sessionStorage.setItem('currentCourse',"6");
    this.getPosts("6")
  }
}


