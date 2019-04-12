import EventModel from '../event.model';

export class AddEvent {
  static readonly type = '[Events] Add event';
  constructor(public event: EventModel) {}
}
export class RemoveEvent {
  static readonly type = '[Events] Remove event';
  constructor(public id: string) {}
}
