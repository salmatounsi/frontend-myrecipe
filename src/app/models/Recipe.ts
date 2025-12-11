import { Ingredient } from "./Ingredient";
import { Step } from "./Step";
import { User } from "./User";

export interface Recipe {
  id?: number;
  title: string;
  photoUrl?: string | "recipe.png";
  description?: string | null;
  preparationTime?: string | null; 
  numberOfServings: number;
  user?: User | null;
  ingredients: Ingredient[];
  steps: Step[];
  type: string;
}