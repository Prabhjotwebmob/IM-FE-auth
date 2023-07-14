import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from '../../../IM-FE-libs/store/states/app.states';
import { SharedModule } from '../../../IM-FE-libs/shared-module';
import { WebApiService } from './web-api-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot(appReducer),
    StoreModule.forFeature('auth', appReducer),
  ],
  providers: [WebApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

