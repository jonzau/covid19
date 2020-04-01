import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SummaryCardComponent } from './summary-card/summary-card.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
	declarations: [
		AppComponent,
		SummaryCardComponent,
		ToolbarComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		MatToolbarModule,
		MatCardModule
	],
	providers: [CookieService],
	bootstrap: [AppComponent]
})
export class AppModule { }
