import { Component } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('Testfood', 'Easy to make test', 'https://img.freepik.com/premium-vector/job-exam-test-vector-illustration_138676-243.jpg'),
    new Recipe('Testfood1', 'Easy to make test', 'https://img.freepik.com/premium-vector/job-exam-test-vector-illustration_138676-243.jpg')
  ]

}
