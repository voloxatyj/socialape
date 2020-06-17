import React, { Fragment } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// Material UI stuff
import {
	Paper,
	Typography,
	withStyles
} from '@material-ui/core';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = theme => ({ ...theme.text });

const StaticProfile = props => {
	const {
		classes,
		profile: { handle, createdAt, imageUrl, bio, website, location }
	} = props;
	
	return (
		<Paper className={classes.paper}>
			<div className={classes.profile}>
				<div className="image-wrapper">
					<img src={imageUrl} alt="profile" className={classes.image} />
				</div>
				<hr />
				<div className="profile-details">
					<Typography
						variant="h4"
						component={Link}
						to={`/users/${handle}`}
						color="primary"
					> @{handle}
					</Typography>
					<hr />
					{bio && <Typography variant="body2">{bio}</Typography>}
					<hr />
					{location && (
						<Fragment>
							<LocationOn color="primary" /> <span>{location}</span>
							<hr />
						</Fragment>
					)}
					{website && (
						<Fragment>
							<LinkIcon color="primary" />
							<a href={website} target="_blank" rel="noopener noreferrer">
								{' '}
								{website}
							</a>
							<hr />
						</Fragment>
					)}
					<CalendarToday color="primary" />{' '}
					<span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
				</div>
			</div>
		</Paper>
	);
};

export default withStyles(styles)(StaticProfile);