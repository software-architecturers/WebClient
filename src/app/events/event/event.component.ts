import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import EventModel from '../event.model';
import {ActivatedRoute} from '@angular/router';
import { RemoveEvent } from '../store/events.actions';
import { Store } from '@ngxs/store';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, OnDestroy{
  eventId: string;
  event: EventModel;
  isLiked: boolean;
  private subscriptions: Subscription[] = [];


  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {
    this.eventId = route.snapshot.params.id;
    this.subscriptions.push(store.select(state => state.events.eventList)
      .subscribe(data => {
        data.map(event => event.id === this.eventId ? this.event = event : null);
      })
    );
  }

  public onClick() {
    this.store.dispatch(new RemoveEvent(this.eventId));
  }

  public onLikeClick() {
    this.isLiked = !this.isLiked;
  }

  ngOnInit(): void {
    this.isLiked = false;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
