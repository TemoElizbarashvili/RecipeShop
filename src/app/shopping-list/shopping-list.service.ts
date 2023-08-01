import { Subject } from 'rxjs';

import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService { 
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
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

    getIngredient(index: number){
        return this.ingredients[index];
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

    updateIngredient(index: number, newIngredient: Ingredient) { 
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    DeleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}