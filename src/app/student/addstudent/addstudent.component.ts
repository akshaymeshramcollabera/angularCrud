import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { studentData } from '../student.model';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.css']
})
export class AddstudentComponent implements OnInit {

  formValue!:FormGroup;

  studentModelObj:studentData = new studentData;

  allStudentData : any;

  constructor(private formBuilder:FormBuilder, private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name:['', Validators.required],
      email:['', Validators.required],
      mobile:['', Validators.required],
      city:['', Validators.required]
    })
  }

  addStudent(){
    this.studentModelObj.name=this.formValue.value.name;
    this.studentModelObj.email=this.formValue.value.email;
    this.studentModelObj.mobile=this.formValue.value.mobile;
    this.studentModelObj.city=this.formValue.value.city;

    this.api.postStudent(this.studentModelObj).subscribe(res=>{
      console.log(res);
      this.formValue.reset();
      alert("Record added successfully")
      this.router.navigate(['student'])
    }, err=>{
      alert("Something went wrong !!")
    })

  }

}
