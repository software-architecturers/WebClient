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
      },
      {
        id: '5',
        title: 'event5',
        description: 'description5',
        image: 'https://www.joomlack.fr/images/demos/demo2/on-top-of-earth.jpg'
      },
      {
        id: '6',
        title: 'event6',
        description: 'description6',
        image: 'https://www.joomlack.fr/images/demos/demo2/on-top-of-earth.jpg'
      },
      {
        id: '7',
        title: 'event7',
        description: 'description7',
        image: 'https://www.joomlack.fr/images/demos/demo2/on-top-of-earth.jpg'
      },
      {
        id: '8',
        title: 'event8',
        description: 'description8',
        image: 'https://www.joomlack.fr/images/demos/demo2/on-top-of-earth.jpg'
      },
      {
        id: '9',
        title: 'event9',
        description: 'description9',
        image: 'https://www.joomlack.fr/images/demos/demo2/on-top-of-earth.jpg'
      },
      {
        id: '10',
        title: 'event10',
        description: 'description10',
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
