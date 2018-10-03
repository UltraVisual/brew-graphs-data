export default `
    type Query {
        stats: [Stat]
    },
    type Stat {
        name: String,
        _id: String,
        ID: Float,
        token: String,
        angle: Float,
        temperature: Float,
        battery: Float,
        gravity: Float,
        interval: Float,
        RSSI: Float,
        timeStamp: Float
    }
`