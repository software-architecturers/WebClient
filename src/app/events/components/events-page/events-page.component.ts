import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import EventModel from '../../event.model';
import {Store} from '@ngxs/store';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {PaginationService} from '../../services/pagination.service';
import {GetEvents, SearchEvent} from '../../store/events.actions';
import {startWith, map, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnDestroy, AfterViewInit {
  private subscriptions: Subscription[] = [];
  allEvents: Array<EventModel>;
  pageEvents: Array<EventModel>;
  pagination: any;

  @ViewChild('eventsSearchInput') searchInput: ElementRef;

  constructor(
    private store: Store,
    private eventsService: PaginationService
  ) {
    this.store.dispatch(new GetEvents());
    this.subscriptions.push(this.store.select(state => state.events.eventList)
      .subscribe(data => {
        this.allEvents = data;
        this.setPage(1);
      })
    );
  }

  ngAfterViewInit() {
    /*Add handler for search input*/
    this.subscriptions.push(fromEvent<any>(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(search => this.store.dispatch(new SearchEvent(search)))
      ).subscribe()
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public setPage(page: number) {
    this.pagination = this.eventsService.getPagination(this.allEvents.length, page, 9);
    this.pageEvents = this.allEvents.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
  }

}
