import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/entities/post';
import { postDTO } from './DTOS/postDTO';
import { PostsService } from './posts.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AddPostComponent } from './add-post/add-post.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { FormControl, FormGroup } from '@angular/forms';
import { Comment } from 'src/app/entities/comment';
import { CommentService } from './comment.service';
import { ConfirmDeleteCommentComponent } from './confirm-delete-comment/confirm-delete-comment.component';
import { updateCommentQualificationDTO } from './DTOS/updateCommentQualificationDTO';
import { Curso } from 'src/app/entities/curso';
import { updatePostQualificationDTO } from './DTOS/updatePostQualificationDTO';
import { Archivo } from 'src/app/entities/archivo';
import { StorageService } from '../storage/storage.service';
import {ViewEncapsulation} from '@angular/core';
import { ConfirmDeletePostComponent } from './confirm-delete-post/confirm-delete-post.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  //encapsulation : ViewEncapsulation.None,
})
export class PostsComponent implements OnInit {
  addCommentForm = new FormGroup({
    text: new FormControl('')
  })
  editForm= new FormGroup({
    text: new FormControl('')
  })
  @Input()
  
  archivos: any[]=[];
  nombresArchivos: string[]=[];
  numeroArchivos: number=0;
  public posts: postDTO[] = [];
  public comments: Comment[]=[];
  public idPostFiles: number|undefined;
  public rep: [1] = [1];
  public idPost: string ='';
  public idComment: string ='';
  public shouldRun: boolean = false;
  //public course:string = sessionStorage.getItem('currentCourse')!;
  public course:string = window.location.href.split("/")[4];
  public myId:string = sessionStorage.getItem('id')!;
  public pId:string = sessionStorage.getItem('pId')!;
  constructor(private postsService: PostsService, private dialog:MatDialog, private comSvc:CommentService, private apiFile:StorageService) { }

  ngOnInit(): void {

    this.getPosts(this.course);  
  }
  
