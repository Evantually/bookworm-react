import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import CompanyForm from '../forms/CompanyForm';
import SearchCompanyForm from '../forms/SearchCompanyForm';
import { createCompany } from '../../actions/companies';

class NewCompanyPage extends React.Component {

	state = {
		company: null
	};

	submit = data => this.props.createCompany(data).then(() => this.props.history.push('/companies'));

	onCompanySelect = company => {
		this.setState({ company });
	};

	render() {
		return (
			<Segment>
				<h1>Add new company</h1>
				<SearchCompanyForm onCompanySelect={this.onCompanySelect} />

				{this.state.company && (
					<CompanyForm submit={this.addCompany} company={this.state.company} />
				)}
				<pre style={{ textAlign: 'left', padding: '1em', border: '1px solid' }}>
		          {JSON.stringify(this.state.company, null, 2)}
		        </pre>
			</Segment>
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