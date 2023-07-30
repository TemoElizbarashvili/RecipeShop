import { Subject } from 'rxjs';

import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService { 

    ingredientsChanged = new Subject<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
        new Ingredient('Potato', 4),
    ];


    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredientsFromRecipe(ingredients: Ingredient[]){
        ingredients.forEach(ingredient => {
            if(this.ingredients.includes(ingredient)){
                const index = this.ingredients.findIndex(ing => ing.name === ingredient.name);
                if(index != undefined){
                    this.ingredients[index].amount += ingredient.amount;
                }
            }
            else{
                this.ingredients.push(ingredient);
            }
        });
        // this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}