  checks=false;
  public getPosts(id:string): void{
    
    this.postsService.getPostsByCourseID(id).subscribe(
      (response: postDTO[]) => {
        for(let i=0; i<response.length;i++){
          for(let j=i+1;j<response.length;j++){
            if(response[j].id>response[i].id){
              var temp=response[i];
              response[i]=response[j];
              response[j]=temp;
            }
          }
        }
        this.posts = response;
        console.log("se cargaron los posts de este curso")
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }  
  public popupCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width="40%";
    let currentDialog = this.dialog.open(AddPostComponent, dialogConfig)
    currentDialog.afterClosed().subscribe(res=>{
      this.getPosts(this.course);
    })
    console.log("se muestra el pop up")
  }
  public mensaje()
  {
    
    console.log("funciona")
  }

  
  public eliminarPost(postId:number, urls:Archivo[]){
    return this.dialog.open(ConfirmDeletePostComponent,{
      disableClose: true,
      data:{
        postId: postId,
        archivos: urls
      }
    }).afterClosed().subscribe(res =>{
      //console.log(res)    
      this.getPosts(this.course);                    
    })
  }
  public popupUpdate(id:string){
    sessionStorage.setItem('currentPost',id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width="40%";
    let currentDialog = this.dialog.open(UpdatePostComponent, dialogConfig)
    currentDialog.afterClosed().subscribe(res=>{
      this.getPosts(this.course);
    })
    console.log("se muestra el pop up")
  }
  public getComments(idPost:string): void{
    this.comSvc.getComment(this.course,idPost).subscribe(
      (response: any) => {
        for(let i=0;i<response.length;i++){
          for(let j=i+1;j<response.length;j++){
            if(response[j].id<response[i].id){
              var temp = response[i];
              response[i]=response[j];
              response[j]=temp;
            }
          }
        }
        this.comments = response;
        this.idPost = idPost;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  postFormComment(formu:Comment,postId:string,j:number){
      this.addComment(formu,postId,j);    
  }  
  addComment(formu:Comment,postId:string, j:number){
    if(this.numeroArchivos>0){
      var dialogo = this.dialog.open(ConfirmDeleteCommentComponent,{
        disableClose: true,
        data:{
          postId: null,
          commentId:null
        }
      });}
    this.comSvc.createComment(formu,this.course,postId).subscribe(data =>{
      console.log(postId);
      console.log(data.id);
      if(this.numeroArchivos>0){
        for(let i=0;i<this.numeroArchivos;i++){
          let tempI=i;
          let nomCortado:string[] = this.nombresArchivos[i].split('.');
          this.apiFile.subirImagen((nomCortado[0].length>35? nomCortado[0].substring(0,34):nomCortado[0]) + Date.now()+ this.myId + "."+nomCortado[nomCortado.length-1],this.archivos[i]).then(url=>{
            console.log(url);
            this.apiFile.createCommentFile(url!,postId,data.id, this.nombresArchivos[tempI]).subscribe(res=>{
            console.log("Se guardo la url de firebase en la BD")
            if(tempI==this.numeroArchivos-1){
              window.setTimeout(() => {
                (<HTMLInputElement>document.getElementById("inputComentario"+postId)!).value="";
                (<HTMLInputElement>document.getElementById("inputFile"+j)!).value="";
                this.idPostFiles=-1;
                this.nombresArchivos=[];
                this.archivos=[];
                this.numeroArchivos=0;
                this.getComments(postId);
                dialogo.close();
              },2500);
            }
            })
          })
        }
      }else{
        (<HTMLInputElement>document.getElementById("inputComentario"+postId)!).value="";
        this.idPostFiles=-1;
        this.nombresArchivos=[];
        this.archivos=[];
        this.numeroArchivos=0;
        this.getComments(postId);
      }
    })
  }
  refrescar(){
    location.reload
  }
  deleteComment(postId:string,commentId:number, archivos:Archivo[]){
    return this.dialog.open(ConfirmDeleteCommentComponent,{
      disableClose: true,
      data:{
        postId: postId,
        commentId: commentId,
        archivos: archivos
      }
    }).afterClosed().subscribe(res =>{
      //console.log(res)    
      this.getComments(postId);                       
    })
  }
  
  updateCommentQualification(postId: string, commentId:number, checked: boolean){
    const updateCommentQualificationDTO:updateCommentQualificationDTO=<updateCommentQualificationDTO>{};
    console.log(this.course, postId, commentId, checked);
    updateCommentQualificationDTO.qualified=checked;
    this.comSvc.updateCommentQualification(this.course, postId, commentId, updateCommentQualificationDTO).subscribe(
    
      res=>
      {

        console.log(res.message);

      },
      (error: HttpErrorResponse)=>
      {
        alert(error.message);
      }
    );
    }
  updatePostQualification(postId: string, checked: boolean)
  {
    const updatePostQualificationDTO: updatePostQualificationDTO=<updatePostQualificationDTO>{};
    console.log(this.course,postId,checked);
    updatePostQualificationDTO.qualified=checked;
    this.postsService.updatePostQualification(this.course,postId,updatePostQualificationDTO).subscribe(
      res=>
      {
        console.log(res.message);
      },
      (error:HttpErrorResponse)=>
      {
        alert(error.message);
      }
    )
  }
  
  editComment(form:Comment,postId:string,commentId:number): void{
    this.comSvc.updateComment(form,this.course,postId,commentId).subscribe(
      (response: {updated:boolean;}) =>{    
        console.log(form);
        this.idComment = '';
        this.shouldRun=false;
        this.getComments(postId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  editInputComment(commentId:number){
    this.idComment = commentId+''; 
    this.shouldRun = true;
  }
  cancelUpdate(){
    this.idComment = '';
    this.shouldRun=false;
  }
  accederArchivo(url:string){
    window.open(url, '_blank')
  }
  cargarImagen(event:any, postId:number){
    this.limpiarArchivos();
    console.log(postId);
    this.idPostFiles=postId;
    let archivo = event.target.files;
    this.numeroArchivos=event.target.files.length;
    
    for(let i=0; i<event.target.files.length;i++){
      let reader=new FileReader();
      var nomCort:string;
      if(false/*archivo[i].name.length>50*/){
        nomCort = (archivo[i].name).substring(0,47)+"...";
        this.nombresArchivos.push(nomCort);
      }else{
        if(archivo[i].name.length<=50){
          this.nombresArchivos.push(archivo[i].name);
        }else{
          alert("El archivo de nombre: ("+archivo[i].name+") tiene un nombre muy largo, favor de recortar e intentar de nuevo");
          this.limpiarArchivos();
        }
      }
      reader.readAsDataURL(archivo[i]);
      reader.onloadend=()=>{
        if(archivo[i].name.length<=50){
          this.archivos.push(reader.result);
        }
      }
    }
  }
  limpiarArchivos(){
    var e = document.getElementById("nombresArchivos");
    this.archivos=[];
    this.nombresArchivos=[];
    this.numeroArchivos=0;
    //e.firstElementChild can be used.
    var child = e!.lastElementChild; 
    while (child) {
        e!.removeChild(child);
        child = e!.lastElementChild;
    }
  }
}