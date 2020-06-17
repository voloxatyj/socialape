import React, { useState, useEffect, Fragment } from 'react'
import { DefaultButton } from '../../util/DefaultButton'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { editUserDetails } from '../../redux/actions/userActions'
// Material UI stuff
import {
	withStyles,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField
	} from '@material-ui/core'
	// Icons
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone'


const styles = theme => ({ 
	...theme.text,
	button: {
		float: 'right'
	}})

const EditDetails = props => {
	
	const [bio, setBio] = useState('')
	const [website, setWebsite] = useState('')
	const [location, setLocation] = useState('')
	const [open, setOpen] = useState(false)
	const { classes } = props
	const credentials = useSelector(state => state.user.credentials) 
	const dispatch = useDispatch()

	useEffect(() => {
		// eslint-disable-next-line no-unused-expressions
		credentials.bio ? setBio(credentials.bio) : ''
		// eslint-disable-next-line no-unused-expressions
		credentials.website ? setWebsite(credentials.website) : ''
		// eslint-disable-next-line no-unused-expressions
		credentials.location ? setLocation(credentials.location) : ''		
	}, [credentials])

	return (
		<Fragment>
			<DefaultButton 
				placement="top"
				title="Edit Details"
				onClick={() => setOpen(true)}
				btnClassName={classes.button}
			>
				<EditTwoToneIcon color="primary" fontSize="default" />
			</DefaultButton>
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				fullWidth
				maxWidth="sm"
			>
			<DialogTitle>Edit your details</DialogTitle>
				<DialogContent>
					<form>
						<TextField
							name="bio"
							type="text"
							label="bio"
							value={bio}
							placeholder="Some information about yourself"
							multiline
							rows="3"
							className={classes.textField}
							onChange={(e) => setBio(e.target.value)}
							fullWidth
						/>
						<TextField
							name="website"
							type="text"
							label="website"
							value={website}
							placeholder="Your personal website page"
							multiline
							rows="3"
							className={classes.textField}
							onChange={(e) => setWebsite(e.target.value)}
							fullWidth
						/>
						<TextField
							name="location"
							type="text"
							label="location"
							value={location}
							placeholder="Where your live"
							multiline
							rows="3"
							className={classes.textField}
							onChange={(e) => setLocation(e.target.value)}
							fullWidth
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
					<Button onClick={(e) => {
						e.preventDefault()
						const userDetails = {
							bio,
							website,
							location
						}
						dispatch(editUserDetails(userDetails))
						setOpen(false)
					}} color="primary">Save</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	)
}

export default withStyles(styles)(EditDetails)
