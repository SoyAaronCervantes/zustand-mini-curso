import superagent, {HTTPError, ResponseError} from 'superagent';
import {LoginResponse} from "../types";
import {tesloAPI} from "../api/teslo";

export class AuthService {
  static login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const loginRequest = superagent
        .post('/auth/login')
        .send({email, password});
      const res = await tesloAPI(loginRequest);
      const data = res.body as LoginResponse;

      console.log(data);
      return data;

    } catch (error: unknown) {
      console.log(error);
      throw new Error('Login failed');
    }
  }
}
