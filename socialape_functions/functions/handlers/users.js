const firebase = require('firebase')
const config = require('../util/config')
const { admin, db } = require('../util/admin')
const { validateSignUpData, validateLogInData, reduceUserInfo } = require('../util/validations')
const { uuid } = require("uuidv4");

firebase.initializeApp(config)

exports.signUpUser = (req, res) => {
	const newUser = {
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
		handle: req.body.handle
	}

	const { valid, errors } = validateSignUpData(newUser)

	if(!valid) return res.status(400).json(errors)
	let token, userId

	const noImg = 'no-image.png'

	db
		.doc(`/users/${newUser.handle}`).get()
		.then(doc => doc.exists ? 
			res.status(400).json({ message: 'user is already exist'})
			: firebase
					.auth()
					.createUserWithEmailAndPassword(newUser.email, newUser.password)
			)
		.then(data => {
			userId = data.user.uid
			return data.user.getIdToken()
		})
		.then(tokenId => {
			token = tokenId
			const userCredentials = {
				email: newUser.email,
				password: newUser.password,
				createdAt: new Date().toISOString(),
				handle: newUser.handle,
				imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media&token=17180425-18a7-4375-8354-cfa8888fb404`,
				userId
			}
			return db.doc(`/users/${newUser.handle}`).set(userCredentials)
		})
		.then(() => res.status(201).json({ token }))
		.catch(err => {
			console.error(err)
			if (err.code === "auth/email-already-in-use") {
				return res.status(400).json({ email: "Email is already is use" });
			} else {
				return res
					.status(500)
					.json({ general: "Something went wrong, please try again" });
			}
		})
}

exports.loginUser = (req, res) => {
	const user = {
		email: req.body.email,
		password: req.body.password
	}

	const { valid, errors } = validateLogInData(user)

	if (!valid) return res.status(400).json(errors)
	
	firebase
		.auth()
		.signInWithEmailAndPassword(user.email, user.password)
		.then(data => data.user.getIdToken())
		.then(token => res.status(200).json({ token }))
		.catch(err => {
			console.error(err)
				return res
					.status(403)
					.json({ general: "Wrong credentials? please, try again" });
		})
}

//Get info about user
exports.addUserDetails = (req, res) => {
	let userDetails = reduceUserInfo(req.body)

	db
		.doc(`/users/${req.user.handle}`)
		.update(userDetails)
		.then(() => res.json({ message: 'Details added successfully' }))
		.catch(err => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		})
}

// Get any user’s details
exports.getUserDetails = (req, res) => {
	let userData={}
	db.doc(`/users/${req.params.handle}`).get()
		.then(doc => {
			if(doc.exists) {
				userData.user = doc.data()
				return db
								.collection('screams')
								.where('userHandle', '==', req.params.handle)
								.orderBy('createdAt', 'desc')
								.get()
			} else {
				return res.status(404).json({ error: 'User not found' })
			}
		})
		.then(data => {
			userData.screams = []
			data.forEach(doc => {
				userData.screams.push({
				body: doc.data().body,
				createdAt: doc.data().createdAt,
				userHandle: doc.data().userHandle,
				userImage: doc.data().userImage,
				likeCount: doc.data().likeCount,
				commentCount: doc.data().commentCount,
				screamId: doc.id
			})
		})
			return res.json(userData)
		})
		.catch(err => {
			console.error(err)
			res.status(500).json({ error: err.code })
		})
}

// Get own user details
exports.getAuthenticatedUser = (req, res) => {
	let userData = {}

	db.doc(`/users/${req.user.handle}`).get()
		.then(doc => {
			if(doc.exists) {
				userData.credentials = doc.data()
				return db
					.collection('likes')
					.where('userHandle', '==', req.user.handle)
					.get()
				}
			})
			.then(data => {
				userData.likes = []
				data.forEach(doc => userData.likes.push(doc.data()))
				return db
					.collection('notifications')
					.where('recipient', '==', req.user.handle)
					.orderBy('createdAt', 'desc')
					.get()
			})
			.then(data => {
				userData.notifications = []
				data.forEach(doc => userData.notifications.push({
					recipient: doc.data().recipient,
					sender: doc.data().sender,
					read: doc.data().read,
					screamId: doc.data().screamId,
					type: doc.data().type,
					createdAt: doc.data().createdAt,
					notificationId: doc.id
				}))
				return res.json(userData)
			})
			.catch(err => {
				console.error(err)
				return res.status(500).json({ error: err.code})
			})
}

// Upload a profile image for user
exports.uploadImage = (req, res) => {
	const BusBoy = require("busboy");
	const path = require("path");
	const os = require("os");
	const fs = require("fs");

	const busboy = new BusBoy({ headers: req.headers });

	let imageToBeUploaded = {};
	let imageFileName;
	// String for image token
	let generatedToken = uuid();

	busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
		
		if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
			return res.status(400).json({ error: "Wrong file type submitted" });
		}
		// my.image.png => ['my', 'image', 'png']
		const imageExtension = filename.split(".")[filename.split(".").length - 1];
		// 32756238461724837.png
		imageFileName = `${Math.round(
			Math.random() * 1000000000000
		).toString()}.${imageExtension}`;
		const filepath = path.join(os.tmpdir(), imageFileName);
		imageToBeUploaded = { filepath, mimetype };
		file.pipe(fs.createWriteStream(filepath));
	});
	busboy.on("finish", () => {
		admin
			.storage()
			.bucket()
			.upload(imageToBeUploaded.filepath, {
				resumable: false,
				metadata: {
					metadata: {
						contentType: imageToBeUploaded.mimetype,
						//Generate token to be appended to imageUrl
						firebaseStorageDownloadTokens: generatedToken,
					},
				},
			})
			.then(() => {
				// Append token to url
				console.log(config.storageBucket)
				const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;
				return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
			})
			.then(() => {
				return res.json({ message: "image uploaded successfully" });
			})
			.catch((err) => {
				console.error(err);
				return res.status(500).json({ error: "something went wrong" });
			});
	});
	busboy.end(req.rawBody);
};

exports.markNotificationsRead = (req, res) => {
	const batch = db.batch()
	req.body.forEach(notificationId => {
		const notification = db.doc(`/notifications/${notificationId}`)
		batch.update(notification, { read: true })
	})
	batch
		.commit()
		.then(() => {
			return res.json({ message: "Notifications marked read" });
		})
		.catch(err => {
			console.error(err)
			return res.status(500).json({ error: err.code })
		})
}