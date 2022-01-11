// // GOLD
// module.exports = {
//     apps: [
//         {
//             name: "[GOLDEN]CLIENT",
//             script: "./dist/app.js",
//             env: {
//                 "PORT": 2009,
//                 "NODE_ENV": "development"
//             },
//             env_production: {
//                 "PORT": 2009,
//                 "NODE_ENV": "production"
//             }
//         }
//     ],
//     frontPort: 2008,
//     port: 2009,
//     pageSize: 30,
//     pageLimit: 7,
//     version: '0.0.0',
//     versionKey: 'version'
// }

// META
module.exports = {
    apps: [
        {
            name: "[META]CLIENT",
            script: "./dist/app.js",
            env: {
                "PORT": 2011,
                "NODE_ENV": "development"
            },
            env_production: {
                "PORT": 2011,
                "NODE_ENV": "production"
            }
        }
    ],
    frontPort: 2010,
    port: 2011,
    pageSize: 30,
    pageLimit: 7,
    version: '0.0.0',
    versionKey: 'version'
}

// // THREE
// module.exports = {
//     apps: [
//         {
//             name: "[THREE]CLIENT",
//             script: "./dist/app.js",
//             env: {
//                 "PORT": 2013,
//                 "NODE_ENV": "development"
//             },
//             env_production: {
//                 "PORT": 2013,
//                 "NODE_ENV": "production"
//             }
//         }
//     ],
//     frontPort: 2012,
//     port: 2013,
//     pageSize: 30,
//     pageLimit: 7,
//     version: '0.0.0',
//     versionKey: 'version'
// }
