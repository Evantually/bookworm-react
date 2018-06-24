import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const AddCompanyCtA = () => (
	<Card centered>
		<Card.Content textAlign='center'>
			<Card.Header>Add new company</Card.Header>
			<Link to="/companies/new">
				<Icon name='plus circle' size ='massive' />
			</Link>
		</Card.Content>
	</Card>
);

export default AddCompanyCtA;