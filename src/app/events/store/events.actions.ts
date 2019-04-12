import Event from '../event.model';

export class AddEvent {
  static readonly type = '[Events] Add event';
  constructor(public event: object) {}
}
