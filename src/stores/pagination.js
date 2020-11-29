import { writable } from 'svelte/store';

function createFirsRowToDisplay() {
	const { subscribe, set, update } = writable(0);

	return {
		subscribe,
		forward: (rowsPerPage) => update(n => n + rowsPerPage),
		backward: (rowsPerPage) => update(n => n - rowsPerPage),
		reset: (rowNo) => set(rowNo),
	};
}

export const firstRowToDisplay = createFirsRowToDisplay();