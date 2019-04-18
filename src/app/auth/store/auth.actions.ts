


export class SetUser {
  static readonly type = '[Auth] Set user';
  constructor(public profile: any) {}
}
export class RemoveUser {
  static readonly type = '[Auth]  Remove user';
  constructor() {}
}
