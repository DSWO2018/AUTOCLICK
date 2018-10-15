var Product = require('../models/product');
var mongoose = require('../node_modules/mongoose');

const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000,
    useNewUrlParser: true
};

const mongoURI = 'mongodb://localhost:27017/autoclick';

mongoose.connect(mongoURI, option).then(function () {
    var products = [
        new Product({
            imagePath: 'https://refaccionariamario.info/35430-large_default/soporte-frontal-de-motor-de-tsuru-3.jpg',
            mark: 'Aldeco',
            stock: 88,
            title: 'Soporte tsuru 111',
            description: "Soporte derecho tsuru 111, DEA products.",
            price: 150
        }),
        new Product({
            imagePath: 'https://http2.mlstatic.com/S_3877-MLM78656980_4176-O.jpg',
            mark: 'Lalo',
            stock: 34,
            title: 'Empaque de puerta',
            description: "Empaque de puerta tipo bulbo mediano con ceja de 4 mts.",
            price: 300
        }),
        new Product({
            imagePath: 'https://ddyplw08lo4nh.cloudfront.net/new_fnh069_spectra_premium_large.jpg',
            mark: 'Orma',
            stock: 34,
            title: 'Manguera de Ranger/Ford-pickup',
            description: "Manguera de tanque de gasolina para Ranger/Ford-pickup tipo grande, APA.",
            price: 200
        }),
        new Product({
            imagePath: 'https://http2.mlstatic.com/goma-pedal-clutch-freno-vocho-sedan-meistersatz-D_NQ_NP_800049-MLM27288258932_052018-F.jpg',
            mark: 'K&M',
            stock: 26,
            title: 'Hule peda',
            description: "Hule pedal para clutch y freno del vocho.",
            price: 25
        }),
        new Product({
            imagePath: "public/img/products/aleron1.jpg",
            mark: 'Patito Cuack',
            stock: 6,
            title: 'Aleron deportivo',
            description: "Aleron deportivo para auto tipo sedan.",
            price: 350
        }),
        new Product({
            imagePath: "public/img/products/calavera1jpg",
            mark: 'Don Julian',
            stock: 10,
            title: 'Calavera standart',
            description: "Juego de calaveras para carros basicos tsuru.",
            price: 120
        }),
        new Product({
            imagePath: "public/img/products/calavera2.jpg",
            mark: 'Ford',
            stock: 23,
            title: 'Calavera ford',
            description: "Juego de calaveras para autos ford 2017.",
            price: 200
        }),
        new Product({
            imagePath: "public/img/products/faros1.jpg",
            mark: 'Tepito',
            stock: 2,
            title: 'Faros Normales',
            description: "Faros para chevy 2018 con modificacion en el color.",
            price: 310
        }),
        new Product({
            imagePath: "public/img/products/focos1.jpg",
            mark: 'Osun',
            stock: 100,
            title: 'Focos Led',
            description: "Focos LED para todo tipo de autos de bajo consumo energetico.",
            price: 125
        }),
        new Product({
            imagePath: "public/img/products/frenos_disco.png",
            mark: 'Wilwood',
            stock: 54,
            title: 'Frenos de Disco',
            description: "Frenos de disco deportivos con detalles chidos.",
            price: 960
        }),
        new Product({
            imagePath: "public/img/products/frenos1.jpg",
            mark: 'BMW',
            stock: 23,
            title: 'Frenos Premium',
            description: "Frenos premium para automoviles BMW.",
            price: 999
        }),
        new Product({
            imagePath: "public/img/products/calavera3.jpg",
            mark: 'Toyota',
            stock: 3,
            title: 'Calavera deportiva',
            description: "Juego de calaveras deportiva color rojo race.",
            price: 640
        }),
        new Product({
            imagePath: "public/img/products/lip1.jpg",
            mark: 'Rare Race',
            stock: 150,
            title: 'Lip estetico',
            description: "Lip estetico de hule excelente para todos los automoviles.",
            price: 180
        }),
        new Product({
            imagePath: "public/img/products/clutch1.jpg",
            mark: 'Super Clutch',
            stock: 2,
            title: 'Clutch de Titanio',
            description: "Clutch de Titanio para autos de uso rudo.",
            price: 600
        }),
        new Product({
            imagePath: "public/img/products/motor1.jpg",
            mark: 'Hyper Motors',
            stock: 1,
            title: 'Motor para MZ',
            description: "Motor para MZ 2018, contiene todos los acccesorios y con garantia extendida.",
            price: 7100
        }),
        new Product({
            imagePath: "public/img/products/retrovisor1.jpg",
            mark: 'Auto Mirrors',
            stock: 55,
            title: 'Retrovisor electrocromico',
            description: "Retrovisor electrocomico de nueva generacion super guay.",
            price: 865
        }),
        new Product({
            imagePath: "public/img/products/rin1.jpg",
            mark: 'MR',
            stock: 6,
            title: 'Rines 2 piezas',
            description: "Rines de 2 piezas color negro con detalels rojos.",
            price: 640
        }),
        new Product({
            imagePath: "public/img/products/rin2.jpg",
            mark: 'Classical Tires LX',
            stock: 8,
            title: 'Rines LX',
            description: "Rines modelo LX clasicos de alta duracion.",
            price: 500
        }),
        new Product({
            imagePath: "public/img/products/rin3.jpg",
            mark: 'Rin Rin la Campana',
            stock: 3,
            title: 'Rin Ms Gris',
            description: "Rines de Ms color gris de alta duracion para autos de pista.",
            price: 450
        })
    ];

    var done = 0;
    for (var i = 0; i < products.length; i++) {
        products[i].save(function (err, result) {
            done++;
            if (done === products.length) {
                exit();
            }
            if(err){
                console.log(err);
            }
        });
    }

}, function (err) {
    console.log(err);
});

function exit() {
    mongoose.disconnect();
}