import { Handler, Context, Callback } from 'aws-lambda';
import { GraphQLServerLambda } from 'graphql-yoga'
import typeDefs from './database/typeDefs'
import Mongo from './database/mongo';
import { IResolvers } from 'graphql-middleware/dist/types';

const mongoDb:Mongo = new Mongo();

const resolvers:IResolvers = {
	Query: {
		stats: () => {
			return new Promise((resolve) => {
				const connected = () => resolve(mongoDb.getCollection('stats'))
				
				mongoDb.connected ? connected() : mongoDb.connect(() => connected());
			});
		} 
	}
}

const lambda = new GraphQLServerLambda({
	typeDefs,
	resolvers
})

export const insert:Handler = (event: any, context: Context, callback: Callback) => {
	console.log(event);

	//mongoDb.insert(data);
}

export const server:Handler = lambda.graphqlHandler;
export const playground:Handler = lambda.playgroundHandler;