import { Component, OnDestroy, OnInit } from '@angular/core';
import EventModel from './event.model';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { EventsService} from './events.service';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  allEvents: Array<EventModel>;
  pageEvents: Array<EventModel>;
  pagination: any;

  constructor(private store: Store, private eventsService: EventsService) {
    this.subscriptions.push(store.select(state => state.events.eventList)
      .subscribe(data => this.allEvents = data)
    );
  }

  ngOnInit() {
    this.setPage(1);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public setPage(page: number) {
    this.pagination = this.eventsService.getPagination(this.allEvents.length, page, 9);
    this.pageEvents = this.allEvents.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
  }

}
