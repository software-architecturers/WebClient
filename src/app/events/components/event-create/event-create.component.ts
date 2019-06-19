import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddEvent } from '../../store/events.actions';


@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent {
  eventCreateForm = this.fb.group({
    image: '',
    title: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {}

  onSubmit() {
    const event = this.eventCreateForm.value;
    event.images = ['https://www.joomlack.fr/images/demos/demo2/on-top-of-earth.jpg'];
    this.store.dispatch(new AddEvent(event));
  }
}
