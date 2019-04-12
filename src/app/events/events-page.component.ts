import { Component, OnDestroy, OnInit } from '@angular/core';
import EventModel from './event.model';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  events: Array<EventModel>;

  constructor(private store: Store) {
    this.subscriptions.push(store.select(state => state.events.eventList)
      .subscribe(data => this.events = data)
    );
  }

  ngOnInit() {
    console.log(this.events);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
