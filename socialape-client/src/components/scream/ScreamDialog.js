import React, { Fragment, useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { DefaultButton } from '../../util/DefaultButton';
import { LikeButton } from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom"
// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
// Redux stuff
import { useSelector, useDispatch } from 'react-redux';
import { getScream, clearErrors } from '../../redux/actions/dataActions';

const styles = theme => ({ ...theme.text });

const ScreamDialog = props => {
	
	const dispatch = useDispatch()
	const {
		classes,
		screamId,
		userHandle,
		openDialog
	} = props
	
	const data = useSelector(state => state.data)
	const ui = useSelector(state => state.ui) 
	const user = useSelector(state => state.user)
	const [open, setOpen] = useState(openDialog || false)
	let history = useHistory()

	const dialogMarkup = ui.loading ? (
			<div className={classes.spinnerDiv} style={{display:'flex', justifyContent:'center'}}>
				<CircularProgress size={200} thickness={2} />
			</div>
		) : data && (
				<Grid container spacing={10}>
					<Grid item sm={5}>
						<img src={data.scream.userImage} alt="Profile" className={classes.profileImage} />
					</Grid>
					<Grid item sm={7}>
						<Typography
							component={Link}
							color="primary"
							variant="h5"
							to={`/users/${userHandle}`}
						>
							@{userHandle}
						</Typography>
						<hr className={classes.invisibleSeparator} />
						<Typography variant="body2" color="textSecondary">
							{dayjs(data.scream.createdAt).format('h:mm a, MMMM DD YYYY')}
						</Typography>
						<hr className={classes.invisibleSeparator} />
						<Typography variant="body1">{data.scream.body}</Typography>
						<LikeButton user={user} screamId={screamId} />
						<span>{data.scream.likeCount} likes</span>
						<DefaultButton title="comments">
							<ChatIcon color="primary" />
						</DefaultButton>
						<span>{data.scream.commentCount} comments</span>
					</Grid>
					<hr className={classes.visibleSeparator} />
					<CommentForm screamId={screamId} />
					<Comments comments={data.scream.comments} />
				</Grid>
			);
		return (
			<Fragment>
				<DefaultButton
					onClick={() => {
						dispatch(getScream(screamId))
						history.push(`/users/${userHandle}/scream/${screamId}`)
					}}
					title="Expand scream"
					tipClassName={classes.expandButton}
				>
					<UnfoldMore color="primary" />
				</DefaultButton>
				<Dialog
					open={open}
					onClose={()=>{
						history.push(`/users/${userHandle}`)
						setOpen(false)
						dispatch(clearErrors())
					}}
					fullWidth
					maxWidth="sm"
				>
					<DefaultButton
						title="Close"
						onClick={() =>{
							history.push(`/users/${userHandle}`)
							setOpen(false)
							dispatch(clearErrors())
						}}
						tipClassName={classes.closeButton}
					>
						<CloseIcon />
					</DefaultButton>
					<DialogContent className={classes.dialogContent}>
						{dialogMarkup}
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}

export default withStyles(styles)(ScreamDialog)