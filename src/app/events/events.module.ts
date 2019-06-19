import { NgModule } from '@angular/core';

import { EventsPageComponent } from './components/events-page/events-page.component';
import { EventPreviewComponent } from './components/event-preview/event-preview.component';
import { EventComponent } from './components/event/event.component';
import { EventCreateComponent } from './components/event-create/event-create.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';

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
    EventCreateComponent,
    EventEditComponent
  ]
})
export class EventsModule { }
