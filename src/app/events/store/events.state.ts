import { State, Action, StateContext } from '@ngxs/store';
import { patch, append, updateItem, removeItem } from '@ngxs/store/operators';
import EventModel from '../event.model';
import { GetEvents, AddEvent, RemoveEvent, LikeEvent, GetEventById } from './events.actions';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

const apiUrl = 'http://192.168.43.254:8081';

export interface EventsStateModel {
  eventList: Array<EventModel>;
  currentEvent: EventModel;
}

// TODO: actually add a like
const addLike = () => (event: Readonly<EventModel>) => ({ ...event });

@State<EventsStateModel>({
  name: 'events',
  defaults: {
    eventList: [],
    currentEvent: null
  }
})
export class EventsState {

  constructor(private http: HttpClient) { }

  @Action(GetEvents)
  getEvents({ patchState }: StateContext<EventsStateModel>) {
    return this.http.get<Array<EventModel>>(`${apiUrl}/api/events`).pipe(
      tap(data => patchState({
        eventList: data
      }))
    );
  }

  @Action(GetEventById)
  getEvent({ patchState, getState }: StateContext<EventsStateModel>, { id }: GetEventById) {
    const events = getState().eventList;
    const event = events.find(v => v.id.toString() === id);
    if (event) {
      patchState({
        currentEvent: event
      });
      return;
    }
    return this.http.get<EventModel>(`${apiUrl}/api/events/${id}`)
      .pipe(tap(data => {
        patchState({
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
  addEvent({ setState }: StateContext<EventsStateModel>, { event }: AddEvent) {
    return this.http.post<EventModel>(apiUrl + '/api/events/add', {
      title: event.title,
      description: event.description,
      images: null
    }).pipe(
      tap(data => setState(patch({
        eventList: append([data])
      })))
    );
  }

  @Action(RemoveEvent)
  removeEvent({ setState }: StateContext<EventsStateModel>, { id }: RemoveEvent) {
    return this.http.delete(`${apiUrl}/api/events/delete/${id}`).pipe(
      tap(() => setState(patch({
        eventList: removeItem<EventModel>(e => e.id.toString() === id)
      })))
    );
  }

  @Action(LikeEvent)
  likeEvent({ setState }: StateContext<EventsStateModel>, { id, isDetailView }: LikeEvent) {
    return this.http.post(`${apiUrl}/events/like`, { id }).pipe(
      tap(res => {
        if (res === 'ok') {
          if (isDetailView) {
            setState(patch({
              currentEvent: addLike()
            }));
          } else {
            setState(patch({
              eventList: updateItem<EventModel>(e => e.id.toString() === id, addLike())
            }));
          }
        }
      }));
  }
}

