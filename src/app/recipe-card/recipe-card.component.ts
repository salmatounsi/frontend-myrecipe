import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent {
  @Input() recipe: any;
}
