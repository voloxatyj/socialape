import React, { Fragment } from 'react';
import NoImg from '../images/no-img.png';
// MUI
import {
	Card,
	withStyles,
	CardMedia,
	CardContent
} from '@material-ui/core';

const styles = theme => ({ ...theme.text });

const ScreamSkeleton = props => {
	const { classes } = props;

	const content = Array.from({ length: 4 }).map((item, index) => (
		<Card className={classes.card} key={index}>
			<CardMedia className={classes.image_scream} image={NoImg} />
			<CardContent className={classes.content}>
				<div className={classes.handle} />
				<div className={classes.date} />
				<div className={classes.fullLine} />
				<div className={classes.fullLine} />
				<div className={classes.halfLine} />
			</CardContent>
		</Card>
	));

	return <Fragment>{content}</Fragment>;
};

export default withStyles(styles)(ScreamSkeleton);
