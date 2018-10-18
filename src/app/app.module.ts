import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { KatexModule } from 'ng-katex';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { FooterComponent } from './components/footer/footer.component';
import { ClipboardModule} from 'ngx-clipboard';
import { HttpClientModule } from '@angular/common/http';
import { GetApiService } from './services/get-api.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KatexModule,
    FormsModule,
    ClipboardModule,
    HttpClientModule
  ],
  providers: [GetApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));

