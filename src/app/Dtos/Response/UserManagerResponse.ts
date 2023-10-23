import { IdentityError } from "./IdentityError";

export interface UserManagerResponse{
  message: string ;
  isSuccess: boolean;
  data: any | null;
  status: number;
  errors: IdentityError[] | null;
}

