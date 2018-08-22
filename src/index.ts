import { GraphQLServer } from 'graphql-yoga'
import { MongoClient, ObjectId } from 'mongodb'
import * as bodyParser from 'body-parser'
import chalk from 'chalk'

import typeDefs from './database/typeDefs'

const { log } = console;

const MONGO_URL = 'mongodb://shane:password@localhost:27017?authSource=admin'

const resolvers = {
	Query: {
		stats: async () => await database.collection('stats').find({}).toArray()
	}
}

const options = {
	port: 4000,
	endpoint: '/graphql',
	subscriptions: '/subscriptions',
	playground: '/playground',
}

const server = new GraphQLServer({
	typeDefs,
	resolvers
})

const ready = (db) => {
	database = db

	log(chalk.green("Connected successfully to mongo server"))

	server.express.use(bodyParser.json())

	server.express.post('/data', (req, res) => {
		const collection = db.collection('stats');
		const data = req.body

		data.timeStamp = Date.now()

		collection.insertOne(data);
		res.send('success');
	});
	
	server.start(options, () => log(chalk.blue(`Server is running on http://localhost:${ options.port }`)))
}

const dbConnectionSuccess = (err, client) => {
	if (err) {
		throw new Error(err)
	} 

	ready(client.db('brew-data'))
}

let database;

MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, dbConnectionSuccess)