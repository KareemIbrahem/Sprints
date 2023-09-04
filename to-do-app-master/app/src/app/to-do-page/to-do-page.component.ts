import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from '../services/http.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Route, Router } from '@angular/router';

type task = {completed: boolean, id: number, task: string, user_id: number}

@Component({
  selector: 'app-to-do-page',
  templateUrl: './to-do-page.component.html',
  styleUrls: ['./to-do-page.component.scss']
})
export class ToDoPageComponent {

  constructor(private http:HttpService, private router:Router){}

  tasks:task[] = [];

  user = {avatar: "", id: 0, name: "", username: ""};

  modal = false;

  @ViewChild('taskInput') taskInput:ElementRef|undefined;

  ngOnInit(){

    this.checkIfLoggedIn();

  }


  add(){

    const input = this.taskInput?.nativeElement.value;

    const task = {completed: false, id: 0, task: input, user_id: this.user.id}

    this.http.addTask(task).subscribe((response:task) => { 
      this.tasks.push(response);
      this.modal= false;
    });

    
  }

  complete(i:number){

    const task = this.tasks[i];

    this.http.complete(task.id).subscribe((response:any) => { 
      task.completed = true;
    });

  }

  delete(i:number){

    const task = this.tasks[i];

    this.http.delete(task.id).subscribe((response:any) => { 
      this.tasks.splice(i,1);
    });

    
  }

  logout(){
    localStorage.setItem("hash","");
    this.router.navigate(['/login']);
  }



  checkIfLoggedIn(){

    const hash = localStorage.getItem("hash") || "no";

    this.http.getTodos(hash).pipe(

      catchError((err:HttpErrorResponse)=>{

        this.router.navigate(['/login']);
        return throwError(() => new Error('error while logging in'));

      })
  
    )
    .subscribe((response:task[]) => { 
      this.tasks = response;
      this.user = JSON.parse(localStorage.getItem("user") || "");
    });
      
  }

}
