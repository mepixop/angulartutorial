import { Component, OnInit, ViewChild } from '@angular/core';
import { EmailValidator, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signupForm: NgForm
  defaultSubscriptionOption = "Advanced"
  subscriptionOptions = ["Basic", "Advanced", "Pro"]
  submitted: boolean = false

  user = {
    email: '',
    subscriptionOption: "",
    password: ""
  };

  onSubmit() {
    //PRINT values and then reset
    this.submitted = true
    this.user.email = this.signupForm.value.email
    this.user.subscriptionOption = this.signupForm.value.subscriptionOptions
    this.user.password = this.signupForm.value.password
  }
}
