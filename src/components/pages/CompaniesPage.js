import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { allCompaniesSelector } from '../../reducers/companies';
import { fetchCompanies } from '../../actions/companies';

class CompaniesPage extends React.Component {

	componentDidMount = () => this.onInit(this.props);

	onInit = props => props.fetchCompanies();

	render() {
		const { companies } = this.props;
		var arr = [];
		Object.keys(companies).forEach(function(key) {
			arr.push(companies[key]);
		});
		return (
			<div>
				
			</div>
		);
	}
}

CompaniesPage.propTypes = {
	fetchCompanies: PropTypes.func.isRequired,
	companies: PropTypes.arrayOf(
		PropTypes.shape({
			leadContact: PropTypes.shape({
				name: PropTypes.string.isRequired,
				title: PropTypes.string.isRequired,
				email: PropTypes.string.isRequired,
				phone: PropTypes.string.isRequired,
				notes: PropTypes.arrayOf(
					PropTypes.string
				)
			}).isRequired,
			billingAddress: PropTypes.shape({
				street: PropTypes.string.isRequired,
				city: PropTypes.string.isRequired,
				state: PropTypes.string.isRequired,
				zip: PropTypes.string.isRequired
			}).isRequired,
			shippingAddress: PropTypes.shape({
				street: PropTypes.string.isRequired,
				city: PropTypes.string.isRequired,
				state: PropTypes.string.isRequired,
				zip: PropTypes.string.isRequired
			}).isRequired,
			name: PropTypes.string.isRequired,
			industry: PropTypes.string.isRequired,
			assignedAgent: PropTypes.string.isRequired,
			userId: PropTypes.objectId
		})
	).isRequired
};

function mapStateToProps(state) {
	return {
		companies: allCompaniesSelector(state)
	};
}

export default connect(mapStateToProps, { fetchCompanies })(CompaniesPage);