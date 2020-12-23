import { writable } from 'svelte/store';

function noRowsPerPage() {
	let noRowsPerPage = [10, 20, 40]
	const { subscribe, set, update } = writable(0);

	return {
		subscribe,
		rowPerPageOptions: () => {
			return [
				{ rpp: noRowsPerPage } ,
				{ rpp: noRowsPerPage*2 },
				{ rpp: noRowsPerPage*3 }
			]
		},
		reset: (noRows) => {
			noRowsPerPage = noRows
			set(noRows)
		},
	}
}

export const rowsPerPage = noRowsPerPage()