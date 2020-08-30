import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CountrySummary, Sorting } from './models/models';

enum Cookies {
	DELIMITER = ';',
	FavoriteView = 'favoriteView',
	Favorites = 'favorites',
	Sorting = 'sorting'
}

@Injectable({
	providedIn: 'root'
})
export class Covid19Service {

	private summary$: BehaviorSubject<CountrySummary[]> = new BehaviorSubject([]);

	private applyFilter$: EventEmitter<void> = new EventEmitter();

	private filterText: string;

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

	getCountryNames(): Observable<string[]> {
		return this.getSummary().pipe(map(list => list.map(a => a.Country)));
	}

	getFilteredSummary(): Observable<CountrySummary[]> {
		return combineLatest([this.getSummary(), this.applyFilter$]).pipe(map(([list]) => {
			let sortingFunction: any;
			switch (this.getSortingSettings().option) {
				case Sorting.Options.TotalConfirmed:
					sortingFunction = (a: CountrySummary, b: CountrySummary) => a.TotalConfirmed - b.TotalConfirmed;
					break;
				case Sorting.Options.TotalDeaths:
					sortingFunction = (a: CountrySummary, b: CountrySummary) => a.TotalDeaths - b.TotalDeaths;
					break;
				case Sorting.Options.TotalRecovered:
					sortingFunction = (a: CountrySummary, b: CountrySummary) => a.TotalRecovered - b.TotalRecovered;
					break;
			}

			const clonedList = [];
			list.forEach(a => {
				const filterValue = this.filterText ? this.filterText.toLowerCase() : null;
				if (!filterValue || a.Country.toLowerCase().indexOf(filterValue) >= 0) {
					clonedList.push(a);
				}
			});
			const filteredList = this.isFavoriteView() ? clonedList.filter(listToFilter => this.isFavorite(listToFilter.Slug)) : clonedList;
			const sortedList = filteredList.sort(sortingFunction);
			return (this.getSortingSettings().direction === Sorting.Direction.ASC) ? sortedList : sortedList.reverse();
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

	setFilterText(filterText: string): void {
		this.filterText = filterText;
		this.applyFilter$.emit();
	}

	getSortingSettings(): Sorting.Settings {
		const sorting = this.cookieServoce.get(Cookies.Sorting).split(Cookies.DELIMITER);
		return {
			option: (sorting[0] || Sorting.Options.Alphabetical) as Sorting.Options,
			direction: (sorting.length > 1 ? sorting[1] : Sorting.Direction.ASC) as Sorting.Direction
		};
	}

	setSortingSettings(sortingSettings: Sorting.Settings): void {
		const sorting = sortingSettings.option + Cookies.DELIMITER + sortingSettings.direction;
		this.cookieServoce.set(Cookies.Sorting, sorting);
		this.applyFilter$.emit();
	}
}
