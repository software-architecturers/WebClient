import {Component, OnDestroy, OnInit} from '@angular/core';
import EventModel from '../../event.model';
import {ActivatedRoute} from '@angular/router';
import {GetEventById, RemoveEvent} from '../../store/events.actions';
import {Store} from '@ngxs/store';
import {Subscription} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, OnDestroy {
  event: EventModel;
  eventId: string;
  isLiked: boolean;
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {
    this.eventId = route.snapshot.params.id;
    this.subscriptions.push(
      this.store.dispatch(new GetEventById(this.eventId)).pipe(
        switchMap(() => this.store.select(s => s.events.currentEvent)),
        startWith({name: ''})
      )
        .subscribe(event => this.event = event));
  }

  public onRemoveClick() {
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
