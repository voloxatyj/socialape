import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DefaultButton } from '../../util/DefaultButton'
import PostScream from '../scream/PostScream'
import { Notifications } from './Notifications'
// Material UI stuff
import { 
	AppBar,
	Toolbar,
	Button
 } from '@material-ui/core'
// Icons
import HomeWorkRoundedIcon from '@material-ui/icons/HomeWorkRounded'

export const Navbar = () => {

	const authenticated = useSelector(state => state.user.authenticated)
	
	return (
		<AppBar>
			<Toolbar className="nav-container">
			{	authenticated ? (
				<Fragment>
					<PostScream />
					<Link to="/">
						<DefaultButton title="Home">
							<HomeWorkRoundedIcon color="primary" />
						</DefaultButton>
					</Link>
					<Notifications />
				</Fragment>
			)	: (	
				<Fragment>
					<Button 
						color="inherit"
						component={ Link }
						to="/login"
					>	Login
					</Button>
					<Button
					 color="inherit"
					 component={ Link }
					 to="/"
					>	Home
					</Button>
					<Button
					 color="inherit"
					 component={ Link }
					 to="/signup"
					>	Signup
					</Button>
				</Fragment>
			)}
			</Toolbar>				
		</AppBar>
	)
}