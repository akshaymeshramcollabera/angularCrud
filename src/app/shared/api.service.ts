import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }

  //create ny post
  postStudent(data:any){
    return this._http.post<any>("http://localhost:3000/posts", data).
    pipe(map((res:any)=>{
      return res;
    }))
  }


  //get student
  getStudent(){
    return this._http.get<any>("http://localhost:3000/posts").
    pipe(map((req:any)=>{
      return req;
    }))
  }

  //Get student by id
  getStudentById(id:number){
    return this._http.get<any>(`http://localhost:3000/posts/${id}`).
    pipe(map((req:any)=>{
      return req;
    }))
  }

  //update student
  updateStudent(data:any, id:number){
    return this._http.put("http://localhost:3000/posts/"+id, data).
    pipe(map((res:any)=>{
      return res;
    }))

  }

  //delete student
  deleteStudent(id:number){
    return this._http.delete<any>("http://localhost:3000/posts/"+id).
    pipe(map((res:any)=>{
      return res;
    }))

  }
}
