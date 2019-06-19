import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventComponent } from './components/event/event.component';
import { EventCreateComponent } from './components/event-create/event-create.component';
import { EventsPageComponent } from './components/events-page/events-page.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';


const eventsRoutes: Routes = [
  { path: '', component: EventsPageComponent },
  { path: 'create', component: EventCreateComponent },
  { path: ':id', component: EventComponent },
  { path: 'edit/:id', component: EventEditComponent },

];

@NgModule({
  imports: [RouterModule.forChild(eventsRoutes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
