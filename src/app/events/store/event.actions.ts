import Event from '../event.model';


export class AddEvent {
  static readonly type = '[Event] Add';
  constructor(public newEvent: Event) { }
}
