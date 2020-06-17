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
	TextField
 	} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/actions/userActions'

const styles = theme => ({ ...theme.text })

const Login = props => {
	
	const { classes } = props 
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errors, setErrors] = useState('') 
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
				<Typography variant="h2" className={classes.pageTitle}>Login</Typography>
				<form noValidate 
				onSubmit={
					(e) => {
						e.preventDefault()
						dispatch(loginUser({ email, password }, props.history))
					}
				} >
					<TextField 
						id="email"
						type="email"
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
						label="Password"
						className={classes.textField}
						helperText={errors.password}
						error={errors.password ? true : false}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
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
					disabled={ui.loading}
					>
						Login
					{ui.loading && (
					<CircularProgress 
						size={30} 
						className={classes.progress}
						color="primary" 
					/>)}
					</Button>
					<br/>
					<small>don’t have an account? <Link to="/signup">go here</Link></small>
				</form>
			</Grid>
			<Grid item sm />
		</Grid>
	)
}

export default withStyles(styles)(Login)