import { writable } from 'svelte/store';

function noRowsPerPage() {	
	const { subscribe, set, update } = writable(0);

	let noRowsPerPage = []

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