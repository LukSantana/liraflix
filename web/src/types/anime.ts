export interface AnimeProps {
	aired: {
		from: Date;
		prop: {
			from: {
				day: number;
				month: number;
				year: number;
			};
			to: {
				day: number;
				month: number;
				year: number;
			};
		};
		string: string;
		to: string;
	};
	airing: boolean;
	approved: boolean;
	background: null;
	broadcast: {
		day: string;
		string: string;
		time: string;
		timezone: string;
	};
	demographics: Array<{
		mal_id: number;
		name: string;
		type: string;
		url: string;
	}>;
	duration: string;
	episodes: number;
	explicit_genres: Array<any>;
	favorites: number;
	genres: Array<{
		mal_id: number;
		type: string;
		name: string;
		url: string;
	}>;
	images: {
		jpg: {
			image_url: string;
			large_image_url: string;
			small_image_url: string;
		};
		webp: {
			image_url: string;
			large_image_url: string;
			small_image_url: string;
		};
	};
	licensors: Array<{
		mal_id: number;
		type: string;
		name: string;
		url: string;
	}>;
	mal_id: number;
	members: number;
	popularity: number;
	producers: Array<{
		mal_id: number;
		type: string;
		name: string;
		url: string;
	}>;
	rank: number;
	rating: string;
	score: number;
	scored_by: number;
	season: string;
	source: string;
	status: string;
	studios: Array<{
		mal_id: number;
		type: string;
		name: string;
		url: string;
	}>;
	synopsis: string;
	themes: Array<{
		mal_id: number;
		type: string;
		name: string;
		url: string;
	}>;
	title: string;
	title_english: string;
	title_japanese: string;
	title_synonyms: Array<string>;
	trailer: {
		youtube_id: string;
		url: string;
		embed_url: string;
		images: {
			image_url: string;
			large_image_url: string;
			maximum_image_url: string;
			medium_image_url: string;
			small_image_url: string;
		};
	};
  type: string;
  url: string;
  year: number;
}
