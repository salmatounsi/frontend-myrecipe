import { Component, OnInit } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { CommonModule, NgFor } from '@angular/common';
import { HomeServiceService } from '../services/home-service.service';
import { Recipe } from '../models/Recipe';
import { FormsModule } from '@angular/forms'; 
@Component({
    selector: 'app-home',
    standalone:true,
    imports: [RecipeCardComponent, CommonModule, NgFor, FormsModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.loadRecipes();
  }

  constructor(private homeServiceService :HomeServiceService) { }
  recipes = []  as Recipe[];
  unfilteredRecipes= [] as Recipe[] ;
  searchText: string = '';
  selectedType: string = '';

  loadRecipes(): void {
    this.homeServiceService.getRecettes().subscribe((data) => {
      console.log(data);
      this.recipes = data;
      this.unfilteredRecipes = data;
    });}

     filterRecipes(): void {
    this.recipes = this.unfilteredRecipes.filter(recipe => {
      const matchesText = recipe.title.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesType = this.selectedType ? recipe.type === this.selectedType : true;
      return matchesText && matchesType;
    });
  }
  
 
}
