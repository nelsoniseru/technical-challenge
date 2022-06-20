module.exports = {
    openapi: '3.0.0',
    info: {
        title: 'Adidas newsletter subscription project',
        version: '1.0.0',
        description:
            'building a newsletter subscription api',
        license: {
            name: 'MIT',
            url: 'https://choosealicense.com/licenses/mit/'
        },
        contact: {
            name: process.env.PROJECT_OWNER,
            email: process.env.PROJECT_OWNER_EMAIL
        }
    },
    servers: [
        {
            url: `http://localhost:3000`,
            description: 'Server'
        }
    ]
};
