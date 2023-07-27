import { EventEmitter, Injectable } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe(
            'shtimps in shells',
            'Just deliceos sea food.',
            'https://assets.epicurious.com/photos/5be1c1bf587ad42d4b37c134/1:1/w_640,c_limit/Vegetarian-Skillet-Stuffed-Shells-01112018.jpg',
            [
                new Ingredient('shrimps', 5),
                new Ingredient('shells', 4),
                new Ingredient('tomatoes', 3)
            ]),
        new Recipe('Khinkali',
         'The best food in the world!',
          'https://images.squarespace-cdn.com/content/v1/5e0a384845deef2566757c89/1583597752499-6CSD0FQZV9B30YFZNRVW/988A2004.jpg',
          [
                new Ingredient('comi', 100),
                new Ingredient('meat', 20),
                new Ingredient('black papper', 2),
          ])
    ];
    recipeSelected = new EventEmitter<Recipe>();

    constructor(private shoppingListService: ShoppingListService) { }

    getRecipes(){
        return this.recipes.slice(); 
    }

    addingredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredientsFromRecipe(ingredients);
    }

}