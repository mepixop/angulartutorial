import { Component, Input } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from 'src/app/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe

  constructor(private recipeService: RecipeService) { }

  onAddToShoppinglist() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }
}
