import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';
import InlineError from '../messages/InlineError';

class CompanyForm extends React.Component {
	state = {
		data: {
			name: '',
			industry: '',
			assignedAgent: '',
			leadContact: {
				name: '',
				title: '',
				email: '',
				phone: '',
				notes: []
			},
			employees: [],
			billingAddress: {
				street: '',
				city: '',
				state: '',
				zip: ''
			},
			shippingAddress: {
				street: '',
				city: '',
				state: '',
				zip: ''
			},
			notes: [],
			tasks: []
		},
		loading: false,
		errors: {}
	};

	onChange = e =>
		this.setState({
			...this.state,
			data: { ...this.state.data, [e.target.name]: e.target.value }
		});

	onLeadContactChange = e => {
		console.log('The lead contact name is ', this.state.data.leadContact);
		this.setState({
			...this.state,
				data: { 
				...this.state.data,
				leadContact: {
					...this.state.data.leadContact,
					[e.target.name]: e.target.value
				}
			}
		});
	}

	onBillingChange = e => {
		console.log('The billingAddress is ', this.state.data.billingAddress);
		this.setState({
			...this.state,
				data: { 
				...this.state.data,
				billingAddress: {
					...this.state.data.billingAddress,
					[e.target.name]: e.target.value
				}
			}
		});
	}

	onShippingChange = e => {
		console.log('The shippingAddress is ', this.state.data.shippingAddress);
		this.setState({
			...this.state,
				data: { 
				...this.state.data,
				shippingAddress: {
					...this.state.data.shippingAddress,
					[e.target.name]: e.target.value
				}
			}
		});
	}

