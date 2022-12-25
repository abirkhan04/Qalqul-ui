import { IkeyValue } from "../interfaces/app-interfaces";
import AuthService from "../services/auth.service";

export function authenticate(credentials: IkeyValue) {
  return AuthService.authenticate(credentials);
}
