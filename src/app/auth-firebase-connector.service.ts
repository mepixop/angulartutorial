import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, tap, throwError } from "rxjs";
import { User } from "./authentication/user.model";

export interface SignupResponse {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registerd?: boolean
}

export interface RequestPrepObject {
  options: {
    params: HttpParams
    headers: HttpHeaders
  },
  body: {
    [s: string]: string | boolean
  }
}

@Injectable({ providedIn: "root" })
export class AuthService {

  private signUpUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp";
  private singInUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword"
  private api_key: string = " AIzaSyDWKqCvV2NWHCYdtX9dhFoGxW-aBFgL2QU ";
  user: BehaviorSubject<User> = new BehaviorSubject<User>(null)

  constructor(private httpClient: HttpClient) { }

  register(email: string, password: string): Observable<SignupResponse> {
    const request: RequestPrepObject = this.prepare(email, password);
    return this.httpClient.post<SignupResponse>(this.signUpUrl, request.body, request.options).pipe(
      catchError(this.handleError),
      tap(data => { this.handleAuthenticatedUser(data); })
    );
  }

  login(email: string, password: string) {
    const request: RequestPrepObject = this.prepare(email, password);
    return this.httpClient.post<SignupResponse>(this.singInUrl, request.body, request.options).pipe(
      catchError(this.handleError),
      tap(data => { this.handleAuthenticatedUser(data); })
    );
  }


  prepare(email: string, password: string): RequestPrepObject {
    const options = {
      params: new HttpParams().set('key', this.api_key),
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }
    const requestBody = {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    return {
      options: options,
      body: requestBody
    }
  }

  handleAuthenticatedUser(data: SignupResponse) {
    const expiry = new Date(new Date().getTime() + parseInt(data.expiresIn) * 1000)
    const loggedInUser = new User(data.email, data.localId, data.idToken, expiry)
    this.user.next(loggedInUser)
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error: Unknown Error occured.'
    if (!error.error || !error.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (error.error.error.message) {
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Error: Invalid Credentials, please try again.'
      case 'USER_DISABLED':
        errorMessage = 'Error: This User has been disabled, please contact support.'
      case 'EMAIL_EXISTS':
        errorMessage = 'Error: Email already exists, please try loging In.'
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Error: New accounts are currently disabled, please try again later.'
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Error: To many attempts from your device , please try again later.'
    }
    return throwError(() => new Error(errorMessage))
  }

}