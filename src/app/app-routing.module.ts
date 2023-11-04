import { Component, NgModule } from "@angular/core";
import { ROUTES, RouterModule, Routes } from '@angular/router';

import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { AlertInvalidRecipeComponent } from "./recipes/alert-invalid-recipe/alert-invalid-recipe.component";
import { RecipeStartpageComponent } from "./recipes/recipe-startpage/recipe-startpage.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { AuthenticationComponent } from "./authentication/authentication.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes', component: RecipesComponent, children: [
      { path: '', component: RecipeStartpageComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: 'invalid-id', component: AlertInvalidRecipeComponent },
      { path: ':id', component: RecipeDetailComponent, resolve: { recipes: 'recipeResolver' } },
      { path: ':id/edit', component: RecipeEditComponent, resolve: { recipes: 'recipeResolver' } }
    ]
  },
  { path: 'shoppingList', component: ShoppingListComponent },
  { path: 'authentication', component: AuthenticationComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}