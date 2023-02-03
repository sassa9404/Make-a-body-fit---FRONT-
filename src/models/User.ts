import { ObjectiveType } from "./Objective";

export interface UserType {
  id?: string;
  email: string;
  password: string;
  name: string;
  age: string;
  date_start?: string;
  picture?: string;
  role?: string;
  objective :ObjectiveType;
}

