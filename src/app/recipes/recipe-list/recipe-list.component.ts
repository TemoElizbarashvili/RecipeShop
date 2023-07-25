import { Component, Output, EventEmitter } from '@angular/core';


import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'Just Test','https://assets.epicurious.com/photos/5be1c1bf587ad42d4b37c134/1:1/w_640,c_limit/Vegetarian-Skillet-Stuffed-Shells-01112018.jpg'),
    new Recipe('Khinkali', 'The best food in the world!', 'https://images.squarespace-cdn.com/content/v1/5e0a384845deef2566757c89/1583597752499-6CSD0FQZV9B30YFZNRVW/988A2004.jpg')
  ];

  constructor() { }

  onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe);
  }
}
