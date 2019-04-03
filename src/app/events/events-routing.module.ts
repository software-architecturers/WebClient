import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventComponent } from './event/event.component';
import { EventCreateComponent } from './event-create/event-create.component';

const eventsRoutes: Routes = [
  { path: 'events/event', component: EventComponent },
  { path: 'events/event-create', component: EventCreateComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(eventsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class EventsRoutingModule { }
