import React, { Fragment, useState, useEffect } from 'react'
//  Materila UI stuff
import { 
	withStyles, 
	Typography,
	Grid
} from '@material-ui/core'
// Redux
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

const styles = theme => ({ ...theme.text })

 const Comments = props => {

	const { commentsProps, classes } = props
	const data = useSelector(state => state.data)
	const [comments, setComments] = useState(data.scream.comments)

	useEffect(() => {
		if (data.scream.comments !== commentsProps && data.scream.comments !== undefined)
			setComments(data.scream.comments)
	}, [data.scream.comments])

	return (
		comments !== undefined && (
		<Grid container>
			{comments.map((comment, index) => {
				const { body, createdAt, userImage, userHandle } = comment
				return (
					<Fragment key={index}>
						<Grid item sm={12}>
							<Grid container>
								<Grid item sm={2}>
									<img
										src={userImage}
										alt="comment"
										className={classes.commentImage}
									/>
								</Grid>
								<Grid item sm={9}>
									<div className={classes.commentData}>
										<Typography
											variant="h5"
											component={Link}
											to={`/users/${userHandle}`}
											color="primary"
										>
											@{userHandle}
										</Typography>
										<Typography variant="body2" color="textSecondary">
											{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
										</Typography>
										<hr className={classes.invisibleSeparator} />
										<Typography variant="body1">{body}</Typography>
									</div>
								</Grid>
							</Grid>
						</Grid>
						{index !== comments.lenght - 1 && (
							<hr className={classes.visibleSeparator} />
						)}
					</Fragment>
				)
			})}
		</Grid>
		)
	)
}

export default withStyles(styles)(Comments)