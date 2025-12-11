import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  preparationTime: number;
  cookingTime: number;
  servings: number;
  imageUrl: string;
  category: string;
  difficulty: string;
  createdAt: Date;
}

@Component({
    selector: 'app-ajouter-recette',
    imports: [CommonModule, FormsModule],
    templateUrl: './ajouter-recette.component.html',
    styleUrls: ['./ajouter-recette.component.css']
})
export class AjouterRecetteComponent implements OnInit {

  foodDecorations: any[] = [];

  @Output() recipeAdded = new EventEmitter<Recipe>();

  recipeForm = {
    title: '',
    description: '',
    preparationTime: null as number | null,
    cookingTime: null as number | null,
    servings: null as number | null,
    category: 'Plat Principal',
    difficulty: 'Moyen',
    ingredients: [''],
    steps: [''],
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  };

  categories = [
    'Entrée',
    'Plat Principal',
    'Dessert',
    'Apéritif',
    'Soupe',
    'Salade',
    'Petit-déjeuner',
    'Boisson'
  ];

  difficulties = ['Facile', 'Moyen', 'Difficile'];

  isLoading = false;

  ingredientExamples = [
    '2 tomates',
    '1 oignon',
    '2 gousses d\'ail',
    '1 cuillère à soupe d\'huile d\'olive',
    'Sel et poivre au goût'
  ];

  stepExamples = [
    'Préparer tous les ingrédients',
    'Chauffer l\'huile dans une poêle',
    'Faire revenir les légumes',
    'Assaisonner selon vos préférences',
    'Servir chaud'
  ];

  defaultImages = {
    'Entrée': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'Plat Principal': 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'Dessert': 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'Apéritif': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'Soupe': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'Salade': 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'Petit-déjeuner': 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'Boisson': 'https://images.unsplash.com/photo-1437418747212-8d9709afab22?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.recipeForm.ingredients = [''];
    this.recipeForm.steps = [''];
  }

  addIngredient(): void {
    this.recipeForm.ingredients.push('');
  }

  removeIngredient(index: number): void {
    if (this.recipeForm.ingredients.length > 1) {
      this.recipeForm.ingredients.splice(index, 1);
    }
  }

  addStep(): void {
    this.recipeForm.steps.push('');
  }

  removeStep(index: number): void {
    if (this.recipeForm.steps.length > 1) {
      this.recipeForm.steps.splice(index, 1);
    }
  }

  fillWithExamples(): void {
    this.recipeForm.ingredients = [...this.ingredientExamples];
    this.recipeForm.steps = [...this.stepExamples];
  }

  onCategoryChange(): void {
    this.recipeForm.imageUrl =
      this.defaultImages[this.recipeForm.category as keyof typeof this.defaultImages] ||
      this.defaultImages['Plat Principal'];
  }

  getTotalTime(): number {
    const prep = this.recipeForm.preparationTime || 0;
    const cook = this.recipeForm.cookingTime || 0;
    return prep + cook;
  }

  formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) return `${hours}h ${mins > 0 ? mins + 'min' : ''}`;
    return `${mins}min`;
  }

  isFormValid(): boolean {
    return !!this.recipeForm.title &&
           !!this.recipeForm.description &&
           this.recipeForm.preparationTime !== null &&
           this.recipeForm.cookingTime !== null &&
           this.recipeForm.servings !== null &&
           this.recipeForm.ingredients.some(ing => ing.trim() !== '') &&
           this.recipeForm.steps.some(step => step.trim() !== '');
  }

  onSubmit(): void {
    if (!this.isFormValid()) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      const newRecipe: Recipe = {
        id: Date.now(),
        title: this.recipeForm.title,
        description: this.recipeForm.description,
        ingredients: this.recipeForm.ingredients.filter(ing => ing.trim() !== ''),
        steps: this.recipeForm.steps.filter(step => step.trim() !== ''),
        preparationTime: this.recipeForm.preparationTime || 0,
        cookingTime: this.recipeForm.cookingTime || 0,
        servings: this.recipeForm.servings || 0,
        imageUrl: this.recipeForm.imageUrl,
        category: this.recipeForm.category,
        difficulty: this.recipeForm.difficulty,
        createdAt: new Date()
      };

      this.recipeAdded.emit(newRecipe);

      this.resetForm();
      this.isLoading = false;
      this.router.navigate(['/profile']);
    }, 1500);
  }

  onCancel(): void {
    if (confirm('Voulez-vous vraiment annuler ? Les données saisies seront perdues.')) {
      this.router.navigate(['/profile']);
    }
  }

  resetForm(): void {
    this.recipeForm = {
      title: '',
      description: '',
      preparationTime: null,
      cookingTime: null,
      servings: null,
      category: 'Plat Principal',
      difficulty: 'Moyen',
      ingredients: [''],
      steps: [''],
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    };
  }
}
