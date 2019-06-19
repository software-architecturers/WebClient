import {State, Action, StateContext} from '@ngxs/store';
import {patch, append, updateItem, removeItem} from '@ngxs/store/operators';
import Event from '../event.model';
import {GetEvents, AddEvent, UpdateEvent, RemoveEvent, LikeEvent, GetEventById, SearchEvent} from './events.actions';
import {HttpService} from '../services/http.service';
import {tap} from 'rxjs/operators';


export interface EventsStateModel {
  eventList: Event[];
  currentEvent: Event;
}

// TODO: actually add a like
const addLike = () => (event: Event) => ({...event});


@State<EventsStateModel>({
  name: 'events',
  defaults: {
    eventList: [],
    currentEvent: null
  }
})
export class EventsState {

  constructor(private httpService: HttpService) {
  }

  @Action(GetEvents)
  getEvents({setState}: StateContext<EventsStateModel>) {
    return this.httpService.getEvents()
      .pipe(
        tap(data => setState(patch({
          eventList: data.map(event => new Event({...event}))
        })))
      );
  }

  @Action(GetEventById)
  getEvent({patchState, getState}: StateContext<EventsStateModel>, {id}: GetEventById) {
    const events = getState().eventList;
    const event = events.find(v => v.id.toString() === id);
    if (event) {
      patchState({
        currentEvent: event
      });
      return;
    }
    return this.httpService.getEventById(id)
      .pipe(tap(data => {
        patchState({
          currentEvent: new Event({...data})
        });
      }));
  }

  @Action(AddEvent)
  addEvent({setState}: StateContext<EventsStateModel>, {event}: AddEvent) {
    return this.httpService.addEvent({...event})
      .pipe(
        tap(data => setState(patch({
          eventList: append([new Event({...data})])
        })))
      );
  }

  @Action(UpdateEvent)
  updateEvent({setState}: StateContext<EventsStateModel>, {event}: UpdateEvent) {
    return this.httpService.updateEvent(event.id, {...event})
      .pipe(
        tap(data => setState(patch({
          eventList: append([new Event({...data})])
        })))
      );
  }

  @Action(RemoveEvent)
  removeEvent({setState}: StateContext<EventsStateModel>, {id}: RemoveEvent) {
    return this.httpService.removeEvent(id)
      .pipe(
        tap(() => setState(patch({
          eventList: removeItem<Event>(e => e.id.toString() === id)
        })))
      );
  }

  @Action(SearchEvent)
  searchEvent({setState}: StateContext<EventsStateModel>, {search}: SearchEvent) {
    return this.httpService.searchEvent(search)
      .pipe(
        tap(data => setState(patch({
          eventList: data.map(event => new Event({...event}))
        })))
      );
  }

  @Action(LikeEvent)
  likeEvent({setState}: StateContext<EventsStateModel>, {id, isDetailView}: LikeEvent) {
    return this.httpService.likeEvent(id)
      .pipe(
        tap(res => {
          if (res === 'ok') {
            if (isDetailView) {
              setState(patch({
                currentEvent: addLike()
              }));
            } else {
              setState(patch({
                eventList: updateItem<Event>(e => e.id.toString() === id, addLike())
              }));
            }
          }
        })
      );
  }
}

