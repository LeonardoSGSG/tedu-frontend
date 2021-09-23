import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< Updated upstream
=======
import { ReactiveFormsModule } from '@angular/forms';

//Angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

//Componentes
import { LoginComponent } from './components/login/login.component';

//Conectar con backend
import { LoginService } from './login.service';
import {HttpClientModule} from '@angular/common/http';

>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
<<<<<<< Updated upstream
    AppRoutingModule
=======
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule


>>>>>>> Stashed changes
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
