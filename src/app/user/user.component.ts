import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from '../auth/user.model';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


  userId: string;

  user: UserModel;

  constructor(private activatedRoute: ActivatedRoute, private auth: AuthService, private store: Store) {
    this.userId = activatedRoute.snapshot.params.id;
    const currentUser = store.selectSnapshot(state => state.auth.currentUser);
    if (this.userId === currentUser.id) {
      this.user = currentUser;
    } else {
      // TODO: get user from userinfo endpoint
      store.dispatch(new Navigate(['']));
    }

  }

  get pictureUrl() {
    if (this.user.pictureUrl) {
      return this.user.pictureUrl;
    }
    return 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Mozilla_Firefox_3.5_logo_256.png';
  }

  ngOnInit() { }

}
