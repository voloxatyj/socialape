import React, { Fragment } from 'react'
import dayjs from 'dayjs';
import { Link } from 'react-router-dom'
import EditDetails from './EditDetails'
import { DefaultButton } from '../../util/DefaultButton'
import ProfileSkeleton from '../../util/ProfileSkeleton'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { uploadImage, logoutUser } from '../../redux/actions/userActions'
// Material UI stuff
import MuiLink from '@material-ui/core/Link'
import { 
	withStyles,
	Paper,
	Button,
	Typography
	} from '@material-ui/core'
// Icons
import LocationOn from '@material-ui/icons/LocationOn'
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'

const styles = theme => ({ ...theme.text })

const Profile = props => {
	const { classes } = props
	const user = useSelector(state => state.user) 
	const dispatch = useDispatch()

	const handleImageChange = event => {
		const image = event.target.files[0]
		const formData = new FormData()
		formData.append('image', image, image.name)
		dispatch(uploadImage(formData))
	}

	const handleEditImage = () => {
		const fileInput = document.getElementById('imageInput')
		fileInput.click()
	}

	let profileMarkup = !user.loading ? (user.authenticated ? (
			<Paper className={classes.paper}>
				<div className={classes.profile}>
					<div className="image-wrapper">
						<img src={user.credentials.imageUrl} alt="profile" className={classes.image}/>
							<input 
								type="file"
								id="imageInput"
								hidden="hidden"
								onChange={(event) => handleImageChange(event)}
							/>
							<DefaultButton 
								onClick={handleEditImage}
								title="Edit profile picture"
								btnClassName={classes.button}
							>
								<AccountCircleTwoToneIcon color="primary" />
							</DefaultButton>
					</div>
					<hr/>
					<div className="profile-details">
						<MuiLink
							component={Link}
							to={`/users/${user.credentials.handle}`}
							color="primary"
							variant="h5">
							@{user.credentials.handle}
						</MuiLink>
						<hr/>
					{user.credentials.bio && <Typography variant="body2">{user.credentials.bio}</Typography>}
					<hr/>
					{user.credentials.location && (
						<Fragment>
							<LocationOn color="primary" /> <span>{user.credentials.location}</span>
							<hr/>
						</Fragment>
					)}
					{user.credentials.website && (
						<Fragment>
							<LinkIcon color="primary" />
							<a href={user.credentials.website} target="_blank" rel="noopener noreferrer">
								{' '} {user.credentials.website}
							</a>
							<hr/>
						</Fragment>
					)}
					<CalendarToday color="primary" />{' '}
					<span>Joined {dayjs(user.credentials.createdAt).format('MMM YYYY')}</span>
					</div>
				</div>
					<DefaultButton title="logout" onClick={() => dispatch(logoutUser())}>
						<KeyboardReturn color="primary" />
					</DefaultButton>
				<EditDetails />
			</Paper>
	) : (
		<Paper className={classes.paper}>
			<Typography variant="body2" align="center">
				No profile found, please loagin again
			</Typography>
			<div className={classes.buttons}>
				<Button variant="contained" color="primary" component={Link} to="/login">
					Login
				</Button>
				<Button variant="contained" color="secondary" component={Link} to="/signup">
					Signup
				</Button>
			</div>
		</Paper>
	)): (
			<ProfileSkeleton />			
			)
	return profileMarkup
}

export default withStyles(styles)(Profile)