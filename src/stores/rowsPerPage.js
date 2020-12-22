import { writable } from 'svelte/store';

function noRowsPerPage() {
	const { subscribe, set, update } = writable(0);

	return {
		subscribe,
		reset: (noRows) => set(noRows),
	};
}

export const rowsPerPage = noRowsPerPage()