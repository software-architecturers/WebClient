import EventModel from '../event.model';

export class GetEvents {
  static readonly type = '[Events] Get events';
  constructor() {}
}
export class GetEventById {
  static readonly type = '[Events] Get event';
  constructor(public id: string) {}
}
export class AddEvent {
  static readonly type = '[Events] Add event';
  constructor(public event: EventModel) {}
}
export class UpdateEvent {
  static readonly type = '[Events] Update event';
  constructor(public event: EventModel) {}
}
export class RemoveEvent {
  static readonly type = '[Events] Remove event';
  constructor(public id: string) {}
}
export class SearchEvent {
  static readonly type = '[Events] Search event';
  constructor(public search: string) {}
}
export class LikeEvent {
  static readonly type = '[Events] Like event';
  constructor(public id: string, public isDetailView: boolean) {}
}
