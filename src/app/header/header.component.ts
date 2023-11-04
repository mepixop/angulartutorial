import { Component } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { recipeFirebaseService } from '../recipe-firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private recipeFirebaseService: recipeFirebaseService) { }

  loadRecipes() {
    this.recipeFirebaseService.getRecipes().subscribe();
  }
  saveRecipes() {
    this.recipeFirebaseService.putRecipes();
  }
}
