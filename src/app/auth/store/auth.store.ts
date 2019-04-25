import { UserModel } from '../models/user.model';
import { State, StateContext, Action } from '@ngxs/store';
import { SetUser, RemoveUser } from './auth.actions';


export interface AuthStateModel {
  currentUser: UserModel;
}


@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    currentUser: null
  }
})
export class AuthState {

  @Action(SetUser)
  setUser({ setState }: StateContext<AuthStateModel>, { profile }: SetUser) {
    console.log(profile);
    const userModel: UserModel = {
      id: profile.sub,
      userName: profile.name,
      pictureUrl: profile.pic
    };
    setState({
      currentUser: userModel
    });
  }
  @Action(RemoveUser)
  removeUser({ setState }: StateContext<AuthStateModel>, _: RemoveUser) {
    setState({
      currentUser: null,
    });
  }
}
