import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventComponent } from './event/event.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventsPageComponent } from './events-page.component';

const eventsRoutes: Routes = [
  { path: '', component: EventsPageComponent },
  { path: 'event', component: EventComponent },
  { path: 'new', component: EventCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(eventsRoutes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
