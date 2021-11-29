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
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle'
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FullCalendarModule} from 'primeng/fullcalendar'

//Componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CoursesComponent } from './components/courses/courses.component';
import { AddCourseComponent } from './components/courses/add-course/add-course.component';
import { CoursesService } from './components/courses/courses.service';
import { coursesArrayPipe } from './components/courses/courses.pipe';
import { PostsComponent } from './components/posts/posts.component';
import { DialogProfileComponent } from './components/dialog-profile/dialog-profile.component';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { ConfirmDeleteCommentComponent } from './components/posts/confirm-delete-comment/confirm-delete-comment.component';
import { VerAsistenciaComponent } from './components/asistencia/ver-asistencia/ver-asistencia.component';
import { RegistrarAsistenciaComponent } from './components/asistencia/registrar-asistencia/registrar-asistencia.component';
import { EditarAsistenciaComponent } from './components/asistencia/editar-asistencia/editar-asistencia.component';
import { ConfirmDeletePostComponent } from './components/posts/confirm-delete-post/confirm-delete-post.component';

//Conectar con backend
import { LoginService } from './components/login/login.service';
import { ProfileComponent } from './components/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { CourseContentComponent } from './components/course-content/course-content.component';
import { AddPostComponent } from './components/posts/add-post/add-post.component';
import { UpdatePostComponent } from './components/posts/update-post/update-post.component';
import { ConfirmDeleteProfileComponent } from './components/confirm-delete-profile/confirm-delete-profile.component';
import { CourseMembersComponent } from './components/course-members/course-members.component';
import { DialogRemoveStudentComponent } from './components/course-members/dialog-remove-student/dialog-remove-student.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { ChatComponent } from './components/chat/chat.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { CalendarComponent } from './components/calendar/calendar.component';






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
    DialogProfileComponent,
    ConfirmDeleteProfileComponent,
    UpdatePostComponent,
    CourseMembersComponent,
    DialogRemoveStudentComponent,
    AsistenciaComponent,
    ConfirmDeleteCommentComponent,
    VerAsistenciaComponent,
    RegistrarAsistenciaComponent,
    EditarAsistenciaComponent,
    ChatComponent,
    ConfirmDeletePostComponent,
    NotificacionesComponent,
    CalendarComponent,
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
    MatCheckboxModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatGridListModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,MatButtonToggleModule,MatPaginatorModule,
    MatExpansionModule,
    MatSelectModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),
    FullCalendarModule,
  ],
  providers: [LoginService,CoursesService,CoursesComponent/*, ScreenTrackingService,UserTrackingService*/],
  bootstrap: [AppComponent],
  entryComponents:[DialogRemoveStudentComponent]
})
export class AppModule { }
