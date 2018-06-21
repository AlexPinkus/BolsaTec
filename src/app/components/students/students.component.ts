import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  students: any[] = [];
  loading = true;
  constructor(private _studentService: StudentService) {

    this._studentService.getStudents().subscribe(data => {
    // console.log(data);
    // for(let key$ in data){
    //   console.log(data[key$]);
    //   this.students.push(data[key$]);
    // }
    this.students = data;
    this.loading = false;
    // setTimeout(()=>{
    //   this.students=data;
    //   this.loading=false;
    // }, 3000);
  }); }

  ngOnInit() {
  }

  borrarStudent(key$: string) {
    this._studentService.borrarStudent(key$).subscribe(respuesta => {
      if (respuesta) {
        console.error(respuesta);
      } else {
        // todo bien
        delete this.students[key$];
      }
    });
  }

}
