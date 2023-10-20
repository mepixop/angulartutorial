import { Component, NgModule } from "@angular/core";
import { ROUTES, RouterModule, Routes } from '@angular/router';

import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { AlertInvalidRecipeComponent } from "./recipes/alert-invalid-recipe/alert-invalid-recipe.component";
import { RecipeStartpageComponent } from "./recipes/recipe-startpage/recipe-startpage.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes', component: RecipesComponent, children: [
      { path: '', component: RecipeStartpageComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: 'invalid-id', component: AlertInvalidRecipeComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent }
    ]
  },
  { path: 'shoppingList', component: ShoppingListComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}