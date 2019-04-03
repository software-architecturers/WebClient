import Event from '../event.model';
import { State, Action, StateContext } from '@ngxs/store';
import { AddEvent } from './event.actions';
import { append, patch } from '@ngxs/store/operators';


export interface EventStateModel {
  events: Event[];
}


@State<EventStateModel>({
  name: 'events',
  defaults: {
    events: []
  }
})
export class EventState {

  @Action(AddEvent)
  add({ setState }: StateContext<EventStateModel>, { newEvent }: AddEvent) {
    setState(patch({
      events: append([newEvent])
    }));
  }
}
