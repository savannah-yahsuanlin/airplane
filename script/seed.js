"use strict"
require('dotenv').config()
const data = require('./data')
const {db, Product, User} = require("../server/db")

async function seed() {
	await db.sync({ force: true})
	console.log('db synced')
	const url = process.env.SECRET_URL

	//user create


	const users = await Promise.all([
		User.create({
			username: "moe",
			password: "123",
			firstName: "moe",
			lastName:"moe",
			fullName: "moeMoe",
			email: "moe@gmail.com"
		}),
		User.create({
			username: "larry",
			password: "123",
			firstName: "larry",
			lastName: "larry",
			fullName: "larryLarry",
			email: "larry@gmail.com"
		})
	])

  console.log(`seeded ${users.length} users`)

		let products = []

		data.map( async( i )=> {
			products = Product.create({
				name: i.name,
				alliance: i.alliance,
				price: Math.floor(Math.random()*100),
				seat: Math.floor(Math.random()*10),
				logoURL: url + i.logoURL,
				isEditorChoice: Math.random() < 0.1 ? true : false,
			})
		})

		Promise.all([products])
	console.log(`seeded ${products.length} products`);



	return {
		products,
		users: {
      moe: users[0],
      larry: users[1]
    }
	}
}

async function runSeed() {
	console.log('seeding...')
	try {
		await seed()
	} catch (error) {
		console.log(error)
		process.execCode = 1
	} finally {
		console.log("closing db connection")
		await db.close()
		console.log("db connection closed")
	}
}

if(module === require.main) {
	runSeed()
}


module.exports = seed