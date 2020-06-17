import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { markNotificationsRead } from '../../redux/actions/userActions'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { getScream } from '../../redux/actions/dataActions'
// Material UI stuff
import {
	Menu,
	Tooltip,
	MenuItem,
	IconButton,
	Typography,
	Badge
} from '@material-ui/core'
// Icons
import NotificationImportantRoundedIcon from '@material-ui/icons/NotificationImportantRounded'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'

export const Notifications = () => {

	dayjs.extend(relativeTime)
	const [anchorEL, setAnchorEl] = useState(null)
	const dispatch = useDispatch()
	const notifications = useSelector(state => state.user.notifications)
	let notificationsIcon


	if(notifications && notifications.length !== 0) {
		notifications.filter(item => item.read === false).length > 0 ? notificationsIcon = (
			<Badge badgeContent={notifications.filter(item => item.read === false).length} color="secondary">
				<NotificationImportantRoundedIcon />
			</Badge>
		) : (
				notificationsIcon = <NotificationImportantRoundedIcon />
		)
	} else notificationsIcon = <NotificationImportantRoundedIcon />

	let notificationsMarkup = notifications && notifications.length > 0 ? (
		notifications.map(item => {
			const verb = item.type === 'like' ? 'liked' : 'commented on'
			const time = dayjs(item.createdAt).fromNow()
			const iconColor = item.read ? 'primary' : 'secondary'
			const icon = item.type === 'like' ? (
				<FavoriteIcon color={iconColor} style={{marginRight: 10}} />
			) : (
				<ChatIcon color={iconColor} style={{ marginRight: 10 }} />
			)
			return (
				<MenuItem key={item.createdAt} onClick={() => setAnchorEl(null)}>
					{icon}
					<Typography
						component={Link}
						color={iconColor}
						variant="body1"
						to={`/users/${item.recipient}/scream/${item.screamId}`}
						onClick={() => dispatch(getScream(item.screamId))}
						replace
					>
							{item.sender} {verb} your scream {time}
						</Typography>
				</MenuItem>
			)
		})
		)	:	(
			<MenuItem onClick={() => setAnchorEl(null)}>
				You have no notifications yet
			</MenuItem>
	)

	return (
		<Fragment>
			<Tooltip placement="top" title="notifications">
				<IconButton
				 aria-owns={anchorEL ? 'simple-menu' : undefined}
				 aria-haspopup="true"
				 onClick={e => setAnchorEl(e.target)}
				>
					{notificationsIcon}
				</IconButton> 	
			</Tooltip>
			<Menu
				anchorEl={anchorEL}
				open={Boolean(anchorEL)}
				onClose={() => setAnchorEl(null)}
				onEntered={() => {
					if(notifications !== undefined) {
						let unreadNotificationsIds = 
						notifications
							.filter(item => !item.read)
							.map(item => item.notificationId)
						dispatch(markNotificationsRead(unreadNotificationsIds))
					}
				}}
			>
				{notificationsMarkup}	
			</Menu>			
		</Fragment>
	)
}
