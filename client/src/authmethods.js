// import firebaseConfig, { auth } from "./firebase";


// export const authMethods = {
// 	signup: (email, password, setErrors, setToken) => {
// 		auth.createUserWithEmailAndPassword(email, password)
// 			.then(async res => {
// 				const token = await Object.entries(res.user)[5][1].b
// 				console.log('token >>', token)
// 			})
// 			.catch(err => {
// 				setErrors(prev => ([...prev, err.message]))
// 			})
// 	},
// 	signin: (email, password) => {

// 	},
// 	signout: (email, password) => {

// 	}
// }