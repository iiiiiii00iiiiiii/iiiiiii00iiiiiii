"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// // GOLD
// const config: TConfig = {
//     db: {
//         host: '18.183.255.153',
//         port: 36183,
//         name: 'gold',
//         id: 'gold',
//         password: 'Qufdl@4860'
//     },
//     casino: {
//         apiURL: '',
//         operator: '',
//         privateKey: ''
//     },
//     // transactionOptions: {
//     //     readPreference: 'primary',
//     //     readConcern: { level: 'local' },
//     //     writeConcern: { w: 'majority' }
//     // },
//     jwtSecret: 'To!@#$%^&*()0987654321Esta365!To',
//     expiresIn: 60 * 60 * 1,
//     pageSize: 30,
//     sportPageSize: 30,
//     sportsMaxRate: 100,
//     powerballTime: 30,
//     powerladderTime: 50,
//     kenoladderTime: 50,
//     boglePowerballTime: 30,
//     bogleladderTime: 30,
//     googlePowerball1: 15,
//     googlePowerball3: 30,
//     kplay: {
//         code: '',
//         token: '',
//         key: '',
//         endpoint: 'http://kplayone.com'
//     },
//     displaySportCross: []
// }
// // META
// const config: TConfig = {
//     db: {
//         host: '18.183.255.153',
//         port: 36183,
//         name: 'meta',
//         id: 'meta',
//         password: 'Qufdl@4860'
//     },
//     casino: {
//         apiURL: '',
//         operator: '',
//         privateKey: ''
//     },
//     jwtSecret: 'To!@#$%^&*()0987654321Esta365!To',
//     expiresIn: 60 * 60 * 1,
//     pageSize: 30,
//     sportPageSize: 30,
//     sportsMaxRate: 100,
//     powerballTime: 30,
//     powerladderTime: 50,
//     kenoladderTime: 50,
//     boglePowerballTime: 30,
//     bogleladderTime: 30,
//     googlePowerball1: 15,
//     googlePowerball3: 30,
//     kplay: {
//         code: 'SFT0002',
//         token: 'imWlwA8BvfhZpCmas6x42Ow0itUGIV7j',
//         key: 'Jgl6qopQoaDUD0HUq9YyiIdLif7tDR0i',
//         endpoint: 'http://kplayone.com'
//         // http://api.kplay.jmt.soft24.io/api
//     },
//     canCancelBetTime: 10,
//     canCancelBetBeforeGameTime: 10,
//     canCancelBetCount: 5,
//     displaySportCross: []
// }
// // THREE
// const config: TConfig = {
//     db: {
//         host: '18.183.255.153',
//         port: 36183,
//         name: 'three',
//         id: 'three',
//         password: 'Qufdl@4860'
//     },
//     casino: {
//         apiURL: '',
//         operator: '',
//         privateKey: ''
//     },
//     jwtSecret: 'To!@#$%^&*()0987654321Esta365!To',
//     expiresIn: 60 * 60 * 1,
//     pageSize: 30,
//     sportPageSize: 30,
//     sportsMaxRate: 100,
//     powerballTime: 30,
//     powerladderTime: 30,
//     kenoladderTime: 30,
//     boglePowerballTime: 30,
//     bogleladderTime: 30,
//     googlePowerball1: 15,
//     googlePowerball3: 30,
//     kplay: {
//         code: 'SFT0005',
//         token: 'A42UoW2OXZl6H7kylAe42sF03Td6t3xE',
//         key: 'Nvxh3fYlRRdyw3X50I2Db5UsohBDC6Xx',
//         endpoint: 'http://kplayone.com'
//         // http://api.kplay.jmt.soft24.io/api
//     },
//     canCancelBetTime: 10,
//     canCancelBetBeforeGameTime: 10,
//     canCancelBetCount: 10,
//     displaySportCross: []
// }
// // DEMARK
// const config: TConfig = {
//     db: {
//         host: '18.183.255.153',
//         port: 36183,
//         name: 'demark',
//         id: 'demark',
//         password: 'Qufdl@4860'
//     },
//     casino: {
//         apiURL: '',
//         operator: '',
//         privateKey: ''
//     },
//     jwtSecret: 'To!@#$%^&*()0987654321Esta365!To',
//     expiresIn: 60 * 60 * 1,
//     pageSize: 30,
//     sportPageSize: 30,
//     sportsMaxRate: 100,
//     powerballTime: 30,
//     powerladderTime: 30,
//     kenoladderTime: 30,
//     boglePowerballTime: 30,
//     bogleladderTime: 30,
//     googlePowerball1: 15,
//     googlePowerball3: 30,
//     kplay: {
//         code: 'SFT0003',
//         token: 'BkqULUffEMm1Zlk3zvCQC1DQ1f25fulo',
//         key: 'SZKZdEvi6kOCSM3p3HRTYJ86lcNRuI3t',
//         endpoint: 'http://kplayone.com'
//         // http://api.kplay.jmk.soft24.io/api
//     },
//     canCancelBetTime: 10,
//     canCancelBetBeforeGameTime: 10,
//     canCancelBetCount: 2,
//     displaySportCross: []
// }
// // MCLAREN
// const config: TConfig = {
//     db: {
//         host: '18.183.255.153',
//         port: 36183,
//         name: 'mclaren',
//         id: 'mclaren',
//         password: 'Qufdl@4860'
//     },
//     casino: {
//         apiURL: '',
//         operator: '',
//         privateKey: ''
//     },
//     jwtSecret: 'To!@#$%^&*()0987654321Esta365!To',
//     expiresIn: 60 * 60 * 3,
//     pageSize: 30,
//     sportPageSize: 30,
//     sportsMaxRate: 100,
//     powerballTime: 30,
//     powerladderTime: 50,
//     kenoladderTime: 50,
//     boglePowerballTime: 30,
//     bogleladderTime: 30,
//     googlePowerball1: 15,
//     googlePowerball3: 30,
//     kplay: {
//         code: '',
//         token: '',
//         key: '',
//         endpoint: 'http://kplayone.com'
//         // http://api.kplay.jmt.soft24.io/api
//     },
//     canCancelBetTime: 10,
//     canCancelBetBeforeGameTime: 10,
//     canCancelBetCount: 10,
//     displaySportCross: []
// }
// // BACKNUM
// const config: TConfig = {
//     db: {
//         host: '18.183.255.153',
//         port: 36183,
//         name: 'backnum',
//         id: 'backnum',
//         password: 'Qufdl@4860'
//     },
//     casino: {
//         apiURL: '',
//         operator: '',
//         privateKey: ''
//     },
//     jwtSecret: 'To!@#$%^&*()0987654321Esta365!To',
//     expiresIn: 60 * 60 * 1,
//     pageSize: 30,
//     sportPageSize: 30,
//     sportsMaxRate: 100,
//     powerballTime: 30,
//     powerladderTime: 50,
//     kenoladderTime: 50,
//     boglePowerballTime: 30,
//     bogleladderTime: 30,
//     googlePowerball1: 15,
//     googlePowerball3: 30,
//     kplay: {
//         code: '',
//         token: '',
//         key: '',
//         endpoint: 'http://kplayone.com'
//         // http://api.kplay.jmt.soft24.io/api
//     },
//     canCancelBetTime: 10,
//     canCancelBetBeforeGameTime: 10,
//     canCancelBetCount: 5,
//     displaySportCross: []
// }
// // NAPOLI
// const config: TConfig = {
//     db: {
//         host: '18.181.237.109',
//         port: 36186,
//         name: 'napoli',
//         id: 'napoli',
//         password: 'Napoli@4860'
//     },
//     casino: {
//         apiURL: '',
//         operator: '',
//         privateKey: ''
//     },
//     jwtSecret: 'To!@#$%^&*()0987654321Esta365!To',
//     expiresIn: 60 * 60 * 1,
//     pageSize: 30,
//     sportPageSize: 30,
//     sportsMaxRate: 100,
//     powerballTime: 30,
//     powerladderTime: 30,
//     kenoladderTime: 30,
//     boglePowerballTime: 30,
//     bogleladderTime: 30,
//     googlePowerball1: 15,
//     googlePowerball3: 30,
//     kplay: {
//         code: 'SFT0006',
//         token: 'IoySI0OF2khy92YQeL2u3gIciy2khz5t',
//         key: 'Z7STpvXQWxAxriKQ0UHDwHvQcf32a5zd',
//         endpoint: 'http://kplayone.com'
//         // http://api.kplay.jmk.soft24.io/api
//     },
//     canCancelBetTime: 10,
//     canCancelBetBeforeGameTime: 10,
//     canCancelBetCount: 2,
//     displaySportCross: [
//         new ObjectId("6251e75e5c36e2897e0081e5"),
//         new ObjectId("613e891a9d4d2939f4345560"),
//         new ObjectId("624e19e79ba8c121bd54867b"),
//         new ObjectId("60d063709d4d2939f43420cd"),
//         new ObjectId("60d30b469d4d2939f4342174"),
//         new ObjectId("624f641699a49274b2828b54"),
//         new ObjectId("624e12d89ba8c121bd548676"),
//         new ObjectId("624f641699a49274b2828b53"),
//         new ObjectId("60d4edee9d4d2939f43421e1"),
//         new ObjectId("60d652609d4d2939f434224d"),
//         new ObjectId("60d1f1e49d4d2939f434212b"),
//         new ObjectId("6225c4570200300405450f19"),
//         new ObjectId("6125b2809d4d2939f4344903"),
//         new ObjectId("60d198eb9d4d2939f434211c"),
//         new ObjectId("611c75929d4d2939f4344404"),
//         new ObjectId("6251cf69b5181d27bb122659"),
//         new ObjectId("5f6dbfb723f8242b7b1c7a3a"),
//         new ObjectId("5f637a19d92cfc6ce06ef5d0"),
//         new ObjectId("624e0d64d16bde450b24cfed"),
//         new ObjectId("5f5e355dd9b11e6031fd479b"),
//         new ObjectId("60d0647fa683845ce44edee5"),
//         new ObjectId("60d325f8a683845ce44ee319"),
//         new ObjectId("624f1c46c842b6037f909476"),
//         new ObjectId("5f5e355ed9b11e6031fd479c"),
//         new ObjectId("60772b9cb0866c3d35d579e6"),
//         new ObjectId("6075aaf6a8bd84691f8c90b2"),
//         new ObjectId("6075dc5d98789a365bcb7b3b"),
//         new ObjectId("6075b1fea8bd84691f8c90e9"),
//         new ObjectId("60d49140a683845ce44ee505"),
//         new ObjectId("60d5e2c1a683845ce44ee840"),
//         new ObjectId("606c7e2dfdd561237e0240b6"),
//         new ObjectId("6226b07bed39876c404c64f2"),
//         new ObjectId("5f882c2b23f8242b7b1c878a"),
//         new ObjectId("60a65db4ee207252587a1ecd"),
//         new ObjectId("609d537cdae6c8666a8bb454"),
//         new ObjectId("5f6ddd4e23f8242b7b1c7a5d"),
//         new ObjectId("609d5123dae6c8666a8bb44f"),
//         new ObjectId("5f6ddd5923f8242b7b1c7a5e"),
//         new ObjectId("60d1b600a683845ce44ee062"),
//         new ObjectId("611be88af0ec516d1accb780"),
//         new ObjectId("60a6984bee207252587a1f62"),
//         new ObjectId("60038f18bc038759edfb18ab"),
//         new ObjectId("60023d98bc038759edfb1121"),
//         new ObjectId("5fb5bb459223872c958d04cc"),
//         new ObjectId("60021368bc038759edfb10f0"),
//         new ObjectId("5fc011489223872c958d094f"),
//         new ObjectId("600348c8bc038759edfb17fd"),
//         new ObjectId("5fe84015cb671f319e647168"),
//         new ObjectId("5f5a55e167fb22444c8b4a2a"),
//         new ObjectId("5f5a55e167fb22444c8b4a2b"),
//         new ObjectId("5f47e7b5b4e1811a747f686a"),
//         new ObjectId("5f480053b4e1811a747f692b"),
//         new ObjectId("5f47f5c3b4e1811a747f68f6"),
//         new ObjectId("5f53c4e403adac799399045b"),
//         new ObjectId("5f4760fd2696f30d7872d655"),
//         new ObjectId("5f49576503422118d8a27cc4"),
//         new ObjectId("5f48318bb4e1811a747f699f"),
//         new ObjectId("5f47d624b4e1811a747f67b8"),
//         new ObjectId("608edfb991c0cf445a71d60f"),
//         new ObjectId("5f8dfa0823f8242b7b1c8b3b"),
//         new ObjectId("5f6385cad92cfc6ce06ef5fb"),
//         new ObjectId("5f92c815a406c830e0da57a8"),
//         new ObjectId("5f5b98e167fb22444c8b50c9"),
//         new ObjectId("5f5b9ba167fb22444c8b50ef"),
//         new ObjectId("5f5b98d967fb22444c8b50c8"),
//         new ObjectId("5fb250f99223872c958d03b9"),
//         new ObjectId("5fb620319223872c958d04d7"),
//         new ObjectId("5f88100923f8242b7b1c8775"),
//         new ObjectId("5f8807d323f8242b7b1c876f"),
//         new ObjectId("5f48d76eb4e1811a747f6eb3"),
//         new ObjectId("5f4760e82696f30d7872d601"),
//         new ObjectId("5f7dfb0a23f8242b7b1c8376"),
//         new ObjectId("601aac7b4360b57f1a8f71b8"),
//         new ObjectId("601eafb316e22f19331cd993"),
//         new ObjectId("5fbc3645021de046373b2688"),
//         new ObjectId("5f5febd9dfca3302aa3cef6a"),
//         new ObjectId("60344ed074df2b206ec40f2f"),
//         new ObjectId("5f5fa32ddfca3302aa3ceed9"),
//         new ObjectId("5f8dc58123f8242b7b1c8b02"),
//         new ObjectId("5f4760eb2696f30d7872d628"),
//         new ObjectId("5f90688064f02333c6d93509"),
//         new ObjectId("5f6b9c4123f8242b7b1c792b"),
//         new ObjectId("5f6b9c81d92cfc6ce06f115a"),
//         new ObjectId("5f6a827f23f8242b7b1c7897"),
//         new ObjectId("5f5c053967fb22444c8b5337"),
//         new ObjectId("5fbee2f99223872c958d090e"),
//         new ObjectId("5fd9577aeca24a75ee7dbbb8"),
//         new ObjectId("5f56d2677373081775791c77"),
//         new ObjectId("5f5abf6767fb22444c8b4b49"),
//         new ObjectId("5f629917d92cfc6ce06ef4ce"),
//         new ObjectId("5fb849719223872c958d0634"),
//         new ObjectId("5f47f5c3b4e1811a747f68f5"),
//         new ObjectId("5f565ad17373081775791baf"),
//         new ObjectId("60ad9de29d4d2939f434174b"),
//         new ObjectId("5f47d29fb4e1811a747f6792"),
//         new ObjectId("6037e0b93a9dcb0f091c2e95"),
//         new ObjectId("5f60e6b3dfca3302aa3cf13c"),
//         new ObjectId("5f98ad19c2371361aace11b9"),
//         new ObjectId("5f47d9a5b4e1811a747f67d2"),
//         new ObjectId("5f5db6ed778a46530dae299f"),
//         new ObjectId("60f99ef1b69c834af29fb314"),
//         new ObjectId("5f48c8e5b4e1811a747f6d6d"),
//         new ObjectId("5f59727a67fb22444c8b472a"),
//         new ObjectId("5f4d11893e02ab025cd71c30"),
//         new ObjectId("5f5a5cee67fb22444c8b4a43"),
//         new ObjectId("606892632dfb3554ecc9f6de"),
//         new ObjectId("60afd07a1387c11917282755"),
//         new ObjectId("5f4760eb2696f30d7872d62b"),
//         new ObjectId("5f5a746367fb22444c8b4adb"),
//         new ObjectId("60a14ff2ee207252587a1664"),
//         new ObjectId("5f49247203422118d8a27a83"),
//         new ObjectId("5fce67bdfe8013459ec22ed0"),
//         new ObjectId("5f4d269f3e02ab025cd71cf3"),
//         new ObjectId("5fa456757dc02938dfd677a9"),
//         new ObjectId("5f67aa4fd92cfc6ce06f0904"),
//         new ObjectId("613662ffcae2a95b214d5382"),
//         new ObjectId("5f77460d23f8242b7b1c8005"),
//         new ObjectId("6148d8659d4d2939f4345bbb"),
//         new ObjectId("5f84e1bc23f8242b7b1c8680"),
//         new ObjectId("615b5aa589cd3c02ed1a41d2"),
//         new ObjectId("5f92e436a406c830e0da58f2"),
//         new ObjectId("616dc0e19788834df6bca40f"),
//         new ObjectId("5f4c211fa597461b24fbc8eb"),
//         new ObjectId("61118c029d4d2939f4343dc5"),
//         new ObjectId("5f5cab6449a037476d256714"),
//         new ObjectId("61241acf9d4d2939f4344850"),
//         new ObjectId("5f5b847d67fb22444c8b4ef0"),
//         new ObjectId("60a2a1689d4d2939f43412a8"),
//         new ObjectId("5f5b847a67fb22444c8b4eee"),
//         new ObjectId("60a2c22c9d4d2939f43412b4"),
//         new ObjectId("5f490f95b4e1811a747f7140"),
//         new ObjectId("5f5b613b67fb22444c8b4da3"),
//         new ObjectId("5f770a8e5dbf920fd5a186b2"),
//         new ObjectId("6210458e02003004054504d4"),
//         new ObjectId("6014334b74df2b206ec401d3"),
//         new ObjectId("5f490f94b4e1811a747f713e"),
//         new ObjectId("615715889d4d2939f434644e"),
//         new ObjectId("5f4901e3b4e1811a747f70b2"),
//         new ObjectId("614dbe70bf27643accc9f3ca"),
//         new ObjectId("5f781ba523f8242b7b1c8116"),
//         new ObjectId("5f4803d5b4e1811a747f6937"),
//         new ObjectId("5f4901e4b4e1811a747f70b3"),
//         new ObjectId("5f47f5c3b4e1811a747f68f4"),
//         new ObjectId("5ffdfff1ad493b37019c46bd"),
//         new ObjectId("5f6385d2d92cfc6ce06ef5fc"),
//         new ObjectId("5f63ab58d92cfc6ce06ef6e0"),
//         new ObjectId("5f638f33d92cfc6ce06ef62e"),
//         new ObjectId("5f5a746367fb22444c8b4ada"),
//         new ObjectId("5f737de323f8242b7b1c7ded"),
//         new ObjectId("611aaf179d4d2939f43442f5"),
//         new ObjectId("5f9895a0c2371361aace119a"),
//         new ObjectId("5f493b9703422118d8a27bc9"),
//         new ObjectId("6001eb8ebc038759edfb0ff1"),
//         new ObjectId("6054a4da5c1fc77b1b702620"),
//         new ObjectId("5fb67ab51e3b32494a84fb2b"),
//         new ObjectId("5fb3a4899223872c958d041e"),
//         new ObjectId("61ec2b814a7e810a9d2d9c54"),
//         new ObjectId("61d9b51327e2b819b3f338f0"),
//         new ObjectId("5f7e418823f8242b7b1c8396"),
//         new ObjectId("5f7de64e23f8242b7b1c836d"),
//         new ObjectId("60d70560a683845ce44eec43"),
//         new ObjectId("60c261b9845c2f713250cb60"),
//         new ObjectId("5f4fe8bd3e02ab025cd72f1d"),
//         new ObjectId("5f4fe8be3e02ab025cd72f1e"),
//         new ObjectId("5f4fe8be3e02ab025cd72f1f"),
//         new ObjectId("5f4fc5f23e02ab025cd72e52"),
//         new ObjectId("5fdcc115374a815a009b25ed"),
//         new ObjectId("613549d29d4d2939f434502d"),
//         new ObjectId("5fa3f8b47dc02938dfd67660"),
//         new ObjectId("5f4760f52696f30d7872d64b"),
//         new ObjectId("611c0bb2f0ec516d1accb86c"),
//         new ObjectId("610ab463b69c834af29fd903"),
//         new ObjectId("5f492b1e03422118d8a27b1c"),
//         new ObjectId("60673e353566536ba628d1e4"),
//         new ObjectId("5f689e12d92cfc6ce06f09c5"),
//         new ObjectId("610d6c7cb69c834af29fe02a"),
//         new ObjectId("5f64c7a77670b52ae55461ab"),
//         new ObjectId("5f6cb0ef23f8242b7b1c798a"),
//         new ObjectId("609bfd4bdae6c8666a8bb233"),
//         new ObjectId("60073ad084f9bf6e239ed354"),
//         new ObjectId("61dde2ec237d4733d90c0604"),
//         new ObjectId("5f48c8e4b4e1811a747f6d6c"),
//         new ObjectId("5f48c8e3b4e1811a747f6d6a"),
//         new ObjectId("5f4e1bdb3e02ab025cd722b3"),
//         new ObjectId("603caf3d4d741252559b3434"),
//         new ObjectId("602f40e83a9dcb0f091c1067"),
//         new ObjectId("6205e8520200300405450028"),
//         new ObjectId("5f69dcddd92cfc6ce06f0c23"),
//         new ObjectId("5f48c8e3b4e1811a747f6d6b"),
//         new ObjectId("5f6eeee123f8242b7b1c7ba5"),
//         new ObjectId("5f48d76cb4e1811a747f6eb2"),
//         new ObjectId("5fbcda54021de046373b270c"),
//         new ObjectId("5f4a7cf9a5db4f10d8461289"),
//         new ObjectId("60214076bb9d77726661eaee"),
//         new ObjectId("5f8fc04da406c830e0da51cb"),
//         new ObjectId("5fa333d47dc02938dfd67591"),
//         new ObjectId("5f485130b4e1811a747f69e5"),
//         new ObjectId("5f95b9bdc6c96857a622d18d"),
//         new ObjectId("5f4927af03422118d8a27b04"),
//         new ObjectId("5f7b600d5dbf920fd5a199e5"),
//         new ObjectId("5f47e433b4e1811a747f684c"),
//         new ObjectId("5f5baacf67fb22444c8b51c5"),
//         new ObjectId("60a3f09d9d4d2939f434131f"),
//         new ObjectId("5ff8f05bcb671f319e647686"),
//         new ObjectId("5f8899d35dbf920fd5a1bd12"),
//         new ObjectId("608c0dda91c0cf445a71c976"),
//         new ObjectId("60b589519d4d2939f4341a1a"),
//         new ObjectId("5f4760fd2696f30d7872d653"),
//         new ObjectId("5f4e545f3e02ab025cd7246a"),
//         new ObjectId("61095bd9b69c834af29fd64b"),
//         new ObjectId("5f47d9a6b4e1811a747f67d4"),
//         new ObjectId("5f47cb95b4e1811a747f6731"),
//         new ObjectId("60c8cf3ee5cbcd779e2611ab"),
//         new ObjectId("5f7f59505dbf920fd5a1a319"),
//         new ObjectId("5f6e043623f8242b7b1c7aab"),
//         new ObjectId("5fd78d099223872c958d14fb"),
//         new ObjectId("6148df6e824c9d5c5b2d7ee7"),
//         new ObjectId("5f63a44fd92cfc6ce06ef69a"),
//         new ObjectId("5f59bd7b67fb22444c8b4865"),
//         new ObjectId("602d4b53fdfb580700a1b26c"),
//         new ObjectId("5f9ada3bc6c96857a622db45"),
//         new ObjectId("61e03ba1b893fd68ebd4418c"),
//         new ObjectId("5f48a70ab4e1811a747f6c2b"),
//         new ObjectId("5f4bf49da597461b24fbc8b3"),
//         new ObjectId("5f480052b4e1811a747f692a"),
//         new ObjectId("5f511ef63e02ab025cd73673"),
//         new ObjectId("5f68c83cd92cfc6ce06f09ea"),
//         new ObjectId("5f47cb96b4e1811a747f6733"),
//         new ObjectId("6079c9f1b0866c3d35d583c3"),
//         new ObjectId("60ae86021387c119172825ac"),
//         new ObjectId("5f4e27103e02ab025cd7231b"),
//         new ObjectId("5f5f40bcdfca3302aa3ced23"),
//         new ObjectId("60ffdb09b69c834af29fc1f1"),
//         new ObjectId("60ed7af940c3895784c375c8"),
//         new ObjectId("5f4760ea2696f30d7872d618"),
//         new ObjectId("5f49246f03422118d8a27a80"),
//         new ObjectId("5f47bfccb4e1811a747f66df"),
//         new ObjectId("5f492b1c03422118d8a27b1a"),
//         new ObjectId("5f8898ef23f8242b7b1c87a8"),
//         new ObjectId("5f9c47dec6c96857a622e1b3"),
//         new ObjectId("5fd458d29223872c958d13bd"),
//         new ObjectId("5f89a9fd5dbf920fd5a1c0dd"),
//         new ObjectId("5f89a9f75dbf920fd5a1c0dc"),
//         new ObjectId("5fc1152d339c822018a6b696"),
//         new ObjectId("5f7b6bc95dbf920fd5a19a3b"),
//         new ObjectId("5f490f94b4e1811a747f713f"),
//         new ObjectId("60705f8de13c516699b5e381"),
//         new ObjectId("60705f8de13c516699b5e37f"),
//         new ObjectId("5f8d87265dbf920fd5a1d2db"),
//         new ObjectId("6137e39e9d4d2939f434510f"),
//         new ObjectId("5f47cb95b4e1811a747f6732"),
//         new ObjectId("5f49246f03422118d8a27a7f"),
//         new ObjectId("5f4e545d3e02ab025cd72469"),
//         new ObjectId("60194cea4360b57f1a8f6d2e"),
//         new ObjectId("5f4760ea2696f30d7872d620"),
//         new ObjectId("5f54b9ab7373081775791a57"),
//         new ObjectId("5fd79b1d9223872c958d14ff"),
//         new ObjectId("5faad5d2386c38367cdb1507"),
//         new ObjectId("5f5b848367fb22444c8b4ef4"),
//         new ObjectId("5f5a791467fb22444c8b4ae9"),
//         new ObjectId("60b6841c1387c11917283807"),
//         new ObjectId("5ffdfff1ad493b37019c46bc"),
//         new ObjectId("5f4901e5b4e1811a747f70b4"),
//         new ObjectId("5f60f4c0dfca3302aa3cf15e"),
//         new ObjectId("602fa85174df2b206ec40c80"),
//         new ObjectId("5f48e4d9b4e1811a747f6f7b"),
//         new ObjectId("5f63963ed92cfc6ce06ef654"),
//         new ObjectId("5f4ba2cca597461b24fbc6dd"),
//         new ObjectId("5f64c7a97670b52ae55461ac"),
//         new ObjectId("60ae94121387c119172825db"),
//         new ObjectId("60b2494b1387c1191728300c"),
//         new ObjectId("5f5ac1a667fb22444c8b4b4c"),
//         new ObjectId("609ffed49d4d2939f43411be"),
//         new ObjectId("5f8482165dbf920fd5a1b55c"),
//         new ObjectId("6010565dde836703b65ef1de"),
//         new ObjectId("61d488310de61459913665c0"),
//         new ObjectId("5f5a5cef67fb22444c8b4a46"),
//         new ObjectId("5f885a7d5dbf920fd5a1bc09"),
//         new ObjectId("5f484a27b4e1811a747f69cd"),
//         new ObjectId("6063682b3566536ba628c5a9"),
//         new ObjectId("5f746ba323f8242b7b1c7e79"),
//         new ObjectId("5f5a4ed867fb22444c8b4a10"),
//         new ObjectId("5f4760f72696f30d7872d64f"),
//         new ObjectId("5f89e1a35dbf920fd5a1c411"),
//         new ObjectId("5f7edbe85dbf920fd5a1a168"),
//         new ObjectId("5f6dd14b23f8242b7b1c7a55"),
//         new ObjectId("5f662fc6d92cfc6ce06f0523"),
//         new ObjectId("5f7eab2123f8242b7b1c83b5"),
//         new ObjectId("613ae72a9d4d2939f434522a"),
//         new ObjectId("5f80579d5dbf920fd5a1a560"),
//         new ObjectId("5f7ff8e323f8242b7b1c844e"),
//         new ObjectId("5f4760e92696f30d7872d60e"),
//         new ObjectId("6211929f02003004054505a8"),
//         new ObjectId("604425bafdd561237e022e1e"),
//         new ObjectId("610f00ba9d4d2939f4343cb3"),
//         new ObjectId("5fd2b7909223872c958d123d"),
//         new ObjectId("610953399d4d2939f4343859"),
//         new ObjectId("6109532d9d4d2939f4343858"),
//         new ObjectId("5f6052e5dfca3302aa3cefc0"),
//         new ObjectId("5f483ad5b4e1811a747f69a9"),
//         new ObjectId("5f482491b4e1811a747f6991"),
//         new ObjectId("60ee538a9d4d2939f43428ae"),
//         new ObjectId("6114c2c49d4d2939f4343f23"),
//         new ObjectId("60931a8991c0cf445a71de9e"),
//         new ObjectId("609e428bdae6c8666a8bb69d"),
//         new ObjectId("5f487440b4e1811a747f6afd"),
//         new ObjectId("5f4760e92696f30d7872d602"),
//         new ObjectId("6116862ab69c834af29ff786"),
//         new ObjectId("5f8996cb5dbf920fd5a1bfe4"),
//         new ObjectId("5f89beb323f8242b7b1c889f"),
//         new ObjectId("5f4ee9ac3e02ab025cd7284a"),
//         new ObjectId("5f4a7355a5db4f10d84610b6"),
//         new ObjectId("612220e89d4d2939f43447b7"),
//         new ObjectId("5f89a7345dbf920fd5a1c0b0"),
//         new ObjectId("5f8929af23f8242b7b1c87ec"),
//         new ObjectId("5f4760ea2696f30d7872d61c"),
//         new ObjectId("5f48d45ab4e1811a747f6e95"),
//         new ObjectId("5f4776c6d9ee2c1ae048ac26"),
//         new ObjectId("60f1fcdd456c733f32d3b678"),
//         new ObjectId("60f0c9d5456c733f32d3b3a7"),
//         new ObjectId("603156acc12eeb5af76c0b84"),
//         new ObjectId("62185fc802003004054507ac"),
//         new ObjectId("5f4760e82696f30d7872d5ee"),
//         new ObjectId("5f477cfb88b7430de81e0a75"),
//         new ObjectId("5f4760e92696f30d7872d60d"),
//         new ObjectId("605545fcfdd561237e023664"),
//         new ObjectId("5f4804edb4e1811a747f693b"),
//         new ObjectId("60ecd0a1a5d9ae52f9fc5477"),
//         new ObjectId("6232376c1f51aa7db1e5bfa3"),
//         new ObjectId("5f4760ea2696f30d7872d621"),
//         new ObjectId("603ab218eddea60dd72cf16c"),
//         new ObjectId("5f4f12b33e02ab025cd728f0"),
//         new ObjectId("5f4fc25303adac799399020a"),
//         new ObjectId("5f4760ee2696f30d7872d640"),
//         new ObjectId("61fe6f13d383356e76cd30d0"),
//         new ObjectId("60b026d29d4d2939f43417ea"),
//         new ObjectId("614e59229be7ca3aefc6b320"),
//         new ObjectId("5ffe23a6cb671f319e647838"),
//         new ObjectId("605a207dfdd561237e02382c"),
//         new ObjectId("60b3b6fb1387c1191728347e"),
//         new ObjectId("60b5036ff629873f560b2c80"),
//         new ObjectId("5f4760e82696f30d7872d5ed"),
//         new ObjectId("5f47aa6a2cd52216d0cf4747"),
//         new ObjectId("5f4773f61bb3ae145498f76b"),
//         new ObjectId("5f4795522cd52216d0cf46fb"),
//         new ObjectId("5f4a604d8042f91374949f85"),
//         new ObjectId("5f6109b9dfca3302aa3cf1f4"),
//         new ObjectId("5f8e295a23f8242b7b1c8b59"),
//         new ObjectId("610983b1b69c834af29fd705"),
//         new ObjectId("611afe2104cc0a515c8c147f"),
//         new ObjectId("5f974a84c6c96857a622d42e"),
//         new ObjectId("607e02869d4d2939f433fec9"),
//         new ObjectId("5fa0abcee1ad50224921ad18"),
//         new ObjectId("5fd039a79223872c958d11a9"),
//         new ObjectId("5fb070d19223872c958d036a"),
//         new ObjectId("5fb83a5f1e3b32494a850307"),
//         new ObjectId("5fb924bf1e3b32494a8507d9"),
//         new ObjectId("600b358f74df2b206ec3fe22"),
//         new ObjectId("5fbc2384021de046373b267d"),
//         new ObjectId("5fbd7505021de046373b29ec"),
//         new ObjectId("5fbec685021de046373b2d52"),
//         new ObjectId("5fd2793a7780166238134320"),
//         new ObjectId("5fd80aa9eca24a75ee7db73a"),
//         new ObjectId("5fe262af930a0b2e7703f150"),
//         new ObjectId("60480484beff8a295f69d570"),
//         new ObjectId("613f81a59d4d2939f43455db"),
//         new ObjectId("604908abbeff8a295f69d7ff"),
//         new ObjectId("6140b2899d4d2939f4345671"),
//         new ObjectId("604fe4705c1fc77b1b701a4d"),
//         new ObjectId("60b0291f9d4d2939f4341808"),
//         new ObjectId("606cfe6c2dfb3554ecca0224"),
//         new ObjectId("607637c698789a365bcb7c0e"),
//         new ObjectId("608c51d291c0cf445a71cc21"),
//         new ObjectId("60915ae291c0cf445a71dad0"),
//         new ObjectId("60b2656c1387c119172830f6"),
//         new ObjectId("60a7de429d4d2939f43414c9"),
//         new ObjectId("60aa85c4ee207252587a2e9a"),
//         new ObjectId("60abdbfa1387c11917282135"),
//         new ObjectId("60b0cd9c1387c1191728298b"),
//         new ObjectId("60b814e31387c11917283a2b"),
//         new ObjectId("61132fb99d4d2939f4343ea6"),
//         new ObjectId("60de3b339d4d2939f434243c"),
//         new ObjectId("60fb66c29d4d2939f4343015"),
//         new ObjectId("60e8cc2b9d4d2939f43426d2"),
//         new ObjectId("6149212d9d4d2939f4345c07"),
//         new ObjectId("610887859d4d2939f4343825"),
//         new ObjectId("611afc8a9d4d2939f4344344"),
//         new ObjectId("60b838449d4d2939f4341acf"),
//         new ObjectId("60c2618e9d4d2939f4341d48"),
//         new ObjectId("60d5fe0c9d4d2939f4342235"),
//         new ObjectId("60c7b0ed9d4d2939f4341ec9"),
//         new ObjectId("60de4a8ca709ef129e6c4a19"),
//         new ObjectId("60e2f4949d4d2939f4342598"),
//         new ObjectId("60e32a789d4d2939f43425a7"),
//         new ObjectId("613f60e89d4d2939f43455c6"),
//         new ObjectId("60e3354940c3895784c364f2"),
//         new ObjectId("613f60f4824c9d5c5b2d5cc5"),
//         new ObjectId("60e4245940c3895784c36608"),
//         new ObjectId("60ecc0639d4d2939f43427e3"),
//         new ObjectId("60b0291d9d4d2939f4341807"),
//         new ObjectId("60480483beff8a295f69d56c"),
//         new ObjectId("60f0357fea4f253e5dfd3974"),
//         new ObjectId("60f0ab6b9d4d2939f434299d"),
//         new ObjectId("60f0b1b8ea4f253e5dfd3a7f"),
//         new ObjectId("60f1ad989d4d2939f4342a5e"),
//         new ObjectId("60f1c3f1ea4f253e5dfd3de8"),
//         new ObjectId("60f1d459ea4f253e5dfd3e47"),
//         new ObjectId("5f4760ed2696f30d7872d63b"),
//         new ObjectId("5f4760f02696f30d7872d644"),
//         new ObjectId("5f47d032b4e1811a747f676a"),
//         new ObjectId("5f49242e03422118d8a27a5d"),
//         new ObjectId("5fe27c77930a0b2e7703f167"),
//         new ObjectId("5fea83ef930a0b2e7703fe8d"),
//         new ObjectId("5f492b1f03422118d8a27b1e"),
//         new ObjectId("5f4931c203422118d8a27b84"),
//         new ObjectId("604b900bfdd561237e023118"),
//         new ObjectId("5f49cf3a03422118d8a27e8a"),
//         new ObjectId("600756f084f9bf6e239ed390"),
//         new ObjectId("5f49cf4103422118d8a27e8b"),
//         new ObjectId("5f565ad77373081775791bb0"),
//         new ObjectId("5f5f8b56213af223437ed7f3"),
//         new ObjectId("5f6f2f0a23f8242b7b1c7bfc"),
//         new ObjectId("5f89686a23f8242b7b1c881a"),
//         new ObjectId("5fca87fb12c45f40248e24c9"),
//         new ObjectId("5fcaceed9223872c958d0f02"),
//         new ObjectId("5fe27c77930a0b2e7703f167"),
//         new ObjectId("60566300ffa2483df2773e57"),
//         new ObjectId("61957d8e0a98676fdce88d8d"),
//         new ObjectId("60b3facc9d4d2939f43419ab"),
//         new ObjectId("60ff77379d4d2939f4343279"),
//         new ObjectId("610034bac9ac962abe5160f5"),
//         new ObjectId("60fb66cd9d4d2939f4343016"),
//         new ObjectId("60fb67f8b69c834af29fb931"),
//         new ObjectId("60fb52e3b69c834af29fb911"),
//         new ObjectId("60e8ba9340c3895784c36e5f"),
//         new ObjectId("60fcb8529d4d2939f434318f"),
//         new ObjectId("60fcb977b69c834af29fbe19"),
//         new ObjectId("60fc5002b69c834af29fbc6d"),
//         new ObjectId("5f47f5c5b4e1811a747f68fa"),
//         new ObjectId("5f491586b4e1811a747f71a0"),
//         new ObjectId("5f49803203422118d8a27d94"),
//         new ObjectId("5fd095779223872c958d11b6"),
//         new ObjectId("5fd52153ce1bbb1ab66e89b0"),
//         new ObjectId("5f4a052d03422118d8a283aa"),
//         new ObjectId("5f4a134a03422118d8a28436"),
//         new ObjectId("5f4d4e5f3e02ab025cd71e29"),
//         new ObjectId("60f368469d4d2939f4342c23"),
//         new ObjectId("5f63dee2d92cfc6ce06ef73a"),
//         new ObjectId("5f8609955dbf920fd5a1b934"),
//         new ObjectId("5fadcce0535b5f2cf14f1155"),
//         new ObjectId("5f94890ec6c96857a622ce2a"),
//         new ObjectId("5fac5182386c38367cdb1842"),
//         new ObjectId("5fd80bc59223872c958d155c"),
//         new ObjectId("5fa70b4551821b71357d0e0f"),
//         new ObjectId("5f8dfebc5dbf920fd5a1d44e"),
//         new ObjectId("5faef43d477a775d23681c31"),
//         new ObjectId("5f8a2d6e23f8242b7b1c8931"),
//         new ObjectId("5fab28469223872c958d017d"),
//         new ObjectId("5fbffbe5021de046373b2f1b"),
//         new ObjectId("5fe25ba7930a0b2e7703f135"),
//         new ObjectId("605a1f3effa2483df27745ac"),
//         new ObjectId("60b3ff759d4d2939f43419b5"),
//         new ObjectId("608b005291c0cf445a71c561"),
//         new ObjectId("60ff413a9d4d2939f434324c"),
//         new ObjectId("610260909d4d2939f43433c9"),
//         new ObjectId("60f67beb9d4d2939f4342d29"),
//         new ObjectId("610261e9b69c834af29fc5e8"),
//         new ObjectId("60f67d5fb69c834af29fae42"),
//         new ObjectId("5f659bf923f8242b7b1c751d"),
//         new ObjectId("5f4760ea2696f30d7872d615"),
//         new ObjectId("6102c201b69c834af29fc68e"),
//         new ObjectId("61035802b69c834af29fc817"),
//         new ObjectId("60d61b01a683845ce44ee94a"),
//         new ObjectId("610914259d4d2939f4343852"),
//         new ObjectId("610913d3c9ac962abe51758b"),
//         new ObjectId("61042d4bb69c834af29fcbbc"),
//         new ObjectId("6104749a9d4d2939f4343596"),
//         new ObjectId("61058672c9ac962abe516d77"),
//         new ObjectId("6106b4cac9ac962abe517021"),
//         new ObjectId("6105902e9d4d2939f434367b"),
//         new ObjectId("6105d6349d4d2939f4343693"),
//         new ObjectId("610704699d4d2939f4343757"),
//         new ObjectId("6105e1e79d4d2939f43436af"),
//         new ObjectId("610a11779d4d2939f43438ff"),
//         new ObjectId("610d793c9d4d2939f4343a9f"),
//         new ObjectId("6182ebbc9788834df6bcfcf7"),
//         new ObjectId("619e73d82cdfff46623b6d65"),
//         new ObjectId("61a4a619d1ac514c025fe870"),
//         new ObjectId("61b26d5dd1ac514c025fee83"),
//         new ObjectId("60cd05189d4d2939f434200a"),
//         new ObjectId("61a4a51e81fb617c3546373a"),
//         new ObjectId("61b21ab19f122e3761212b4f"),
//         new ObjectId("61ab3530d1ac514c025febb8"),
//         new ObjectId("61ab62e1b3f1b263b5dc2a80"),
//         new ObjectId("6077e4d29d4d2939f433fa88"),
//         new ObjectId("61c538fbd1ac514c025ff575"),
//         new ObjectId("621c3c6f0200300405450a2b"),
//         new ObjectId("621c3c6f0200300405450a2c"),
//         new ObjectId("5f8953b823f8242b7b1c8801"),
//         new ObjectId("6055cde8fdd561237e02369f"),
//         new ObjectId("61ec2c40020030040544f884"),
//         new ObjectId("61d9b6ee020030040544f30e"),
//         new ObjectId("6202707257f40f217736e5af"),
//         new ObjectId("62113fdbc3f9ea7fab161f5a"),
//         new ObjectId("6071b10ee13c516699b5ed23"),
//         new ObjectId("61fab1961af0ca4f5f983301"),
//         new ObjectId("6209d723ea4c667275af475b"),
//         new ObjectId("62022dbbd16de9140c621a66"),
//         new ObjectId("6209d7df0200300405450240"),
//         new ObjectId("62022e66020030040544ff1d"),
//         new ObjectId("613bf9b09d4d2939f434538c"),
//         new ObjectId("614208989d4d2939f4345704"),
//         new ObjectId("6144b06d9d4d2939f43458b5"),
//         new ObjectId("6144b04c9d4d2939f43458b4"),
//         new ObjectId("620437c4ef5dce5280321fe5"),
//         new ObjectId("61dd818f72e836257ababb2f"),
//         new ObjectId("621909a18d4fec638b6e552f"),
//         new ObjectId("61f28b0046e6c7238f9e7d4c"),
//         new ObjectId("62404f6562d8fd5f6f2776ff"),
//         new ObjectId("623b677d7d94e523501996f8"),
//         new ObjectId("6241c0626b06db1a488af2a8"),
//         new ObjectId("621e214058ff2d506f3a1a46"),
//         new ObjectId("62314f7202f75448ebb22c68"),
//         new ObjectId("6247c6619ba8c121bd548436"),
//         new ObjectId("62172ea37ff299138a0d9fa5"),
//         new ObjectId("6209e55f24df0966b2ff31fe"),
//         new ObjectId("621f8a930200300405450b4e"),
//         new ObjectId("623b5279d3b895646e3f0aa0"),
//         new ObjectId("6241bfa3d3b895646e3f0c6e"),
//         new ObjectId("61f5b98d0ba35423cdf217e7"),
//         new ObjectId("621aadf20200300405450992"),
//         new ObjectId("61d710cd693d775b66a040f4"),
//         new ObjectId("6009a59084f9bf6e239ed7b8"),
//         new ObjectId("608dcb8a9d4d2939f4340841"),
//         new ObjectId("6042a53474df2b206ec41649")
//     ]
// }
// // PENT
// const config: TConfig = {
//     db: {
//         host: '18.181.237.109',
//         port: 36186,
//         name: 'pent',
//         id: 'pent',
//         password: 'Pent@4860'
//     },
//     casino: {
//         apiURL: '',
//         operator: '',
//         privateKey: ''
//     },
//     jwtSecret: 'To!@#$%^&*()0987654321Esta365!To',
//     expiresIn: 60 * 60 * 1,
//     pageSize: 30,
//     sportPageSize: 30,
//     sportsMaxRate: 100,
//     powerballTime: 50,
//     powerladderTime: 50,
//     kenoladderTime: 50,
//     boglePowerballTime: 50,
//     bogleladderTime: 50,
//     googlePowerball1: 15,
//     googlePowerball3: 50,
//     kplay: {
//         code: '',
//         token: '',
//         key: '',
//         endpoint: 'http://kplayone.com'
//         // http://api.kplay.jmk.soft24.io/api
//     },
//     canCancelBetTime: 10,
//     canCancelBetBeforeGameTime: 10,
//     canCancelBetCount: 10,
//     displaySportCross: []
// }
// // NS
// const config: TConfig = {
//     db: {
//         host: '18.181.237.109',
//         port: 36186,
//         name: 'ns',
//         id: 'ns',
//         password: 'Ns@4860'
//     },
//     casino: {
//         apiURL: '',
//         operator: '',
//         privateKey: ''
//     },
//     jwtSecret: 'To!@#$%^&*()0987654321Esta365!To',
//     expiresIn: 60 * 60 * 1,
//     pageSize: 30,
//     sportPageSize: 30,
//     sportsMaxRate: 100,
//     powerballTime: 50,
//     powerladderTime: 50,
//     kenoladderTime: 50,
//     boglePowerballTime: 50,
//     bogleladderTime: 50,
//     googlePowerball1: 15,
//     googlePowerball3: 50,
//     kplay: {
//         code: '',
//         token: '',
//         key: '',
//         endpoint: 'http://kplayone.com'
//         // http://api.kplay.jmk.soft24.io/api
//     },
//     canCancelBetTime: 10,
//     canCancelBetBeforeGameTime: 10,
//     canCancelBetCount: 10,
//     displaySportCross: []
// }
// X
const config = {
    db: {
        host: '18.183.255.153',
        port: 36183,
        name: 'xtest',
        id: 'xtest',
        password: 'Xtest@4860'
    },
    casino: {
        apiURL: '',
        operator: '',
        privateKey: ''
    },
    jwtSecret: 'To!@#$%^&*()0987654321Esta365!To',
    expiresIn: 60 * 60 * 1,
    pageSize: 30,
    sportPageSize: 30,
    sportsMaxRate: 100,
    powerballTime: 50,
    powerladderTime: 50,
    kenoladderTime: 50,
    boglePowerballTime: 50,
    bogleladderTime: 50,
    googlePowerball1: 15,
    googlePowerball3: 50,
    kplay: {
        code: '',
        token: '',
        key: '',
        endpoint: 'http://kplayone.com'
    },
    canCancelBetTime: 10,
    canCancelBetBeforeGameTime: 10,
    canCancelBetCount: 10,
    displaySportCross: []
};
exports.default = config;
