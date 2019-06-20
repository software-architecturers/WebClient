


export class Login {
  static readonly type = '[Auth] Login';
  constructor(public token: string) {}
}
export class Logout {
  static readonly type = '[Auth] Logout';
  constructor() {}
}
