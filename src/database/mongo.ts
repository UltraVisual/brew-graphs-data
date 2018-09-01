import { MongoClient, Db } from 'mongodb'
import chalk from 'chalk'

const { log } = console;
const MONGO_URL = 'mongodb://54.164.175.104:27017'

class Mongo {
	private _database:Db;
	private _client:MongoClient;

	public get connected() :Boolean {
		return Boolean(this._client) && this._client.isConnected();
	}

	public connect():Promise<void> {
		return new Promise((resolve) => {
			MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err:any, client:MongoClient) => {
				if (err) throw new Error(err);

				log(chalk.green('Mongo database connection successful'));
				
				this._client = client;
				this._database = this._client.db('brew-data');

				resolve()
			})
		});
	}

	public async getCollection(collection:string):Promise<Array<any>> {
		await this.connect();

		const data = await this._database.collection(collection).find({}).toArray();

		console.log('Data returned:', data);

		return data;
	}

	public async insert(data:any):Promise<string> {
		await this.connect();

		const collection = this._database.collection('stats');

		data.timeStamp = Date.now();

		await collection.insertOne(data)

		return 'success'
	}
}

export default Mongo;
