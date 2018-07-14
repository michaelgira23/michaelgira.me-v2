export const config: Config = {
	port: 2468,
	routes: {
		'/': 'home'
	},
	404: '404'
};

export interface Config {
	port: number;
	routes: { [url: string]: string };
	404?: string;
}
