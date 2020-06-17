import React, { Fragment, useState } from 'react'
import { DefaultButton } from '../../util/DefaultButton'
// Material UI stuff
import {
	withStyles,
	Button,
	Dialog,
	DialogActions,
	DialogTitle
} from '@material-ui/core'
// Icons
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded'
// Redux
import { useDispatch } from 'react-redux'
import { deleteScream } from '../../redux/actions/dataActions'

const styles = theme => ({ ...theme.text })

const DeleteScream = props => {
	
	const [open, setOpen] = useState(false)
	const { classes } = props
	const dispatch = useDispatch()
	
	return (
		<Fragment>
			<DefaultButton 
				title="delete scream" 
				btnClassName={classes.deleteButton}
				onClick={() => setOpen(true)}
			>
				<DeleteOutlineRoundedIcon color="secondary" />
			</DefaultButton>
				<Dialog
				open={open} 
				onClose={() => setOpen(false)} 
				fullWidth
				maxWidth='sm'
				>
					<DialogTitle>
						Are you sure you wanna delete this item ?
					</DialogTitle>
					<DialogActions>
						<Button onClick={() => setOpen(false)}  color="primary">
							Cancel
						</Button>
						<Button onClick={() => {
							dispatch(deleteScream(props.screamId))
							setOpen(false)}}
							color="secondary"
						>
							Delete
						</Button>
					</DialogActions>
				</Dialog> 
		</Fragment>
	)
}

export default withStyles(styles)(DeleteScream)
