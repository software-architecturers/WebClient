// import Event from '../event.model';
// import { State, Action, StateContext } from '@ngxs/store';
// import { AddEvent } from './event.actions';
// import { append, patch } from '@ngxs/store/operators';
//
//
// export interface EventStateModel {
//   events: Event[];
// }
//
//
// @State<EventStateModel>({
//   name: 'events',
//   defaults: {
//     events: []
//   }
// })
// export class EventState {
//
//   @Action(AddEvent)
//   add({ setState }: StateContext<EventStateModel>, { newEvent }: AddEvent) {
//     setState(patch({
//       events: append([newEvent])
//     }));
//   }
// }


import { State, Action, StateContext } from '@ngxs/store';
import EventModel from '../event.model';
import {AddEvent, RemoveEvent} from './events.actions';

export interface EventsStateModel {
  eventList: Array<EventModel>;
}

@State<EventsStateModel>({
  name: 'events',
  defaults: {
    eventList: [{
        id: '1',
        title: 'event1',
        description: 'description1',
        image: 'https://www.joomlack.fr/images/demos/demo2/on-top-of-earth.jpg'
      },
      {
        id: '2',
        title: 'event2',
        description: 'description2',
        image: 'https://www.joomlack.fr/images/demos/demo2/on-top-of-earth.jpg'
      },
      {
        id: '3',
        title: 'event3',
        description: 'description3',
        image: 'https://www.joomlack.fr/images/demos/demo2/on-top-of-earth.jpg'
      },
      {
        id: '4',
        title: 'event4',
        description: 'description4',
        image: 'https://www.joomlack.fr/images/demos/demo2/on-top-of-earth.jpg'
      }
    ]
  }
})

export class EventsState {
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
