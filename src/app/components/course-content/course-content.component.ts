import { Component, OnInit } from '@angular/core';
import { PostsComponent } from '../posts/posts.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css']
})
export class CourseContentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  public redirProfile(): void{
    this.router.navigate(['/profile']);

  }

}
