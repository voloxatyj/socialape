import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// Icons
import AppIcon from '../images/icon.png'
// Material UI stuff
import {
	withStyles,
	Grid,
	Typography,
	Button,
	TextField,
	CircularProgress
} from '@material-ui/core'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { signupUser } from '../redux/actions/userActions'

const styles = theme => ({ ...theme.text })

const Signup = props => {
	
	const { classes } = props 
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [handle, setHandle] = useState('')
	const [errors, setErrors] = useState('')
	const user = useSelector(state => state.user) 
	const ui = useSelector(state => state.ui) 
	const dispatch = useDispatch()

	useEffect(() =>
		ui.error !== null ? setErrors(ui.error) : setErrors('')
		, [ui.error])

	return (
		<Grid container className={classes.form}>
			<Grid item sm />
			<Grid item sm>
				<img src={AppIcon} alt="monkey" className={classes.image} />
				<Typography variant="h2" className={classes.pageTitle}>SignUp</Typography>
				<form noValidate
					onSubmit={
						(e) => {
							e.preventDefault()
							dispatch(signupUser({ email, password, confirmPassword, handle }, props.history))
						}
					} >
					<TextField
						id="email"
						type="email"
						name="email"
						label="Email"
						className={classes.textField}
						helperText={errors.email}
						error={errors.email ? true : false}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						fullWidth
					/>
					<TextField
						id="password"
						type="password"
						name="password"
						label="Password"
						className={classes.textField}
						helperText={errors.password}
						error={errors.password ? true : false}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						fullWidth
					/>
					<TextField
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						label="Confirm Password"
						className={classes.textField}
						helperText={errors.confirmPassword}
						error={errors.confirmPassword ? true : false}
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						fullWidth
					/>
					<TextField
						id="handle"
						name="handle"
						type="text"
						label="Handle"
						className={classes.textField}
						helperText={errors.handle}
						error={errors.handle ? true : false}
						value={handle}
						onChange={(e) => setHandle(e.target.value)}
						fullWidth
					/>
					{errors.general && (
						<Typography variant="body2" className={classes.customError}>
							{errors.general}
						</Typography>
					)}
					<Button
						type="submit"
						variant="contained"
						color="primary"
						className={classes.button}
						disabled={user.loading}
					>
						SignUp
					{user.loading && (<CircularProgress size={30} className={classes.progress} />)}
					</Button>
					<br />
					<small>Already have an account? <Link to="/login">go here</Link></small>
				</form>
			</Grid>
			<Grid item sm />
		</Grid>
	)
}

export default withStyles(styles)(Signup)