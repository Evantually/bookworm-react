import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';
import { allBooksSelector } from '../../reducers/books';
import AddBookCtA from '../ctas/AddBookCtA';
import { fetchBooks } from '../../actions/books';
import StatisticBox from '../../components/reports/StatisticBox';

class DashboardPage extends React.Component {

	componentDidMount = () => this.onInit(this.props);

	onInit = props => props.fetchBooks();

	render() {
		const { isConfirmed, books } = this.props;
		return (
			<div>
				{!isConfirmed && <ConfirmEmailMessage />}

				{books.length === 0 ? 
					<AddBookCtA /> 
					: 
					<StatisticBox
						value={books.length}
						label='Bookshelf'
						tooltip='The number of books you have added to your bookshelf!'
					/>
				}
			</div>
		);
	}
}

DashboardPage.propTypes = {
	isConfirmed: PropTypes.bool.isRequired,
	fetchBooks: PropTypes.func.isRequired,
	books: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired
		}).isRequired
	).isRequired
};

function mapStateToProps(state) {
	return {
		isConfirmed: !!state.user.confirmed,
		books: allBooksSelector(state)
	};
}

export default connect(mapStateToProps, { fetchBooks })(DashboardPage);