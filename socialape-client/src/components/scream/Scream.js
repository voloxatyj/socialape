import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { DefaultButton } from '../../util/DefaultButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import { LikeButton } from './LikeButton';
// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// Icons
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { useSelector } from 'react-redux';

const styles = theme => ({ ...theme.text })

const Scream = props => {

		dayjs.extend(relativeTime)
		const {
			classes,
			scream: {
				body,
				createdAt,
				userImage,
				userHandle,
				screamId,
				likeCount,
				commentCount
			}
		} = props

		const user = useSelector(state => state.user)

		const deleteButton =
			user.authenticated && userHandle === user.credentials.handle ? (
				<DeleteScream screamId={screamId} />
			) : null;
		return (
			<Card className={classes.card}>
				<CardMedia
					image={userImage}
					title="Profile image"
					className={classes.image_scream}
				/>
				<CardContent className={classes.content}>
					<Typography
						variant="h5"
						component={Link}
						to={`/users/${userHandle}`}
						color="primary"
					>
						{userHandle}
					</Typography>
					{deleteButton}
					<Typography variant="body2" color="textSecondary">
						{dayjs(createdAt).fromNow()}
					</Typography>
					<Typography variant="body1">{body}</Typography>
					<LikeButton user={user} screamId={screamId} />
					<span>{likeCount} Likes</span>
					<DefaultButton title="comments">
						<ChatIcon color="primary" />
					</DefaultButton>
					<span>{commentCount} comments</span>
					<ScreamDialog
						screamId={screamId}
						userHandle={userHandle}
						openDialog={props.openDialog}
					/>
				</CardContent>
			</Card>
		);
	}

export default withStyles(styles)(Scream)