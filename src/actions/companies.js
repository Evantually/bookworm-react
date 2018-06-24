import { normalize } from 'normalizr';
import { COMPANIES_FETCHED, COMPANY_CREATED } from '../types';
import api from '../api';
import { companySchema } from '../schemas';

const companiesFetched = data => ({
	type: COMPANIES_FETCHED,
	data
});

const companyCreated = data => ({
	type: COMPANY_CREATED,
	data
});

export const fetchCompanies = () => dispatch =>
	api.companies.fetchAll().then(companies =>
		dispatch(companiesFetched(normalize(companies, [companySchema]))));

export const createCompany = data => dispatch => 
	api.companies
		.create(data)
		.then(company => dispatch(companyCreated(normalize(company, companySchema))));