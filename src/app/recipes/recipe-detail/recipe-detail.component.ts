import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() currentRecipe: any;

  constructor(private recipeService: RecipeService) { }

  onToShoppingList(){
    this.recipeService.addingredientsToShoppingList(this.currentRecipe.ingredients.slice());
  }
}
 