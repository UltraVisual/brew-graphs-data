import { Handler, Context, Callback } from 'aws-lambda';
import { ApolloServer, gql } from 'apollo-server-lambda';

import typeDefs from './database/typeDefs'
import Mongo from './database/mongo';

const mongoDb:Mongo = new Mongo();

const resolvers = {
	Query: {
		stats: () => mongoDb.getCollection('stats').then(stats => stats)
	}
}

const apolloServer:ApolloServer = new ApolloServer({
	typeDefs: gql(typeDefs),
	resolvers,
	playground: {
		endpoint: '/dev/'
	}
})

export const insert:Handler = async (event: any, context: Context, callback: Callback):Promise<object> => {
	await mongoDb.insert(JSON.parse(event.body));

	return {
		"statusCode": 200,
		"body": `{ \"result\": \"success\" }`,
		"isBase64Encoded": false
	};
}

export const server = apolloServer.createHandler({ cors: {
	origin: '*',
    credentials: true,
}});
