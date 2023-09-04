import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from '../services/http.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

type user = {avatar: string, id: number, name: string, username: string};

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  users:user[] = [];

  choosedUser = 0;

  userIsChoosed = false;

  @ViewChild('password') password:ElementRef|undefined;

  constructor(private http:HttpService, private router: Router){}

  ngOnInit(){

    this.http.getUsers().subscribe((response:user[]) => { 
      this.users = response;
    });

  }

  choose(i:number){

    this.choosedUser = i;

    this.userIsChoosed = true;

  }

  unChoose(ev: Event){

    ev.stopPropagation();

    this.userIsChoosed = false;

  }

  login(){

    const userName = this.users[this.choosedUser].username;

    const password = this.password?.nativeElement.value;

    const hash = btoa(userName + ":" + password);

    this.http.getTodos(hash).pipe(

      catchError((err:HttpErrorResponse)=>{
        alert(err.error.message);
        return throwError(() => new Error('error while logging in'));
      })

    )
    .subscribe((response:any) => { 

      localStorage.setItem("hash" , hash);
      localStorage.setItem("user" , JSON.stringify(this.users[this.choosedUser]))
      this.router.navigate(['/todo']);

    });

    if(this.password){
      this.password.nativeElement.value = "";
    }
    
  }



}
