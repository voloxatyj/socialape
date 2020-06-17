import React from 'react'
import {
	Tooltip,
	IconButton
} from '@material-ui/core'


export const DefaultButton = ({ children, title, btnClassName, onClick, tipClassName }) => (
	<Tooltip placement="top" title={title} className={tipClassName}>
		<IconButton onClick={onClick} className={btnClassName}>
			{ children }
		</IconButton>
	</Tooltip>
	)

