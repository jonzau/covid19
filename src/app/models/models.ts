export class CountrySummary {
	Country: string;
	Slug: string;
	NewConfirmed: number;
	TotalConfirmed: number;
	NewDeaths: number;
	TotalDeaths: number;
	NewRecovered: number;
	TotalRecovered: number;
}

// tslint:disable-next-line:no-namespace
export namespace Sorting {
	export enum Direction {
		ASC = 'asc',
		DESC = 'desc'
	}

	export enum Options {
		Alphabetical = 'Alphabetical',
		TotalConfirmed = 'Total Confirmed',
		TotalDeaths = 'Total Deths',
		TotalRecovered = 'Total Recovered'
	}

	export class Settings {
		option: Options;
		direction: Direction;
	}
}
