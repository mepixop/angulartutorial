import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectform: FormGroup
  status = ['stable', 'critical', 'finished']
  forbiddenName = 'Test'


  ngOnInit(): void {
    this.projectform = new FormGroup({
      'name': new FormControl(null, [Validators.required, this.validateName]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl(null),
    });

    this.projectform.valueChanges.subscribe((value) => console.log(this.projectform));
  }

  validateName(f: FormControl): { [a: string]: boolean } {
    const returnObj = {}
    let flag = false;
    if (f.value === null || f.value.length < 3) {
      returnObj['nameLength'] = true
      flag = true
    }
    if (f.value === 'Test') {
      returnObj['forbidden'] = true;
      flag = true;
    }
    if (flag === true) {
      return returnObj
    }

    return null
  }

  submitForm() {
    console.log(this.projectform);
  }

}
