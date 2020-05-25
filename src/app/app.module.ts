import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BoardComponent} from './board/board.component';
import {PeiceComponent} from './peice/peice.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    PeiceComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
