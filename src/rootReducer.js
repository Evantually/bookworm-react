import { combineReducers} from 'redux';
import user from './reducers/user';
import books from './reducers/books';
import companies from './reducers/companies';

export default combineReducers({
	user,
	books,
	companies
});