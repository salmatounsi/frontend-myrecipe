import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Recipe } from '../models/Recipe';
import { Ingredient } from '../models/Ingredient';
import { Step } from '../models/Step';
import { RecipeServiceService } from '../services/recipe-service.service';

@Component({
  selector: 'app-ajouter-recette',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ajouter-recette.component.html',
  styleUrls: ['./ajouter-recette.component.css']
})
export class AjouterRecetteComponent implements OnInit {
isLoading: boolean = false; 
  @Output() recipeAdded = new EventEmitter<Recipe>();

  constructor(
    private router: Router,
    private recipeService: RecipeServiceService
  ) {}

  ngOnInit(): void {}

  recipeForm = {
    title: '',
    description: '',
    preparationTime: null as number | null,
    servings: null as number | null,
    type: 'Plat Principal',

    ingredients: [''],
    steps: [''],

    photoUrl: 'recipe.png'
  };


  addIngredient() { this.recipeForm.ingredients.push(''); }
  removeIngredient(i: number) {
    if (this.recipeForm.ingredients.length > 1)
      this.recipeForm.ingredients.splice(i, 1);
  }

  addStep() { this.recipeForm.steps.push(''); }
  removeStep(i: number) {
    if (this.recipeForm.steps.length > 1)
      this.recipeForm.steps.splice(i, 1);
  }

  isFormValid(): boolean {
    return !!this.recipeForm.title &&
           !!this.recipeForm.description &&
           this.recipeForm.preparationTime !== null &&
           this.recipeForm.servings !== null &&
           this.recipeForm.ingredients.some(i => i.trim() !== '') &&
           this.recipeForm.steps.some(s => s.trim() !== '');
  }

  onSubmit() {
    if (!this.isFormValid()) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const ingredients: Ingredient[] = this.recipeForm.ingredients
      .filter(i => i.trim() !== '')
      .map(i => ({
        name: i,
        photoIngredientString: null,
        extPhoto: null
      }));

    const steps: Step[] = this.recipeForm.steps
      .filter(s => s.trim() !== '')
      .map((s, index) => ({
        description: s,
        stepNumber: index + 1
      }));

    const newRecipe: Recipe = {
      title: this.recipeForm.title,
      numberOfServings: this.recipeForm.servings!,
      description: this.recipeForm.description,
      preparationTime: this.recipeForm.preparationTime?.toString() ?? null,
      ingredients,
      steps,
      type: this.recipeForm.type,
      photoUrl: this.recipeForm.photoUrl
    };
    console.log('New Recipe:', newRecipe);

    this.recipeService.addRecette(newRecipe).subscribe({
      next: (savedRecipe) => {
        this.recipeAdded.emit(savedRecipe);
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        console.error('Recipe add error:', err);
        alert('Erreur lors de l’envoi.');
      }
    });
  }

  onCancel() {
    if (confirm('Annuler ?')) {
      this.router.navigate(['/profile']);
    }
  }
}
