import { Record } from 'immutable';

const EventRecord = Record({
  id: '',
  title: '',
  description: '',
  images: ['']
});

export default class Event extends EventRecord {
  id: string;
  title: string;
  description: string;
  images: string[];
  constructor(props) {
    super(props);
  }
}
