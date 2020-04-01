import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CountrySummary } from './models/models';

enum Cookies {
	DELIMITER = ';',
	FavoriteView = 'favoriteView',
	Favorites = 'favorites'
}

@Injectable({
	providedIn: 'root'
})
export class Covid19Service {

	private summary$: BehaviorSubject<CountrySummary[]> = new BehaviorSubject([]);

	private applyFilter$: EventEmitter<void> = new EventEmitter();

	private date: Date;

	private scheduler: any;

	constructor(private http: HttpClient, private cookieServoce: CookieService) {
	}

	getSummary(): Observable<CountrySummary[]> {
		if (!this.date) {
			this.http.get('https://api.covid19api.com/summary').toPromise().then((result: any) => {
				this.summary$.next(result.Countries);
				this.date = result.Date;
				this.applyFilter$.emit();  // need to emeit to triger first filtering
			});
		}

		return this.summary$;
	}

	getFilteredSummary(): Observable<CountrySummary[]> {
		return combineLatest([this.getSummary(), this.applyFilter$]).pipe(map(([list]) => {
			return this.isFavoriteView() ? list.filter(listToFilter => this.isFavorite(listToFilter.Slug)) : list;
		}));
	}

	isFavoriteView(): boolean {
		return !!this.cookieServoce.get(Cookies.FavoriteView);
	}

	setFavoriteView(isFavoriteView: boolean): void {
		if (isFavoriteView) {
			this.cookieServoce.set(Cookies.FavoriteView, 'true');
		} else {
			this.cookieServoce.delete(Cookies.FavoriteView);
		}
		this.applyFilter$.emit();
	}

	isFavorite(countrySlug: string): boolean {
		const favorites = this.cookieServoce.get(Cookies.Favorites).split(Cookies.DELIMITER);
		return favorites.indexOf(countrySlug) >= 0;
	}

	addRemoveFavorites(countrySlug: string, add: boolean): void {
		clearTimeout(this.scheduler);
		const favorites = this.cookieServoce.get(Cookies.Favorites).split(Cookies.DELIMITER);
		const index = favorites.indexOf(countrySlug);
		const inList = index >= 0;
		if (add && !inList) {
			favorites.push(countrySlug);
		} else if (!add && inList) {
			favorites.splice(index, 1);
		}

		let favoritesStr = '';
		favorites.forEach((country: string) => {
			if (country) {
				if (favoritesStr) {
					favoritesStr += Cookies.DELIMITER;
				}
				favoritesStr += country;
			}
		});

		this.cookieServoce.set('favorites', favoritesStr);

		if (this.isFavoriteView()) {
			this.scheduler = setTimeout(() => this.applyFilter$.emit(), 2500);
		}
	}
}
