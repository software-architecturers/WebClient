import { State, Action, StateContext } from '@ngxs/store';
import EventModel from '../event.model';
import {GetEvents, AddEvent, RemoveEvent} from './events.actions';
import {HttpClient} from '@angular/common/http';

export interface EventsStateModel {
  eventList: Array<EventModel>;
}

@State<EventsStateModel>({
  name: 'events',
  defaults: {
    eventList: []
  }
})

export class EventsState {

  constructor(private http: HttpClient) {}

  @Action(GetEvents)
  getEvents(context: StateContext<EventsStateModel>) {
    this.http.get<Array<EventModel>>('assets/events.json').subscribe(data  => {
      context.setState({
        eventList: [...data]
      });
    });
  }

  @Action(AddEvent)
  addEvent(context: StateContext<EventsStateModel>, { event }: AddEvent) {
    const state = context.getState();
    context.patchState({
      eventList: [...state.eventList, event]
    });
  }

  @Action(RemoveEvent)
  removeEvent(context: StateContext<EventsStateModel>, { id }: RemoveEvent) {
    const state = context.getState();
    const events = state.eventList.filter(event => event.id !== id);
    context.patchState({
      eventList: events
    });
  }
}
