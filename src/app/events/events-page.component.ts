import { Component, OnInit } from '@angular/core';
import EventModel from './event.model';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit {
  events: Array<EventModel> = [
    {
      id: '1',
      title: 'event1',
      description: 'description1',
      image: 'image1'
    },
    {
      id: '2',
      title: 'event2',
      description: 'description2',
      image: 'image2'
    }
  ];
  ngOnInit() {
    console.log(this.events);
  }
}
