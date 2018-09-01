import Mongo from './mongo';
import { Stat } from './model/Stat';
import { Query } from 'type-graphql';
import { Resolver } from 'type-graphql';

let fromArray = (input:Array<any>):Array<Stat> => {
    let output:Array<Stat> = [];

    input.forEach((stat:Stat) => {
        output.push(stat)
    });

    return output;
}

@Resolver()
export default class StatResolver {
    public constructor(private _db:Mongo) {}

    @Query( returns => Array)
    async stats(): Promise<Array<Stat>> {
        return await this._db.getCollection('stats').then(fromArray);
    }
}