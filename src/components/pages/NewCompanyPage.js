import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CompanyForm from '../forms/CompanyForm';
import { createCompany } from '../../actions/companies';

class NewCompanyPage extends React.Component {

	submit = data => this.props.createCompany(data).then(() => this.props.history.push('/companies'));



	render() {
		return (
			<div>
				<CompanyForm submit={this.submit} />
			</div>
		);
	}
}

NewCompanyPage.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	createCompany: PropTypes.func.isRequired
};

export default connect(null, { createCompany })(NewCompanyPage);