import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask'


//Angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';


//Componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CoursesComponent } from './components/courses/courses.component';
import { AddCourseComponent } from './components/courses/add-course/add-course.component';
import { CoursesService } from './components/courses/courses.service';
import { coursesArrayPipe } from './components/courses/courses.pipe';
import { PostsComponent } from './components/posts/posts.component';
import { DialogProfileComponent } from './components/dialog-profile/dialog-profile.component';

//Conectar con backend
import { LoginService } from './components/login/login.service';
import { ProfileComponent } from './components/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { CourseContentComponent } from './components/course-content/course-content.component';
import { AddPostComponent } from './components/posts/add-post/add-post.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CoursesComponent,
    ProfileComponent,
    AddCourseComponent,
    coursesArrayPipe, 
    CourseContentComponent,
    PostsComponent,
    AddPostComponent,
    DialogProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatGridListModule,
    
  ],
  providers: [LoginService,CoursesService,CoursesComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
