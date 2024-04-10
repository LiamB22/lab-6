const {app} = require('@azure/functions');
const fs = require('fs/promises');
const path = require('path');

app.http('addCars', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const new_car = await request.json();
        const cars = await fs.readFile(path.resolve(__dirname, 'cars.json'));
        const info = JSON.parse(cars);
        info.push(new_car);
        await fs.writeFile(path.resolve(__dirname, 'cars.json'), JSON.stringify(info, null, 2));
        return {
            body: JSON.stringify(info)
        };
    }
});