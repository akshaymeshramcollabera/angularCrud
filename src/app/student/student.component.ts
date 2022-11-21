import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { studentData } from './student.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

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
    this.getStudentData();
  }

  //getData
  getStudentData(){
    this.api.getStudent().
    subscribe(res=>{
      this.allStudentData=res;
    })
  }

  //deletedata
  deleteStudentData(data:any){
    if(confirm('Are you sure to delete?'))
    this.api.deleteStudent(data.id).
    subscribe(res=>{
      alert("Record deleted successfully")
      this.getStudentData();
    })
  }

}
