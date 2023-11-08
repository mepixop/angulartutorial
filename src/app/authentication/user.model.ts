export class User {
  constructor(
    public email: string,
    public localId: string,
    private _token: string,
    private _tokenExpiration: Date
  ) { }

  get token() {
    if (new Date() > this._tokenExpiration) {
      return null;
    }
    return this._token;
  }
}