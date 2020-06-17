const { db } = require('../util/admin')
// getAllScreams
exports.getAllScreams = (req, res) => {
	db
		.collection('screams')
		.orderBy('createdAt', 'desc')
		.get()
		.then(data => {
			let screams = []
			data.forEach(doc => screams.push({
				screamId: doc.id,
				body: doc.data().body,
				userHandle: doc.data().userHandle,
				createdAt: doc.data().createdAt,
				commentCount: doc.data().commentCount,
				likeCount: doc.data().likeCount,
				userImage: doc.data().userImage
			}))
			return res.json(screams)
		})
		.catch(err => {
			console.error(err)
			return res.status(201).json({ error: 'something go wrong' })
		})
}
// postOneScream
exports.postOneScream = (req, res) => {
	console.log(req.body)
	if (req.body.body.trim() === '') {
		return res.status(400).json({ body: 'Body must not be empty' });
	}
	
	const newScream = {
		userHandle: req.user.handle,
		body: req.body.body,
		createdAt: new Date().toISOString(),
		userImage: req.user.imageUrl,
		likeCount: 0,
		commentCount: 0
	}

	db
	.collection('screams')
	.add(newScream)
	.then(doc => {
		newScream.screamId = doc.id
		return res.json(newScream)
	})
		.catch(err => {
			console.error(err)
			res.status(500).json({ general: 'something went wromg' })
		})
}
// getScream
exports.getScream = (req, res) => {
	let screamData ={}
	db
		.doc(`/screams/${req.params.screamId}`)
		.get()
		.then(doc => {
			if(!doc.exists) res.status(404).json({ message: 'Scream not found'})
				screamData = doc.data()
				screamData.screamId = doc.id
				return db
								.collection('comments')
								.orderBy('createdAt', 'desc')
								.where('screamId', '==', req.params.screamId)
								.get()
		})
		.then(data => {
			screamData.comments = []
			data.forEach(doc => screamData.comments.push(doc.data()))
		})
		.then(() => res.json(screamData))
		.catch(err => {
			console.error(err)
			return res.status(404).json({ error: err.code })
		})
}
// commentOnScream
exports.commentOnScream = (req, res) => {
	if(req.body.body.trim() === '') return res.status(401).json({ comment: 'Must not be empty' })

	const newComment = {
		userHandle: req.user.handle,
		screamId: req.params.screamId,
		body: req.body.body,
		createdAt: new Date().toISOString(),
		userImage: req.user.imageUrl
	}

	db
		.doc(`/screams/${req.params.screamId}`)
		.get()
		.then(doc => {
			if(!doc.exists) res.status(400).json({ error: 'Scream not found'})
				doc.ref.update({ commentCount: doc.data().commentCount + 1 })
		})
		.then(() => db
			.collection('comments')
			.add(newComment))
		.then(() => res.json(newComment))
		.catch(err => {
			console.error(err)
			res.status(500).json({ error: 'Something went wrong' })
		})
}
// likeScream
exports.likeScream = (req, res) => {
	const likeDocument = db
		.collection('likes')
		.where('userHandle', '==', req.user.handle)
		.where('screamId', '==', req.params.screamId)
		.limit(1)

	const screamDocument = db.doc(`/screams/${req.params.screamId}`)

	let screamData

	screamDocument.get()
		.then(doc => {
			if (doc.exists) {
				screamData = doc.data()
				screamData.screamId = doc.id
				return likeDocument.get()
			}
			res.status(404).json({ error: 'Scream not found' })
		})
		.then(data => {
			if (data.empty) {
				db.collection('likes').add({
					userHandle: req.user.handle,
					screamId: req.params.screamId
				})
					.then(() => {
						screamData.likeCount++
						return screamDocument.update({ likeCount: screamData.likeCount })
					})
					.then(() => res.json({ screamData }))
			} else {
				res.status(400).json({ error: 'Scream already liked' })
			}
		})
		.catch(err => {
			console.error(err)
			return res.status(500).json({ error: err.code })
		})
}
// unlikeScream
exports.unlikeScream = (req, res) => {
	const likeDocument = db
		.collection('likes')
		.where('userHandle', '==', req.user.handle)
		.where('screamId', '==', req.params.screamId)
		.limit(1)
	
	const screamDocument = db.doc(`/screams/${req.params.screamId}`)
		
	let screamData

	screamDocument.get()
		.then(doc => {
			if(doc.exists) {
				screamData = doc.data()
				screamData.screamId = doc.id
				return likeDocument.get()
			} else {
				res.status(404).json({ error: 'Scream not found' })
			}
		})
		.then(data => {
			if(data.empty) { 
				res.status(400).json({ error: 'Scream already liked' })
			} else {
				return	db.doc(`/likes/${data.docs[0].id}`).delete()
			}
		})
		.then(() => {
			screamData.likeCount --
			return screamDocument.update({ likeCount: screamData.likeCount })
		})
		.then(() => res.json({ screamData }))
		.catch(err => {
			console.error(err)
			return res.status(500).json({ error: err.code })
		})
}
// deleteScream
exports.deleteScream = (req, res) => {
	const document = db.doc(`/screams/${req.params.screamId}`)
	
	document.get()
		.then(doc => {
			if (!doc.exists) res.status(404).json({ error: 'Scream not found' })
			if (doc.data().userHandle !== req.user.handle) {
				return res.status(403).json({ error: 'Unauthorized' });
			} else {
				return document.delete();
			}
		})
		.then(() => res.status(200).json({ message: 'Scream successesfully deleted'}))
		.catch(err => {
			console.error(err)
			return res.status(500).json({ message: 'Something went wrong' })
		}) 
}