import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormularioLogin } from '../login/DTOS/FormularioLogin';
import { usuarioDTO } from '../login/DTOS/UsuarioDTO';
import { ConfirmDeleteProfileComponent } from './confirm-delete-profile.component';
import { resDeleteProfile } from './DTOS/resDeleteProfile';

@Injectable({
  providedIn: 'root'
})
export class confirmDelete {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private dialog: MatDialog) {}
   
  
  public DeleteProfile():Observable<resDeleteProfile>
  {
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')
      })
    };
    return this.http.delete<resDeleteProfile>(`${this.apiServerUrl}/user/` , opts )
  }
  

  

  openConfirmDialog()
    {
      this.dialog.open(ConfirmDeleteProfileComponent,
        {
          width: '390px',
          panelClass: 'confirm-dialog-container',
          disableClose: true

        });
    
      }
    }
   
