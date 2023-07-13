const { getObjectId } = require('mongo-seeding')

module.exports = [
    {
        _id: getObjectId('Cheese'),
        topping: 'Cheese',
        description: 'Cheese Pizza',
    },
    {
        _id: getObjectId('Tomato'),
        topping: 'Tomato',
        description: 'Tomato Pizza',
    },
    {
        _id: getObjectId('Taco'),
        topping: 'Taco',
        description: 'Tomato Pizza',
    },
]
