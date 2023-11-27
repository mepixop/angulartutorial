import { NgModule } from "@angular/core";
import { AuthenticationComponent } from "./authentication.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AuthRoutingModule,
  ],
})
export class AuthModule { }