"use strict"
require('dotenv').config()


const {db, Product}=require("../server/db")

async function seed() {
	await db.sync({ force: true})
	console.log('db synced')
	const url = process.env.SECRET_URL
	//product create
	const products = await Promise.all([
		Product.create({
		site: "https://www.AA.com",
    alliance: "OW",
    phone: "+1 800 433 7300",
    name: "American Airlines",
    logoURL: url+"rimg/provider-logos/airlines/v/AA.png?crop=false&width=108&height=92&fallback=default2.png&_v=8c6d0e40bdbaad9c51e737b05c12347f",
		price: 34,
		seat: 2,
		isHotDeal: true
		}),

		Product.create({
			site: "https://www.delta.com",
			alliance: "ST",
			phone: "+1 888 750 3284",
			name: "Delta",
			logoURL: url+ "/rimg/provider-logos/airlines/v/DL.png?crop=false&width=108&height=92&fallback=default1.png&_v=02a9af26513d796d51e54147426d15b5",
			price: 109,
			seat: 1,
			isNew: true
		}),

		Product.create({
			site:  "https://www.flyUIA.com",
			alliance: "OW",
			phone: "+38 (044) 581-50-50",
			name: "Ukraine International Airlines",
    	logoURL: url + "/rimg/provider-logos/airlines/v/PS.png?crop=false&width=108&height=92&fallback=default2.png&_v=d9d949b58188e00fcfa02d4139ecbc2e",
			price: 89,
			seat: 0,
			isEditorChoice: true
		}),

		

		Product.create({
			site: "https://www.anawings.co.jp",
			alliance: "OW",
			phone: "+81 3 5757 4200",
			name: "ANA",
			logoURL: url + "/rimg/provider-logos/airlines/v/EH.png?crop=false&width=108&height=92&fallback=default1.png&_v=62b4b9a45bf8b49cc47ef65707139fdf",
			price: 33,
			seat: 3
		}),

		Product.create({
			site: "https://www.emirates.com",
			alliance: "OW",
			phone: "+971 600 555 555",
			name: "Emirates",
			logoURL: url + "/rimg/provider-logos/airlines/v/EK.png?crop=false&width=108&height=92&fallback=default1.png&_v=c871d68692a355e7e426e7a7a41976ce",
			price: 37,
			seat: 1,
			isNew: true,
		}),

		Product.create({
			site: "https://www.lufthansa.com",
			alliance: "SA",
			phone: "+49 69 86 799 799",
			name: "Lufthansa",
			logoURL: url + "/rimg/provider-logos/airlines/v/LH.png?crop=false&width=108&height=92&fallback=default2.png&_v=a1e3a69579474969d2b123789717863f",
			price: 55,
			seat: 1,
		}),

		Product.create({
			site: "https://www.singaporeair.com",
			alliance: "SA",
			phone: "+65 6223 8888",
			name: "Singapore Airlines",
			logoURL: url + "/rimg/provider-logos/airlines/v/SQ.png?crop=false&width=108&height=92&fallback=default3.png&_v=0ff33e55a8f21c7c3192f0394e8dfdb2", 
			price: 87,
			seat: 2,
		}),

		Product.create({
			site: "https://www.aerolineas.com.ar",
			alliance: "ST",
			phone: "810 222 86527",
			name: "Aerolineas Argentinas",
			logoURL: url + "/rimg/provider-logos/airlines/v/AR.png?crop=false&width=108&height=92&fallback=default1.png&_v=ec517c04705c3ea6ef338fffe497c2d6",
			price: 55,
			seat: 1,
			isNew: true
		}),

		Product.create({
			site: "https://www.eastafrican.com",
			alliance: "OW",
			phone: "+254 (0) 725 305 305",
			name: "EastAfrican",
			logoURL: url + "/rimg/provider-logos/airlines/v/B5.png?crop=false&width=108&height=92&fallback=default3.png&_v=55e22eb39847bca8f1ee0e332e1cf501",
			price: 45,
			seat: 0,
		}),

		Product.create({
			site: "https://www.airfrance.com",
			alliance: "ST",
			phone: "1-800-237-2747",
			name: "Air France",
			logoURL: url + "/rimg/provider-logos/airlines/v/AF.png?crop=false&width=108&height=92&fallback=default1.png&_v=48aae6bb98d8c51316f5918500ed39b2",
			price: 35,
			seat: 2,
		}),
		
		Product.create({
			site: "https://www.airindia.in",
			alliance: "SA",
			phone: "+91 22 27067001",
			name: "Air India",
			logoURL: url + "/rimg/provider-logos/airlines/v/9I.png?crop=false&width=108&height=92&fallback=default2.png&_v=18d6ba2bd1a6b89120361f37345483d6",
			price: 56,
			seat: 1,
			isEditorChoice: true
		}),

		Product.create({
			site: "https://www.aeromexico.com",
			alliance: "ST",
			phone: "+52 (55) 5133 4000",
			name: "Aeromexico",
			logoURL: url + "/rimg/provider-logos/airlines/v/5D.png?crop=false&width=108&height=92&fallback=default2.png&_v=464f5e152230e4cf0a7fb61cda270c4c",
			price: 40,
			seat: 1,
			isHotDeal: true
		})

	])

	console.log(`seeded ${products.length} products`);

	

	return {
		products
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
	run.seed()
}


module.exports = seed