import React, { useState, useEffect } from 'react'
// Material UI stuff
import {
	withStyles,
	Button,
	Grid,
	TextField } from '@material-ui/core'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { submitComment } from '../../redux/actions/dataActions'

const styles= theme => ({ ...theme.text })

const CommentForm = props => {

	const { classes, screamId,  } = props
	const [body, setBody] = useState('')
	const [errors, setErrors] = useState('')
	const ui = useSelector(state => state.ui)
	const authenticated = useSelector(state => state.user.authenticated)
	const dispatch = useDispatch()

	useEffect(() => {
		ui.error !== null ? setErrors(ui.error) : setErrors('')
	},[ui.error])

	return (
		authenticated && (
				<Grid item sm={12} style={{textAlign: 'center'}}>
					<form onSubmit={e => {
						e.preventDefault()
						dispatch(submitComment(screamId, { body }))
						setBody('')
					}}>
						<TextField
							name="body"
							type="text"
							label="comment on scream"
							error={errors.comment ? true : false}
							helperText={errors.comment}
							value={body}
							onChange={e => setBody(e.target.value)}
							fullWidth
							className={classes.textField}
						/>
						<Button
						 type="submit"
						 variant="contained"
						 color="primary"
						 className={classes.button}
						>
							Submit
						</Button>
					</form>
					<hr className={classes.visibleSeparator} />
				</Grid>
			)
	)
}

export default withStyles(styles)(CommentForm)