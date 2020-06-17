import React, { Fragment, useState, useEffect } from 'react'
import { DefaultButton } from '../../util/DefaultButton'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'
import { LikeButton } from './LikeButton'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getScream } from '../../redux/actions/dataActions'
// Icons
import ChatRoundedIcon from '@material-ui/icons/ChatRounded'
// Material UI stuff
import {
	withStyles,
	Card,
	Paper,
	CardMedia,
	CardContent,
	Typography
} from '@material-ui/core'

const styles = theme => ({ ...theme.text })

const ScreamUser = props => {

	dayjs.extend(relativeTime)
	const {
		classes,
		scream: {
			body,
			createdAt,
			userImage,
			userHandle,
			screamId
		}
	} = props

	const user = useSelector(state => state.user)
	const dispatch = useDispatch()
	const screamID = useSelector(state => state.data.scream.screamId)
	const comment = useSelector(state => state.data.scream.commentCount)
	const like = useSelector(state => state.data.scream.likeCount)
	const [commentCount, setCommentCount] = useState(props.scream.commentCount)
	const [likeCount, setLikeCount] = useState(props.scream.likeCount)

	useEffect(() => {
		if (comment !== commentCount && comment !== undefined && screamID === screamId)
			setCommentCount(comment)
		if (like !== commentCount && like !== undefined && screamID === screamId)
			setLikeCount(like)
	}, [comment,like])

	return (
		<Card className={classes.card} elevation={6}>
			<Paper variant="outlined" square>
				<CardMedia
					className={classes.image_scream}
					title="Profile image"
				>
					<img src={userImage} alt="img"/>
				</CardMedia>
			</Paper>
			<CardContent className={classes.content}>
				<Typography
					variant="h5"
					component={Link}
					to={`/users/${userHandle}`}
					onClick={() => dispatch(getScream(screamId))}
					color="primary"
				>{userHandle}
				</Typography>
				<Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
				<Typography variant="body1">{body}</Typography>
				<LikeButton user={user} screamId={screamId} />
				<span>{likeCount} likes</span>
				<DefaultButton title="comment">
					<ChatRoundedIcon color="primary" />
				</DefaultButton>
				<span>{commentCount} comments</span>
				<ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={props.openDialog} />
				{userHandle === user.credentials.handle && (
					<Fragment>
						<DeleteScream screamId={screamId} />
					</Fragment>
				)}
			</CardContent>
		</Card>
	)
}

export default withStyles(styles)(ScreamUser)