import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Dropdown } from 'semantic-ui-react';

class SearchCompanyForm extends React.Component {
	state = {
		query: '',
		loading: false,
		options: [],
		companies: {}
	};

	onSearchChange = (e, data) => {
		clearTimeout(this.timer);
		this.setState({
			query: data
		});
		this.timer = setTimeout(this.fetchOptions, 1000);
	};

	fetchOptions = () => {
		if (!this.state.query) return this.setState({ loading: false });
		this.setState({ loading: true });
		axios.get(`/api/companies/search?q=${this.state.query}`)
			.then(res => res.data.companies)
			.then(companies => {
				const options = [];
				const companiesHash = {};
				companies.forEach(company => {
					companiesHash[company._id] = company;
					options.push({
						key: company._id,
						value: company._id,
						text: company.name
					});
				});
				this.setState({ loading: false, options, companies: companiesHash });
			});
	};

	onChange = (e, data) => {
		this.setState({ query: data.value });
		this.props.onCompanySelect(this.state.companies[data.value]);
	};

	render() {
		return (
			<Form>
				<Dropdown
					search
					fluid
					placeholder='Search for a company by name'
					value={this.state.query}
					onSearchChange={this.onSearchChange}
					options={this.state.options}
					loading={this.state.loading}
					onChange={this.onChange}
				/>
			</Form>
		);
	}
}

SearchCompanyForm.propTypes = {
	onCompanySelect: PropTypes.func.isRequired
};

export default SearchCompanyForm;