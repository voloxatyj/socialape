module.exports = {
	palette: {
		primary: {
			light: '#33c9dc',
			main: '#00bcd4',
			dark: '#008394',
			contrastText: '#fff'
		},
		secondary: {
			light: '#ff6333',
			main: '#ff3d00',
			dark: '#b22a00',
			contrastText: '#fff'
		}
	},
	text: {
		root: {
			display: 'flex',
			justifyContent: 'space-around',
			alignContent: 'center',
			'& > * + *': {
				marginTop: 10,
			},
		},
		typography: {
			useNextVariants: true
		},
		form: {
			textAlign: 'center'
		},
		image: {
			margin: '20px auto 20px auto'
		},
		pageTitle: {
			margin: '10px auto 10px auto'
		},
		textField: {
			margin: '10px auto 10px auto'
		},
		button: {
			marginTop: 20,
			position: 'relative'
		},
		customError: {
			color: 'red',
			fontSize: '0.8rem',
			marginTop: 10
		},
		progress: {
			position: 'absolute'
		},
		invisibleSeparator: {
			border: 'none',
			margin: 5
		},
		padding: {
			padding: 30
		},
		visibleSeparator: {
			width: '100%',
			borderBottom: '1px solid rgba(0,0,0,0.1)',
			marginBottom: 20
		},
		paper: {
			padding: 20
		},
		profile: {
			'& .image-wrapper': {
				textAlign: 'center',
				position: 'relative',
				'& button': {
					position: 'absolute',
					top: '80%',
					left: '70%'
				}
			},
			'& .profile-image': {
				width: 250,
				height: 200,
				objectFit: 'fill',
				maxWidth: '100%',
				borderRadius: '50%'
			},
			'& .profile-details': {
				textAlign: 'center',
				'& span, svg': {
					verticalAlign: 'middle'
				},
				'& a': {
					color: '#00bcd4',
					textDecoration: 'none'
				}
			},
			'& hr': {
				border: 'none',
				margin: '0 0 10px 0'
			},
			'& svg.button': {
				'&:hover': {
					cursor: 'pointer'
				}
			},
		},
		card: {
				position: 'relative',
				display: 'flex',
				marginBottom: '20px'
			},
		content: {
				padding: '25px'
			},
		image_scream: {
				margin: 10,
				minWidth: 200,
				minHeight: 150,
				objectFit: 'cover'
			},
		buttons: {
			textAlign: 'center',
			'& a': {
				margin: '20px 10px'
			}
		},
		submitButton: {
			position: 'relative',
			margin: '10px 0 10px 0',
			float: 'right'
		},
		progressSpinner: {
			position: 'absolute'
		},
		closeButton: {
			position: 'absolute',
			left: '91%',
			top: '3%'
		},
		dialogContent: {
			padding: 20
		},
		dialogSpinner: {
			height: 250,
			display: 'flex',
			justifyContent: 'space-around',
			alignItems: 'center',
		},
		expandButton: {
			position: 'absolute',
			left: '90%'
		},
		deleteButton: {
			position: 'absolute',
			left: '90%',
			top: '10%'
		},
		commentImage: {
			maxWidth: '100%',
			objectFit: 'cover',
			padding: '10%',
			marginLeft: 20
		},
		commentData: {
			marginLeft: 50
		},
		handle: {
			width: 60,
			height: 18,
			backgroundColor: '#00bcd4',
			marginBottom: 7
		},
		date: {
			height: 14,
			width: 100,
			backgroundColor: 'rgba(0,0,0, 0.3)',
			marginBottom: 10
		},
		fullLine: {
			height: 15,
			width: '90%',
			backgroundColor: 'rgba(0,0,0, 0.6)',
			marginBottom: 10
		},
		halfLine: {
			height: 15,
			width: '50%',
			backgroundColor: 'rgba(0,0,0, 0.6)',
			marginBottom: 10
		}
	}
}
