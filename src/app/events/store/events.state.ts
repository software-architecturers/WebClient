import { State, Action, StateContext } from '@ngxs/store';
import EventModel from '../event.model';
import {GetEvents, AddEvent, RemoveEvent, LikeEvent, GetEventById} from './events.actions';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

const apiUrl = 'http://192.168.43.254:8081';

export interface EventsStateModel {
  eventList: Array<EventModel>;
  currentEvent: EventModel;
}

@State<EventsStateModel>({
  name: 'events',
  defaults: {
    eventList: [],
    currentEvent: null
  }
})

export class EventsState {

  constructor(private http: HttpClient) {}

  @Action(GetEvents)
  getEvents(context: StateContext<EventsStateModel>) {
    return this.http.get<Array<EventModel>>(`${apiUrl}/api/events`).pipe(tap(data  => {
      context.patchState({
        eventList: [...data]
      });
    }));
  }

  @Action(GetEventById)
  getEvent(context: StateContext<EventsStateModel>, {id}: GetEventById) {
    const state = context.getState();
    const event = state.eventList.find(v => String(v.id) === id);
    if (event) {
      context.patchState({
        currentEvent: event
      });
      return;
    }
    return this.http.get<EventModel>(`${apiUrl}/api/events/${id}`)
      .pipe(tap(data  => {
      context.patchState({
        currentEvent: {
          id: data.id,
          title: data.title,
          description: data.description,
          images: data.images,
        }
      });
    }));
  }

  @Action(AddEvent)
  addEvent(context: StateContext<EventsStateModel>, { event }: AddEvent) {
    const state = context.getState();
    return this.http.post(apiUrl + '/api/events/add', {
      title: event.title,
      description: event.description,
      images: null
    }).pipe(tap(data => {
      context.patchState({
        eventList: [...state.eventList, event]
      });
    }));
  }

  @Action(RemoveEvent)
  removeEvent(context: StateContext<EventsStateModel>, { id }: RemoveEvent) {
    const state = context.getState();
    const events = state.eventList.filter(event => event.id !== id);
    return this.http.delete(`${apiUrl}/api/events/delete/${id}`).pipe(tap(data => {
      context.patchState({
        eventList: events
      });
    }));
  }

  @Action(LikeEvent)
  likeEvent(context: StateContext<EventsStateModel>, { id }: LikeEvent) {
    const state = context.getState();
    const event = state.eventList[id];
    this.http.put(apiUrl, {eventId: id}).subscribe(res => {
      if (res === 'ok') {
        context.patchState({
          eventList: []
        });
      }
    });
  }
}