	onSubmit = e => {
		e.preventDefault();
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props.submit(this.state.data)
				.catch(err => this.setState({ errors: err.response.data.errors, loading: false}));
		}
	};

	validate = data => {
		const errors = {};

		if (!isEmail(data.leadContact.email)) errors.leadContactemail = "Invalid email";
		if (!data.leadContact.name) errors.leadContactname = "Please enter a contact name.";
		if (!data.leadContact.title) errors.leadContacttitle = "Please enter a title for contact name.";
		if (!data.leadContact.phone) errors.leadContactphone = "Please enter a phone number.";
		if (!data.billingAddress.street) errors.billingAddressstreet = "Please enter a street.";
		if (!data.billingAddress.city) errors.billingAddresscity = "Please enter a city.";
		if (!data.billingAddress.state) errors.billingAddressstate = "Please enter a state.";
		if (!data.billingAddress.zip) errors.billingAddresszip = "Please enter a zip.";
		if (!data.shippingAddress.street) errors.shippingAddressstreet = "Please enter a street.";
		if (!data.shippingAddress.city) errors.shippingAddresscity = "Please enter a city.";
		if (!data.shippingAddress.state) errors.shippingAddressstate = "Please enter a state.";
		if (!data.shippingAddress.zip) errors.shippingAddresszip = "Please enter a zip.";
		if (!data.name) errors.name = "Please enter a company name.";
		if (!data.industry) errors.industry = "Please enter a company industry.";
		if (!data.assignedAgent) errors.assignedAgent = "Please enter an agent.";

		return errors;
	};

	render() {
		const { data, errors, loading } = this.state;

		return (
			<Form onSubmit={this.onSubmit} loading={loading}>
				<Form.Field error={!!errors.name}>
					<label htmlFor="name">Name</label>
					<input type="text" id="name" name="name" placeholder="Company Name" value={data.name} onChange={this.onChange} />
					{errors.name && <InlineError text={errors.name} />}
				</Form.Field>
				<Form.Field error={!!errors.industry}>
					<label htmlFor="industry">Industry</label>
					<input type="text" id="industry" name="industry" placeholder="Industry" value={data.industry} onChange={this.onChange} />
					{errors.industry && <InlineError text={errors.industry} />}
				</Form.Field>
				<Form.Field error={!!errors.assignedAgent}>
					<label htmlFor="assignedAgent">Agent</label>
					<input type="text" id="assignedAgent" name="assignedAgent" placeholder="Agent" value={data.assignedAgent} onChange={this.onChange} />
					{errors.assignedAgent && <InlineError text={errors.assignedAgent} />}
				</Form.Field>
				<Form.Field error={!!errors.leadContactname}>
					<label htmlFor="name">Lead Contact name</label>
					<input type="text" id="name" name="name" placeholder="John Doe" value={data.leadContact.name} onChange={this.onLeadContactChange} />
					{errors.leadContactname && <InlineError text={errors.leadContactname} />}
				</Form.Field>
				<Form.Field error={!!errors.leadContactemail}>
					<label htmlFor="email">Lead Contact email</label>
					<input type="text" id="email" name="email" placeholder="johndoe@company.com" value={data.leadContact.email} onChange={this.onLeadContactChange} />
					{errors.leadContactemail && <InlineError text={errors.leadContactemail} />}
				</Form.Field>
				<Form.Field error={!!errors.leadContactphone}>
					<label htmlFor="phone">Phone</label>
					<input type="text" id="phone" name="phone" placeholder="555-555-5555" value={data.leadContact.phone} onChange={this.onLeadContactChange} />
					{errors.leadContactphone && <InlineError text={errors.leadContactphone} />}
				</Form.Field>
				<Form.Field error={!!errors.billingAddressstreet}>
					<label htmlFor="street">Billing Address Street</label>
					<input type="text" id="street" name="street" placeholder="123 Madeup St" value={data.billingAddress.street} onChange={this.onBillingChange} />
					{errors.billingAddressstreet && <InlineError text={errors.billingAddressstreet} />}
				</Form.Field>
				<Form.Field error={!!errors.billingAddresscity}>
					<label htmlFor="city">Billing Address City</label>
					<input type="text" id="city" name="city" placeholder="City" value={data.billingAddress.city} onChange={this.onBillingChange} />
					{errors.billingAddresscity && <InlineError text={errors.billingAddresscity} />}
				</Form.Field>
				<Form.Field error={!!errors.billingAddressstate}>
					<label htmlFor="state">Billing Address State</label>
					<input type="text" id="state" name="state" placeholder="State" value={data.billingAddress.state} onChange={this.onBillingChange} />
					{errors.billingAddressstate && <InlineError text={errors.billingAddressstate} />}
				</Form.Field>
				<Form.Field error={!!errors.billingAddresszip}>
					<label htmlFor="zip">Billing Address Zip</label>
					<input type="text" id="zip" name="zip" placeholder="55555" value={data.billingAddress.zip} onChange={this.onBillingChange} />
					{errors.billingAddresszip && <InlineError text={errors.billingAddresszip} />}
				</Form.Field>
				<Form.Field error={!!errors.shippingAddressstreet}>
					<label htmlFor="street">Shipping Address Street</label>
					<input type="text" id="street" name="street" placeholder="123 Madeup St" value={data.shippingAddress.street} onChange={this.onShippingChange} />
					{errors.shippingAddressstreet && <InlineError text={errors.shippingAddressstreet} />}
				</Form.Field>
				<Form.Field error={!!errors.shippingAddresscity}>
					<label htmlFor="city">Shipping Address City</label>
					<input type="text" id="city" name="city" placeholder="City" value={data.shippingAddress.city} onChange={this.onShippingChange} />
					{errors.shippingAddresscity && <InlineError text={errors.shippingAddresscity} />}
				</Form.Field>
				<Form.Field error={!!errors.shippingAddressstate}>
					<label htmlFor="state">Shipping Address State</label>
					<input type="text" id="state" name="state" placeholder="State" value={data.shippingAddress.state} onChange={this.onShippingChange} />
					{errors.shippingAddressstate && <InlineError text={errors.shippingAddressstate} />}
				</Form.Field>
				<Form.Field error={!!errors.shippingAddresszip}>
					<label htmlFor="zip">Shipping Address Zip</label>
					<input type="text" id="zip" name="zip" placeholder="55555" value={data.shippingAddress.zip} onChange={this.onShippingChange} />
					{errors.shippingAddresszip && <InlineError text={errors.shippingAddresszip} />}
				</Form.Field>
				<Button primary>Add Company</Button>
			</Form>
		);
	}
}

CompanyForm.propTypes = {
	submit: PropTypes.func.isRequired
};

export default CompanyForm;