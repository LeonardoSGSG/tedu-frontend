import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CourseContentComponent } from './components/course-content/course-content.component';
import { PostsComponent } from './components/posts/posts.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent, pathMatch:'full'},
  {path:'register',component:RegisterComponent},
  {path:'courses',component:CoursesComponent},
  {path:'profile',component:ProfileComponent},
  {path:'courses/:id',component:CourseContentComponent},
  {path:'posts',component:PostsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
