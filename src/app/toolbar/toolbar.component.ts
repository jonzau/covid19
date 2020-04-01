import { Component, OnInit } from '@angular/core';

import { Covid19Service } from '../covid19.service';

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
}
