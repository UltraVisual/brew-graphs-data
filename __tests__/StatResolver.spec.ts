import mockData from './fixtures/mockData';
import StatResolver from '../src/database/StatResolver';
import Mongo from '../src/database/mongo';

let mockDb = jest.fn();

console.log(mockData)

describe('Given a StatResolver', () => {
	let testObject = new StatResolver(mockDb as Mongo);

	describe('when a stats query is run', () => {
		before(() => {
			mockDb.getCollection.mockResolvedValue(new Promise((resolve) => {
				resolve(mockData);
			}))
		});

		it('should return', () => {
			console.log(testObject.stats())
		});
	});
});