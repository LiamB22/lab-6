const {app} = require('@azure/functions');
const fs = require('fs/promises');
const path = require('path');

app.http('fetchCars', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const cars = await fs.readFile(path.resolve(__dirname, 'cars.json'));
        const info = JSON.parse(cars);
        return {
            body: JSON.stringify(info)
        };
    }
});