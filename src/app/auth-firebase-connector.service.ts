import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface SignupResponse {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
}


@Injectable({ providedIn: "root" })
export class AuthFirebaseConnector {
  private signUpUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp";
  private api_key: string = " AIzaSyDWKqCvV2NWHCYdtX9dhFoGxW-aBFgL2QU ";

  constructor(private httpClient: HttpClient) { }

  register(email: string, password: string): Observable<SignupResponse> {
    const headers = {
      params: {
        'key': this.api_key,
      },
    };

    const requestBody = {
      email: email,
      password: password,
      returnSecureToken: true,
    }

    return this.httpClient.post<SignupResponse>(this.signUpUrl, requestBody, headers);
  }
}