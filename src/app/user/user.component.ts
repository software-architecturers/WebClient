import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import UserModel from '../auth/models/user.model';
import { Navigate } from '@ngxs/router-plugin';
import { AuthState } from '../auth/store/auth.store';

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
    const currentUser = store.selectSnapshot(AuthState.currentUser);
    if (this.userId === currentUser.id) {
      this.user = currentUser;
    } else {
      store.dispatch(new Navigate(['']));
    }

  }

  get pictureUrl() {
    return 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Mozilla_Firefox_3.5_logo_256.png';
  }

  ngOnInit() { }

}
