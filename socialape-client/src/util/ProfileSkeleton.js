import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import NoImg from '../images/no-img.png';
// MUI
import {
	Paper,
	CardMedia
} from '@material-ui/core';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = theme => ({ ...theme.text });

const ProfileSkeleton = props => {
	const { classes } = props;
	return (
		<Paper className={classes.paper}>
			<div className={classes.profile}>
				<CardMedia className={classes.image_scream} image={NoImg} />
				<hr />
				<div className="profile-details">
					<div className={classes.handle} />
					<hr />
					<div className={classes.fullLine} />
					<div className={classes.fullLine} />
					<hr />
					<LocationOn color="primary" /> <span>Location</span>
					<hr />
					<LinkIcon color="primary" /> https://website.com
          <hr />
					<CalendarToday color="primary" /> Joined date
        </div>
			</div>
		</Paper>
	);
};

export default withStyles(styles)(ProfileSkeleton);