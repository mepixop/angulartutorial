import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


import { Recipe } from '../recipes.model';
import { RecipeService } from 'src/app/recipe.service';
import { AlertInvalidRecipeComponent } from '../alert-invalid-recipe/alert-invalid-recipe.component';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe
  id: number

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipe = this.recipeService.getRecipeById(+params['id']);
        if (this.recipe == undefined) {
          this.recipe = new Recipe('', '', '', [], 0)
          this.router.navigateByUrl('/recipes/invalid-id');
        }
        this.id = +params['id'];
      });
  }

  onAddToShoppinglist() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route })

  }
}
