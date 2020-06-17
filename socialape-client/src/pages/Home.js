import React, { useEffect } from 'react'
import Scream from '../components/scream/Scream'
import Profile from '../components/profile/Profile'
import ScreamSkeleton from '../util/ScreamSkeleton'
// Material UI stuff
import { Grid } from '@material-ui/core'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getScreams } from '../redux/actions/dataActions'

export const Home = props => {
	
	const dispatch = useDispatch() 

	useEffect(() => dispatch(getScreams()), [dispatch])

	const data = useSelector(state => state.data)
	const loading = useSelector(state => state.data.loading)
	const authenticated = useSelector(state => state.user.authenticated)

	return (
		<Grid container spacing={4} alignItems="center">
			<Grid item sm={8} xs={12}>
				{!loading && authenticated && data.screams !== undefined ? data.screams.map(scream => 
				<Scream key={scream.screamId} scream={scream} /> 
			) : ( 
			<ScreamSkeleton />
			)}
			</Grid>
			<Grid item sm={4} xs={12}>
				<Profile />
			</Grid>
		</Grid>	
	)
}
