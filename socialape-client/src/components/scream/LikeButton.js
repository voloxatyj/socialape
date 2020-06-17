import React from 'react'
import { DefaultButton } from '../../util/DefaultButton'
import { Link } from 'react-router-dom'
// Redux
import { useDispatch } from 'react-redux'
import { likeScream, unlikeScream } from '../../redux/actions/dataActions'
// Icons 
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded'
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded'

export const LikeButton = props => {
	
	const { user, screamId } = props
	const dispatch = useDispatch() 

	return (
		!user.authenticated ? (
			<DefaultButton title="like">
				<Link to="/login">
					<FavoriteBorderRoundedIcon color="primary" />
				</Link>
			</DefaultButton>
		) : (
			user.likes && user.likes.find(like => like.screamId === screamId)
		) ? (
			<DefaultButton title="undo like" onClick={() => dispatch(unlikeScream(screamId))}>
				<FavoriteRoundedIcon color="primary" />
			</DefaultButton>
		) : (
			<DefaultButton title="like" onClick={() => dispatch(likeScream(screamId))}>
				<FavoriteBorderRoundedIcon color="primary" />
			</DefaultButton>
		)
	)
}