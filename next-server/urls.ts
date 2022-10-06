const env = process.env.NODE_ENV

const isProduction = env === 'production'

const url = {
    api: isProduction ? 'api:5002' : 'localhost:5002',
    kafka: isProduction ? 'kafka:9092' : 'localhost:9092',
}

export default url
