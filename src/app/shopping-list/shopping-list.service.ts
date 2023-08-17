import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    //Returning a new array
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  //   addIngredient(ingredient: Ingredient) {
  //     const index = this.isAvailable(ingredient.name);
  //     if (index !== -1) {
  //       this.ingredients[index].amount += ingredient.amount;
  //     } else {
  //       this.ingredients.push(ingredient);
  //     }
  //     this.ingredientsChanged.emit(this.ingredients.slice());
  //   }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  checkDefault() {
    return (
      this.ingredients[0].name === 'Apples' &&
      this.ingredients[0].amount === 5 &&
      this.ingredients[1].name === 'Tomatoes' &&
      this.ingredients[1].amount === 10
    );
  }

  emptyIngredients() {
    this.ingredients = [];
  }

  isAvailable(name: string) {
    for (let i = 0; i < this.ingredients.length; i++) {
      if (this.ingredients[i].name === name) return i;
    }
    return -1;
  }
}
