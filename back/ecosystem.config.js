module.exports = {
    apps: [
        {
            name: "[GOLDEN]CLIENT",
            script: "./dist/app.js",
            env: {
                "PORT": 2009,
                "NODE_ENV": "development"
            },
            env_production: {
                "PORT": 2009,
                "NODE_ENV": "production"
            }
        }
    ],
    frontPort: 2008,
    port: 2009,
    pageSize: 30,
    pageLimit: 7,
    version: '0.0.0',
    versionKey: 'version'
}