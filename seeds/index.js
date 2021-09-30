const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')

mongoose.connect('mongodb://127.0.0.1:27017/yelpcamp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connection to database successful')
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const price = Math.floor(Math.random() * 20 ) + 10;
const seedDB = async ( ) => {
    await Campground.deleteMany({});
    for( let i = 0; i < 200 ; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            //YOUR USER ID:
            author: '613f68c9eae55015c2e0afb7',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi debitis explicabo veritatis sit nulla, nesciunt officiis dolores voluptate dolorem adipisci inventore? Sit distinctio assumenda qui, autem fugit cupiditate officia nihil.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/di4jxuvbr/image/upload/v1632428016/YelpCamp/iuhmvwc6xiguqbtatelf.jpg',
                    filename: 'YelpCamp/iuhmvwc6xiguqbtatelf'
                },
                {
                    url: 'https://res.cloudinary.com/di4jxuvbr/image/upload/v1632428017/YelpCamp/smgkvdlhuurtknhaf2gf.jpg',
                    filename: 'YelpCamp/smgkvdlhuurtknhaf2gf'
                }
            ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})