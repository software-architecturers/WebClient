import {Component, Input, OnInit} from '@angular/core';
import EventModel from '../event.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  eventId: string;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.eventId = route.snapshot.params.id;
  }

  ngOnInit(): void {}
}
