import { Component, OnInit } from '@angular/core';

import { Covid19Service } from './covid19.service';
import { CountrySummary } from './models/models';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'covid19';
	topBanner = '';
	list: CountrySummary[];

	constructor(private convid19Service: Covid19Service) {
	}

	ngOnInit(): void {
		this.convid19Service.getFilteredSummary().subscribe(list => this.list = list);
		this.convid19Service.getErrorMessage().subscribe(errorMsg => this.topBanner = errorMsg);
	}
}
