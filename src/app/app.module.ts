import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomePageComponent } from './home/home-page.component';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { EncodeURIPipe } from './encode-uri.pipe';
import { UserComponent } from './user/user.component';
import { AuthCallbackComponent } from './auth/auth-callback/auth-callback.component';
import { AuthState } from './auth/store/auth.store';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    EncodeURIPipe,
    UserComponent,
    AuthCallbackComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([AuthState], { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
