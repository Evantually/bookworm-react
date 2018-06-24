import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Grid } from 'semantic-ui-react';
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
			console.log(this.state);
			this.props.submit(this.state.data)
				.catch(err => this.setState({ errors: err.response.data.errors, loading: false}));
		}
	};

	validate = data => {
		const errors = {};

		if (!data.name) errors.name = "Please enter a company name.";
		if (!data.industry) errors.industry = "Please enter a company industry.";
		if (!data.assignedAgent) errors.assignedAgent = "Please enter an agent.";
		if (!data.leadContact.name) errors.name = "Please enter a contact name.";
		if (!data.leadContact.title) errors.title = "Please enter a title for contact name.";
		if (!isEmail(data.leadContact.email)) errors.email = "Invalid email";
		if (!data.leadContact.phone) errors.phone = "Please enter a phone number.";
		if (!data.billingAddress.street) errors.street = "Please enter a street.";
		if (!data.billingAddress.city) errors.city = "Please enter a city.";
		if (!data.billingAddress.state) errors.state = "Please enter a state.";
		if (!data.billingAddress.zip) errors.zip = "Please enter a zip.";
		if (!data.shippingAddress.street) errors.street = "Please enter a street.";
		if (!data.shippingAddress.city) errors.city = "Please enter a city.";
		if (!data.shippingAddress.state) errors.state = "Please enter a state.";
		if (!data.shippingAddress.zip) errors.zip = "Please enter a zip.";

		return errors;
	};

	render() {
		const { data, errors, loading } = this.state;

		return (
			<Form onSubmit={this.onSubmit} loading={loading}>
				<Grid columns={3} stackable>
					<Grid.Row>
						<Grid.Column>
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
							<Form.Field error={!!errors.name}>
								<label htmlFor="name">Lead Contact Name</label>
								<input type="text" id="name" name="name" placeholder="John Doe" value={data.leadContact.name} onChange={this.onLeadContactChange} />
								{errors.name && <InlineError text={errors.name} />}
							</Form.Field>
							<Form.Field error={!!errors.title}>
								<label htmlFor="title">Lead Contact Title</label>
								<input type="text" id="title" name="title" placeholder="CEO" value={data.leadContact.title} onChange={this.onLeadContactChange} />
								{errors.title && <InlineError text={errors.title} />}
							</Form.Field>
							<Form.Field error={!!errors.email}>
								<label htmlFor="email">Lead Contact email</label>
								<input type="text" id="email" name="email" placeholder="johndoe@company.com" value={data.leadContact.email} onChange={this.onLeadContactChange} />
								{errors.email && <InlineError text={errors.email} />}
							</Form.Field>
							<Form.Field error={!!errors.phone}>
								<label htmlFor="phone">Phone</label>
								<input type="text" id="phone" name="phone" placeholder="555-555-5555" value={data.leadContact.phone} onChange={this.onLeadContactChange} />
								{errors.phone && <InlineError text={errors.phone} />}
							</Form.Field>
						</Grid.Column>
						<Grid.Column>
							<Form.Field error={!!errors.street}>
								<label htmlFor="street">Billing Address Street</label>
								<input type="text" id="street" name="street" placeholder="123 Madeup St" value={data.billingAddress.street} onChange={this.onBillingChange} />
								{errors.street && <InlineError text={errors.street} />}
							</Form.Field>
							<Form.Field error={!!errors.city}>
								<label htmlFor="city">Billing Address City</label>
								<input type="text" id="city" name="city" placeholder="City" value={data.billingAddress.city} onChange={this.onBillingChange} />
								{errors.city && <InlineError text={errors.city} />}
							</Form.Field>
							<Form.Field error={!!errors.state}>
								<label htmlFor="state">Billing Address State</label>
								<input type="text" id="state" name="state" placeholder="State" value={data.billingAddress.state} onChange={this.onBillingChange} />
								{errors.state && <InlineError text={errors.state} />}
							</Form.Field>
							<Form.Field error={!!errors.zip}>
								<label htmlFor="zip">Billing Address Zip</label>
								<input type="text" id="zip" name="zip" placeholder="55555" value={data.billingAddress.zip} onChange={this.onBillingChange} />
								{errors.zip && <InlineError text={errors.zip} />}
							</Form.Field>
						</Grid.Column>
						<Grid.Column>
							<Form.Field error={!!errors.street}>
								<label htmlFor="street">Shipping Address Street</label>
								<input type="text" id="street" name="street" placeholder="123 Madeup St" value={data.shippingAddress.street} onChange={this.onShippingChange} />
								{errors.street && <InlineError text={errors.street} />}
							</Form.Field>
							<Form.Field error={!!errors.city}>
								<label htmlFor="city">Shipping Address City</label>
								<input type="text" id="city" name="city" placeholder="City" value={data.shippingAddress.city} onChange={this.onShippingChange} />
								{errors.city && <InlineError text={errors.city} />}
							</Form.Field>
							<Form.Field error={!!errors.state}>
								<label htmlFor="state">Shipping Address State</label>
								<input type="text" id="state" name="state" placeholder="State" value={data.shippingAddress.state} onChange={this.onShippingChange} />
								{errors.state && <InlineError text={errors.state} />}
							</Form.Field>
							<Form.Field error={!!errors.zip}>
								<label htmlFor="zip">Shipping Address Zip</label>
								<input type="text" id="zip" name="zip" placeholder="55555" value={data.shippingAddress.zip} onChange={this.onShippingChange} />
								{errors.zip && <InlineError text={errors.zip} />}
							</Form.Field>
							<Button primary>Add Company</Button>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<pre style={{ textAlign: 'left', padding: '1em', border: '1px solid' }}>
		          {JSON.stringify(this.state, null, 2)}
		        </pre>
			</Form>
		);
	}
}

CompanyForm.propTypes = {
	submit: PropTypes.func.isRequired
};

export default CompanyForm;