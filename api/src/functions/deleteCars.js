const {app} = require('@azure/functions');
const fs = require('fs/promises');
const path = require('path');

app.http('deleteCars', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    route: 'deleteCars/{ID}',
    handler: async (request, context) => {
        const car_idx = request.params.ID;
        const cars = await fs.readFile(path.resolve(__dirname, 'cars.json'));
        const info = JSON.parse(cars);

        if (car_idx == -1) {
            context.error(404, 'Not Found');
        }
        else {
            info.splice(car_idx, 1);
            await fs.writeFile(path.resolve(__dirname, 'cars.json'), JSON.stringify(info, null, 2));
            return {
                body: JSON.stringify(info)
            };
        }
    }
});