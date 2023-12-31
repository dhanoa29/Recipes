import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  activeSub: Subscription;

  constructor(private shoppinglistService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppinglistService.getIngredients();
    this.activeSub = this.shoppinglistService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  onEditItem(index: number) {
    this.shoppinglistService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.activeSub.unsubscribe();
  }
}
