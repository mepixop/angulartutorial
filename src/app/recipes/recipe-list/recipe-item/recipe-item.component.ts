import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipes.model';
import { RecipeService } from 'src/app/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;

  constructor(private recipesService: RecipeService) { }

  onSelected() {
    this.recipesService.recipeSelected.emit(this.recipe)
  }

}
