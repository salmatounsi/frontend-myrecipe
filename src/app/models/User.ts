import { Recipe } from "./Recipe";

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string; 
  photoUserString?: string | null;
  extPhoto?: string | null;
  
  recipes?: Recipe[]; 
}
