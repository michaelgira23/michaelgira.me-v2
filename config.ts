export const config: Config = {
	port: 2468,
	routes: {
		'/': 'home'
	},
	redirect404: '/'
};

export interface Config {
	port: number;
	routes: { [url: string]: string };
	404?: string;
	redirect404?: string;
}
