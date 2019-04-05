import { Component, Input } from '@angular/core';
import EventModel from '../event.model';

@Component({
  selector: 'app-event-preview',
  templateUrl: './event-preview.component.html',
  styleUrls: ['./event-preview.component.scss']
})
export class EventPreviewComponent {
  @Input() eventData: EventModel;
}
