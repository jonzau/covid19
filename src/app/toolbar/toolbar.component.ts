import { Component, OnInit } from '@angular/core';

import { Covid19Service } from '../covid19.service';
import { Sorting } from '../models/models';

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

	constructor(private convid19Service: Covid19Service) {
	}

	ngOnInit(): void {
	}

	isFavoriteView(): boolean {
		return this.convid19Service.isFavoriteView();
	}

	onFavoriteClicked(): void {
		this.convid19Service.setFavoriteView(!this.isFavoriteView());
	}

	getSortingSettings(): Sorting.Settings {
		return this.convid19Service.getSortingSettings();
	}

	getSortingOptions(): Sorting.Options[] {
		return Object.keys(Sorting.Options).map(key => Sorting.Options[key]);
	}

	isDescending(): boolean {
		return this.getSortingSettings().direction === Sorting.Direction.DESC;
	}

	onSortingChange(sortingOption: Sorting.Options, sortingDirection: Sorting.Direction): void {
		this.convid19Service.setSortingSettings({
			option: sortingOption as Sorting.Options,
			direction: sortingDirection
		});
	}

	onSortingOptionChange(sortingOption: Sorting.Options): void {
		this.onSortingChange(sortingOption, this.getSortingSettings().direction);
	}

	onDirectionChange(): void {
		const direction = this.getSortingSettings().direction === Sorting.Direction.ASC ?
			Sorting.Direction.DESC : Sorting.Direction.ASC;
		this.onSortingChange(this.getSortingSettings().option, direction);
	}
}
