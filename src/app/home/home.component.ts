import { Component } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecipeCardComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  recipes = [
    {
      id: 1,
      title: 'Tiramisu',
      image: 'assets/recipe.jpg',
      userPhoto: 'assets/user.jpg',
      type: 'dessert'
    },
    {
      id: 2,
      title: 'Couscous',
      image: 'assets/recipe.jpg',
      userPhoto: 'assets/user.jpg',
      type: 'plat'
    },
    {
      id: 3,
      title: 'Jus d’orange',
      image: 'assets/recipe.jpg',
      userPhoto: 'assets/user.jpg',
      type: 'boisson'
    }
  ];
}
