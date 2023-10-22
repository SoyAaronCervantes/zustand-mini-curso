import superagent, {ResponseError} from 'superagent';
import {LoginResponse} from "../types";
import {tesloAPI} from "../api/teslo";

export class AuthService {
  static login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const loginRequest = superagent
        .post('/auth/login')
        .send({email, password});
      const res = await tesloAPI(loginRequest);
      return res.body as LoginResponse;

    } catch (e) {
      const error = e as ResponseError;
      console.error({ message: error.response?.body.message });
      throw new Error('Login failed');
    }
  }

  static checkStatus = async (): Promise<LoginResponse> => {
    const request = superagent.get('/auth/check-status');
    try {
      const res = await tesloAPI(request);
      return res.body as LoginResponse;
    } catch (e) {
      const error = e as ResponseError;
      console.error({ message: error.response?.body.message });
      throw new Error('Unauthorized, unable to check status');
    }
  }
}
