import { MongoClient, Db } from 'mongodb'
import chalk from 'chalk'

const { log } = console;
const MONGO_URL = 'mongodb://54.164.175.104:27017'

class Mongo {
	private _database:Db;
	private _client:MongoClient;

	public get connected() :Boolean {
		return this._client && this._client.isConnected();
	}

	public connect(cb:Function = () => {}):void {
		MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err:any, client:MongoClient) => {
			if (err) throw new Error(err);
	
			log(chalk.green('Mongo database connection successful'));
			
			this._client = client;
			this._database = this._client.db('brew-data');

			cb();
		})
	}

	public getCollection(collection:string):Promise<Array<string>> {
		return this._database.collection(collection).find({}).toArray();
	}

	public insert(data:any):void {
		const collection = this._database.collection('stats');

		data.timeStamp = Date.now();

		collection.insertOne(data);
	}
}

export default Mongo;
