import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { RecipeStartpageComponent } from "./recipe-startpage/recipe-startpage.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { AlertInvalidRecipeComponent } from "./alert-invalid-recipe/alert-invalid-recipe.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";


const routes: Routes = [
  {
    path: 'recipes', component: RecipesComponent, canActivate: ['authGuard'],
    children: [
      { path: '', component: RecipeStartpageComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: 'invalid-id', component: AlertInvalidRecipeComponent },
      { path: ':id', component: RecipeDetailComponent, resolve: { recipes: 'recipeResolver' } },
      { path: ':id/edit', component: RecipeEditComponent, resolve: { recipes: 'recipeResolver' } }
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RecipesRoutingModule { }