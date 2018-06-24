import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { allCompaniesSelector } from '../../reducers/companies';
import AddCompanyCtA from '../ctas/AddCompanyCtA';
import { fetchCompanies } from '../../actions/companies';

class CompaniesPage extends React.Component {

	componentDidMount = () => this.onInit(this.props);

	onInit = props => props.fetchCompanies();

	render() {
		const { companies } = this.props;
		return (
			<div>

				{companies.length === 0 ? 
					<AddCompanyCtA /> 
					: 
					<p></p>
				}
			</div>
		);
	}
}

CompaniesPage.propTypes = {
	isConfirmed: PropTypes.bool.isRequired,
	fetchCompanies: PropTypes.func.isRequired,
	companies: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,

		}).isRequired
	).isRequired
};

function mapStateToProps(state) {
	return {
		companies: allCompaniesSelector(state)
	};
}

export default connect(mapStateToProps, { fetchCompanies })(CompaniesPage);