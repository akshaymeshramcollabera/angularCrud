import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { studentData } from '../student.model';

@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrls: ['./editstudent.component.css']
})
export class EditstudentComponent implements OnInit {

  formValue!:FormGroup;

  studentModelObj:studentData = new studentData;

  allStudentData : any;

  constructor(private formBuilder:FormBuilder, private api:ApiService, private activeRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name:['', Validators.required],
      email:['', Validators.required],
      mobile:['', Validators.required],
      city:['', Validators.required]
    })

    this.activeRoute.paramMap.subscribe((param)=>{
      var id = Number(param.get('id'));
      this.getDataById(id);
    })
  }

  getDataById(id: number) {
    this.api.getStudentById(id).subscribe((data)=>{
      this.studentModelObj.id = data.id;
      this.formValue.controls['name'].setValue(data.name)
      this.formValue.controls['email'].setValue(data.email)
      this.formValue.controls['mobile'].setValue(data.mobile)
      this.formValue.controls['city'].setValue(data.city)
    })
  }

  //update student
  updateStudentData(){
    this.studentModelObj.name=this.formValue.value.name;
    this.studentModelObj.email=this.formValue.value.email;
    this.studentModelObj.email=this.formValue.value.email;
    this.studentModelObj.mobile=this.formValue.value.mobile;
    this.studentModelObj.city=this.formValue.value.city;

    this.api.updateStudent(this.studentModelObj, this.studentModelObj.id).
    subscribe(res=>{
      this.formValue.reset();
      alert("Record updated successfully");
      this.router.navigate(['/student'])
    },
    err=>{
      alert("Something went wrong");
    })
  }

}
