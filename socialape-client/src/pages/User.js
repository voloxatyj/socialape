import React, { useState, useEffect } from 'react'
import ScreamSkeleton from '../util/ScreamSkeleton'
import ProfileSkeleton from '../util/ProfileSkeleton'
import StaticProfile from '../components/profile/StaticProfile'
import Scream from '../components/scream/Scream'
import axios from 'axios'
import {
	useParams
} from "react-router-dom"
// Material UI stuff
import { Grid } from '@material-ui/core'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getUserDetails } from '../redux/actions/dataActions'

export const User = props => {
	
	const dispatch = useDispatch()
	const handle = props.match.params.handle
	let { screamId } = useParams()

	useEffect(() => {
		dispatch(getUserDetails(handle))
		axios.get(`/user/${handle}`)
			.then((res) => setProfile(res.data.user))
			.catch(err => console.log(err))
	},[handle])
	
	const [profile, setProfile] = useState(null)
	const screamIdParam = screamId 
	const loading = useSelector(state => state.ui.loading)
	const data = useSelector(state => state.data)
	
	const screamsMarkup = loading ? (
		<ScreamSkeleton />
	) : data.screams === null || data.screams === undefined ? (
		<p>No screams from this user</p>
	) : !screamIdParam ? (
		data.screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
	) : (
		data.screams.map((scream) => {
		if (scream.screamId !== screamIdParam)
		return <Scream key={scream.screamId} scream={scream} />;
		else return <Scream key={scream.screamId} scream={scream} openDialog />;
		})
	);

	return (
		<Grid container spacing={10}>
			<Grid item sm={8} xs={12}>
				{screamsMarkup}
			</Grid>
			<Grid item sm={4} xs={12}>
				{profile === null ? (
					<ProfileSkeleton />
				) : (
						<StaticProfile profile={profile} />
					)}
			</Grid>
		</Grid>
	);
}
