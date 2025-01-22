"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerDefinition = {
    openapi: '3.0.0', // Specify the OpenAPI version
    info: {
        title: 'REST API Advanced', // The title of your API
        version: '1.0.0', // The current version of your API
        description: 'This is the REST API documentation for the Advanced Web Development course project.',
        contact: {
            name: 'Yam and Coral',
            email: 'your-email@example.com', // Replace with your contact email
        },
    },
    servers: [
        {
            url: 'http://localhost:3001', // Your local development server
            description: 'Local development server',
        },
        {
            url: 'https://your-deployment-url.com', // Optional: Add your production URL
            description: 'Production server',
        },
    ],
};
const swaggerOptions = {
    swaggerDefinition,
    apis: [
        './src/routes/*.ts', // Include route files with Swagger annotations
        './src/controllers/*.ts', // Include controller files if you add annotations there
    ],
};
exports.default = swaggerOptions;
//# sourceMappingURL=swaggerConfig.js.map