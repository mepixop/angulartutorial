import { NgModule } from "@angular/core";
import { AuthenticationComponent } from "./authentication.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: 'authentication', component: AuthenticationComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }


