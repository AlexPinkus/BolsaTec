import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Observable } from 'rxjs';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  studentsl: any[] = [];
  students: Observable<any[]>;

  loading = true;
  constructor(public studentService: StudentService) {
  //   this._studentService.getStudents().subscribe(data => {
  //   // console.log(data);
  //   // for(let key$ in data){
  //   //   console.log(data[key$]);
  //   //   this.students.push(data[key$]);
  //   // }
  //   this.students = data;
  //   this.loading = false;
  //   // setTimeout(()=>{
  //   //   this.students=data;
  //   //   this.loading=false;
  //   // }, 3000);
  // });
}

  ngOnInit() {
    this.students = this.studentService.getData();
    this.studentService.getData().subscribe(data => {
      console.log('!!!!!!!!!!!!!data :', data);
    });
    console.log('students :', this.students);
  }

  deleteStudent(id: string) {
    console.log('id :', id);
    this.studentService.deleteStudent(id).then(res => {
      alert('El estudiante fue borrado');
    });
  }

  // borrarStudent(key$: string) {
  //   this._studentService.borrarStudent(key$).subscribe(respuesta => {
  //     if (respuesta) {
  //       console.error(respuesta);
  //     } else {
  //       // todo bien
  //       delete this.students[key$];
  //     }
  //   });
  // }

}
