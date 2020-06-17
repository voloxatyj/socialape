import React, { Fragment, useState, useEffect } from 'react'
import { DefaultButton } from '../../util/DefaultButton'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { postScream } from '../../redux/actions/dataActions'
// Material UI stuff
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	TextField,
	withStyles, 
	CircularProgress
} from '@material-ui/core'
// Icons
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

const styles = theme => ({ ...theme.text })

const PostScream = props => {

	const [open, setOpen] = useState(false)
	const { classes } = props
	const [errors, setErrors] = useState('')
	const [body, setBody] =  useState('')
	const ui = useSelector(state => state.ui)
	const dispatch = useDispatch()
	
	useEffect(() => {
		if(ui.error !== null) {
			setErrors(ui.error)
		} else if (ui.error === null && ui.loading === false) {
			setOpen(false)
		} 
	}, [ui.error,ui])
	
	return (
		<Fragment>
			<DefaultButton title="post a scream" onClick={() => setOpen(true)}>
				<AddIcon />
			</DefaultButton>
			<Dialog 
				open={open}
				onClose={() => { 
					setOpen(false)
					setErrors('')		
				}}
				fullWidth
				maxWidth="sm"
			>
				<DefaultButton
				 title="close" 
				 onClick={() => {
					 setOpen(false)
					 setErrors('')
				 }}
				 tooltipclassname={classes.closeButton}
				 >
					<CloseIcon />
				</DefaultButton>
					<DialogTitle>Post a new Scream!!</DialogTitle>
					<DialogContent>
						<form onSubmit={e => {
							e.preventDefault()
							dispatch(postScream({ body: body }))
							setBody('')
						}}>
							<TextField 
								name="body"
								autoFocus={open}
								type="text"
								label="lower you can write your scream"
								rows="3"
								placeholder="context of scream"
								error={errors.body ? true : false}
								helperText={errors.body}
								className={classes.textField}
								onChange={e => setBody(e.target.value)}
								multiline
								fullWidth
							/>
								<Button 
									type="submit"
									variant="contained"
									color="primary"
									className={classes.submitButton}
									disabled={ui.loading}
								> Submit
									{ui.loading && (
										<CircularProgress size={30} className={classes.progressSpinner} />
									)}
								</Button>
						</form>
					</DialogContent>
			</Dialog>
		</Fragment>
	)
}

export default withStyles(styles)(PostScream)
