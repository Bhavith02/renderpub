// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	//interface Locals {}

	interface Platform {
		env: {
			
			MY_R2: R2Bucket;
			};
		context: {
			waitUntil(promise: Promise<any>): void;
			};
		caches: CacheStorage & { default: Cache }
	}

	// interface PrivateEnv {}

	// interface PublicEnv {}
}
