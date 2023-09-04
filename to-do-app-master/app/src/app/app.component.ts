import { Component } from '@angular/core';
import { HttpService } from './services/http.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private http:HttpService, private router:Router){}

  title = 'to-do';

  hash = localStorage.getItem("hash") || "no";

  ngOnInit(){

    this.http.getTodos(this.hash).pipe(

      catchError((err:HttpErrorResponse)=>{

        this.router.navigate(['/login']);
        return throwError(() => new Error('error while logging in'));

      })
  
    )
    .subscribe((response:any) => { 
  
      this.router.navigate(['/todo']);
  
    });
    
  }

  
  
}
