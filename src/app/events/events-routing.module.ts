import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventComponent } from './components/event/event.component';
import { EventCreateComponent } from './components/event-create/event-create.component';
import { EventsPageComponent } from './components/events-page/events-page.component';

const eventsRoutes: Routes = [
  { path: '', component: EventsPageComponent },
  { path: 'create', component: EventCreateComponent },
  { path: ':id', component: EventComponent },
];

@NgModule({
  imports: [RouterModule.forChild(eventsRoutes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
