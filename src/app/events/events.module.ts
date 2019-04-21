import { NgModule } from '@angular/core';

import { EventsPageComponent } from './events-page.component';
import { EventPreviewComponent } from './event-preview/event-preview.component';
import { EventComponent } from './event/event.component';
import { EventCreateComponent } from './event-create/event-create.component';

import { EventsRoutingModule } from './events-routing.module';
import { NgxsModule } from '@ngxs/store';
import { EventsState } from './store/events.state';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { HttpService } from './services/http.service';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([EventsState]),
    EventsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    HttpService
  ],
  declarations: [
    EventsPageComponent,
    EventPreviewComponent,
    EventComponent,
    EventCreateComponent
  ]
})
export class EventsModule { }
