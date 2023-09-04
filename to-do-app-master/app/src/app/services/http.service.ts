import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

type user = {avatar: string, id: number, name: string, username: string};
type task = {completed: boolean, id: number, task: string, user_id: number};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url="http://localhost:4000";

  constructor( private http:HttpClient ) { }

  getUsers(){

    return this.http.get<user[]>(this.url+`/users`);
    
  }

  getTodos( hash:string ){
    return this.http.get<task[]>(this.url+`/todos`,{ headers : new HttpHeaders({ Authorization: "BASIC " + hash }) });
  }

  addTask(task:task){

    const hash = localStorage.getItem("hash") || "";

    return this.http.post<task>(`${this.url}/todos`,
    task,
    { headers : new HttpHeaders({ Authorization: "BASIC " + hash }) }
    );

  }

  complete(id:number){

    const hash = localStorage.getItem("hash") || "";

    return this.http.put(`${this.url}/todos/${id}`,
    null,
    { headers : new HttpHeaders({ Authorization: "BASIC " + hash }) }
    );

  }

  delete(id:number){

    const hash = localStorage.getItem("hash") || "";

    return this.http.delete(`${this.url}/todos/${id}`,
    { headers : new HttpHeaders({ Authorization: "BASIC " + hash }) }
    );
    
  }


}
