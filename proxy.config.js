const proxy = [
    {
        context: '/api',
        target: 'http://localhost:3000/',
    }
];
module.exports = proxy;