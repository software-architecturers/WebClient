import { NgModule } from '@angular/core';

import { EventsPageComponent } from './events-page.component';
import { EventPreviewComponent } from './event-preview/event-preview.component';
import { EventComponent } from './event/event.component';
import { EventCreateComponent } from './event-create/event-create.component';

import { EventsRoutingModule } from './events-routing.module';

@NgModule({
  imports: [
    EventsRoutingModule
  ],
  declarations: [
    EventsPageComponent,
    EventPreviewComponent,
    EventComponent,
    EventCreateComponent
  ]
})
export class EventsModule { }
