import { createSelector } from 'reselect';
import { COMPANIES_FETCHED, COMPANY_CREATED } from '../types';

export default function companies(state = {}, action = {}) {
	switch(action.type) {
		case COMPANIES_FETCHED:
		case COMPANY_CREATED:
			return { ...state, ...action.data.entities.companies };
		default:
			return state;
	}
}

// SELECTORS

export const companiesSelector = state => state.companies;

export const allCompaniesSelector = createSelector(
	companiesSelector,
	companiesHash => Object.values(companiesHash)
);