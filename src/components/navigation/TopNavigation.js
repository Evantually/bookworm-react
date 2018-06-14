import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Image, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions/auth';

const TopNavigation = ({ user, logout }) => (
	<Menu secondary pointing>
		<Menu.Item as={Link} to='/dashboard'>Dashboard</Menu.Item>
		<Menu.Menu position='right'>
			<Dropdown trigger={<Button>Trigger</Button>}>
				<Dropdown.Menu>
					<Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</Menu.Menu>
	</Menu>
);

TopNavigation.propTypes = {
	user: PropTypes.shape({
		email: PropTypes.string.isRequired
	}).isRequired,
	logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps, { logout: actions.logout })(TopNavigation);