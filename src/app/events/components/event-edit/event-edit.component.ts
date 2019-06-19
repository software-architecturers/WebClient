import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { UpdateEvent} from '../../store/events.actions';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent {
  eventId: string;

  eventEditForm = this.fb.group({
    images: '',
    title: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.eventId = route.snapshot.params.id;
  }

  onSubmit() {
    const event = this.eventEditForm.value;
    event.id = this.eventId;
    event.images = ['https://www.joomlack.fr/images/demos/demo2/on-top-of-earth.jpg'];
    this.store.dispatch(new UpdateEvent(event));
  }
}
