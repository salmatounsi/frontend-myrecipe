import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-signin',
    imports: [FormsModule],
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {

  // Champs du formulaire utilisés par ngModel
  email: string = '';
  password: string = '';
  

  

  // Animation des aliments
  private foodInterval: any;
  private foodEmojis = [
    '🍕', '🍔', '🥗', '🍝', '🍣', '🍩', '🌮', '🥐', '🍓', '🍰',
    '🥑', '🍅', '🥦', '🥝', '🍌', '🍇', '🍉', '🧀', '🥞', '🍗'
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
      //this.initFoodAnimation();
  }

  ngOnDestroy(): void {
    if (this.foodInterval) {
      clearInterval(this.foodInterval);
    }
  }

  // Animation des aliments
  initFoodAnimation(): void {
    for (let i = 0; i < 8; i++) {
      setTimeout(() => this.createFoodItem(), i * 300);
    }

    this.foodInterval = setInterval(() => {
      this.createFoodItem();
    }, 1500);
  }

  createFoodItem(): void {
    const foodBackground = document.querySelector('.food-background');
    if (!foodBackground) return;

    const foodItem = document.createElement('div');
    foodItem.classList.add('food-item');

    const randomEmoji = this.foodEmojis[Math.floor(Math.random() * this.foodEmojis.length)];
    foodItem.textContent = randomEmoji;

    foodItem.style.left = Math.random() * 100 + '%';
    foodItem.style.fontSize = (Math.random() * 2 + 1.5) + 'rem';

    const orangeShades = ['#FF6600', '#FF8C42', '#FFB347', '#FFD166', '#FFA500'];
    foodItem.style.color = orangeShades[Math.floor(Math.random() * orangeShades.length)];

    const duration = Math.random() * 10 + 20;
    foodItem.style.animationDuration = duration + 's';

    const delay = Math.random() * -30;
    foodItem.style.animationDelay = delay + 's';

    foodBackground.appendChild(foodItem);

    setTimeout(() => {
      if (foodItem.parentNode) {
        foodItem.parentNode.removeChild(foodItem);
      }
    }, duration * 1000);
  }

  // Soumission du formulaire
  onSubmit(): void {
    if (!this.email || !this.password) {
      return;
    }

    



    // Simulation d'une requête
    setTimeout(() => {
      console.log('Connexion avec :', { email: this.email, password: this.password });

      this.router.navigate(['/dashboard']);
    }, 2000);
  }

 
  }

