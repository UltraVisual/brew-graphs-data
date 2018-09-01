import { Handler, Context, Callback } from 'aws-lambda';
import { ApolloServer, gql } from 'apollo-server-lambda';

import typeDefs from './database/typeDefs'
import Mongo from './database/mongo';

const mongoDb:Mongo = new Mongo();

const buildResponse = (code:number, message:string) => {
	return {
		"statusCode": code,
		"body": `{ \"result\": \"${ message }\" }`,
		"isBase64Encoded": false
	}
}

const resolvers = {
	Query: {
		stats: () => mongoDb.getCollection('stats').then(stats => stats)
	}
}

const apolloServer = new ApolloServer({
	typeDefs: gql(typeDefs),
	resolvers,
	playground: {
		endpoint: '/dev/'
	}
})

export const insert:Handler = async (event: any, context: Context, callback: Callback) => {
	await mongoDb.insert(JSON.parse(event.body));

	return buildResponse(200, "success");
}

export const server = apolloServer.createHandler();
