import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { AuthenticationComponent } from "./authentication/authentication.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}