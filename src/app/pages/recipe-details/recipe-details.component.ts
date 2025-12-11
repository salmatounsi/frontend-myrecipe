import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

interface Ingredient {
  name: string;
  quantity: string;
}

interface RecipeDetail {
  id: number;
  title: string;
  image: string;
  ingredients: Ingredient[];
  steps: string[];
}

@Component({
    selector: 'app-recipe-details',
    imports: [CommonModule, RouterModule],
    templateUrl: './recipe-details.component.html',
    styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: RecipeDetail | undefined;

  private allRecipes: RecipeDetail[] = [
    {
      id: 1,
      title: "Tiramisu",
      image: "C:\Users\salma\Desktop\recettes\recettes-frontend\images\tiramissu.jpg",
      ingredients: [
        { name: "Mascarpone", quantity: "250g" },
        { name: "Biscuits cuillère", quantity: "12 pièces" },
        { name: "Café fort", quantity: "200 ml" },
        { name: "Cacao en poudre", quantity: "2 c. à soupe" }
      ],
      steps: [
        "Préparer un café fort et le laisser refroidir.",
        "Mélanger le mascarpone avec le sucre et les jaunes d'œufs.",
        "Monter les blancs en neige et les incorporer délicatement.",
        "Tremper rapidement les biscuits dans le café et les disposer dans un plat.",
        "Alterner couches de biscuits et de crème au mascarpone.",
        "Mettre au frais au moins 4 heures puis saupoudrer de cacao avant de servir."
      ]
    },
    {
      id: 2,
      title: "Couscous",
      image: "assets/recipe.jpg",
      ingredients: [
        { name: "Semoule de couscous", quantity: "300g" },
        { name: "Carottes", quantity: "3" },
        { name: "Courgettes", quantity: "2" },
        { name: "Pois chiches", quantity: "150g" }
      ],
      steps: [
        "Préparer la semoule selon les indications.",
        "Cuire les légumes dans un bouillon épicé.",
        "Ajouter les pois chiches en fin de cuisson.",
        "Servir la semoule avec les légumes et le bouillon."
      ]
    },
    {
      id: 3,
      title: "Jus d'orange",
      image: "assets/pasta.jpg",
      ingredients: [
        { name: "Oranges", quantity: "4" },
        { name: "Sucre", quantity: "1 c. à soupe (optionnel)" },
        { name: "Eau froide", quantity: "100 ml (optionnel)" }
      ],
      steps: [
        "Presser les oranges.",
        "Ajouter un peu de sucre si nécessaire.",
        "Allonger avec un peu d'eau si le jus est trop fort.",
        "Servir bien frais."
      ]
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id === null || Number.isNaN(id)) {
      this.router.navigate(['/']);
      return;
    }

    this.recipe = this.allRecipes.find(r => r.id === id);

    if (!this.recipe) {
      this.router.navigate(['/']);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  onImageError(event: any) {
    event.target.src = "assets/recipe.jpg";
  }
}