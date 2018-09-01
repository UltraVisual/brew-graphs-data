import { Field, ObjectType, Int, Float } from 'type-graphql';

@ObjectType({ description: 'Object to hold stat data' })
export class Stat {
    @Field( type => Float )
    timeStamp:number;

    @Field( type => Int )
    _id:number;

    @Field()
    name:string;

    @Field()
    ID:string

    @Field()
    token:string

    @Field( type => Float )
    angle:number;

    @Field( type => Float )
    temperature:number;

    @Field( type => Float )
    battery:number;

    @Field( type => Float )
    gravity:number;

    @Field( type => Int )
    interval:number;

    @Field()
    RSSI:number;
}
