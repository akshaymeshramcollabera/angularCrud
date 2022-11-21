import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  constructor(private formBuilder:FormBuilder, private router:Router, private _http:HttpClient) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }

  login(){
    this._http.get<any>("http://localhost:3000/signup").
    subscribe(req=>{
      //match email and password for login with json-server signup data
      const user = req.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
      })

      //condition for login
      if(user){
        alert("successfully logged in");
        this.loginForm.reset;
        this.router.navigate(['student'])
      } else{
        alert("User not found with these credentials")
      }
    }, err=>{
      alert("Something went wrong");
    })
  }

}
