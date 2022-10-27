/* jshint esversion: 11 */

// Imports
import preprocess from 'svelte-preprocess';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Adapters
import cloudflareAdapter from '@sveltejs/adapter-cloudflare';

// Custom require function as replacement for the require from the commonJS in ES Module

// Custom __dirname as replacement for the __dirname from the commonJS in ES Module
const __dirname = dirname(fileURLToPath(import.meta.url)); // jshint ignore:line


/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
			postcss: true,
			preserve: ['ld+json', 'module'],
			typescript: true,
		}),
	],

	kit: {
		adapter: cloudflareAdapter(),
		prerender: {
			crawl: true,
			enabled: true,
			onError: 'fail',
			entries: ['*'],
		},
	},
};

export default config;
