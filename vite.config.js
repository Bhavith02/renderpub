import { sveltekit } from '@sveltejs/kit/vite';
import { resolve, dirname } from 'path';

// @type {import('vite').UserConfig} 
const config = {
	resolve: {
				alias: {
					$stores: resolve(__dirname, './src/stores'),
					$components: resolve(__dirname, './src/lib/shared/components'),
					$ui: resolve(__dirname, './src/lib/shared/ui'),
					$layouts: resolve(__dirname, './src/lib/layouts'),
					$shared: resolve(__dirname, './src/lib/shared'),
					$models: resolve(__dirname, './src/lib/models'),
					$data: resolve(__dirname, './src/lib/data'),
					$core: resolve(__dirname, './src/lib/core'),
					$utils: resolve(__dirname, './src/lib/utils'),
					$environment: resolve(__dirname, './src/environments'),
				},
			},
	envPrefix: ['VITE_', 'SVELTEKIT_STARTER_'],
	plugins: [sveltekit()],
};

export default config;
