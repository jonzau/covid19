import { Component, Input, OnInit } from '@angular/core';

import { Covid19Service } from '../covid19.service';
import { CountrySummary } from '../models/models';

@Component({
	selector: 'app-summary-card',
	templateUrl: './summary-card.component.html',
	styleUrls: ['./summary-card.component.scss']
})
export class SummaryCardComponent implements OnInit {

	@Input() country: CountrySummary;

	constructor(private convid19Service: Covid19Service) {
	}

	ngOnInit(): void {

	}

	isFavorite(): boolean {
		return this.convid19Service.isFavorite(this.country.Slug);
	}

	onFavoriteClicked(): void {
		this.convid19Service.addRemoveFavorites(this.country.Slug, !this.isFavorite());
	}
}
