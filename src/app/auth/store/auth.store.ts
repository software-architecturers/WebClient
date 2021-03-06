import UserModel from '../models/user.model';
import { State, StateContext, Action, NgxsOnInit, Selector } from '@ngxs/store';
import { Login, Logout } from './auth.actions';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface AuthStateModel {
  token: string;
  currentUser: UserModel;
}


@State<AuthStateModel>({
  name: 'auth'
})
export class AuthState implements NgxsOnInit {

  constructor(private jwt: JwtHelperService) { }
  @Selector()
  static token({ token }: AuthStateModel) {
    return token;
  }


  @Selector()
  static currentUser({ currentUser }: AuthStateModel) {
    return currentUser;
  }

  ngxsOnInit({ dispatch, getState }: StateContext<AuthStateModel>) {
    const { token } = getState();
    dispatch(new Login(token));
  }



  @Action(Login)
  login({ setState }: StateContext<AuthStateModel>, { token }: Login) {
    try {
      const body: any = this.jwt.decodeToken(token);
      setState({
        currentUser: this.bodyToUserModel(body),
        token
      });
    } catch (e) {
      setState({ currentUser: undefined, token: undefined });
    }
  }
  @Action(Logout)
  logout({ setState }: StateContext<AuthStateModel>, _: Logout) {
    setState({
      currentUser: null,
      token: null
    });
  }

  private bodyToUserModel({ sub, name }: any): UserModel {
    return {
      id: sub,
      username: name
    };
  }
}
