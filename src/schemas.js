import { schema } from 'normalizr';

export const bookSchema = new schema.Entity(
	'books', {}, { idAttribute: '_id' }
);

export const companySchema = new schema.Entity(
	'companies', {}, { idAttribute: '_id' }
);