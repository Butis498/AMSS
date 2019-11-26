    let des = 'Producimos tortas y ponqués para todo tipo de celebraciones, elaboradas con el más avanzado control de higiene, calidad y tecnología en diseño; utilizando como materia prima básica harina, con diseños innovadores acordes a cada celebración, con acabados impecables permitiendo así una plena satisfacción de nuestros clientes. Creamos productos con garantía, calidad tamaño y frescura ideal para la aceptación total.'
    let totalPrice = 0;
    const index = [1, 2, 3, 4, 5]
    const imgRoute = 'assets/img/'
    const format = '.jpg'
    const Product = require('./Database/models/product')
    const CartProduct = require('./Database/models/cart.Products')
    const productCtrl = {}



    productCtrl.getProducts = async() => {
        const products = await Product.find();


        return products;

    }

    productCtrl.addHomeProduct = async() => {


        let p = new Product({
            name: "Pastel",
            price: 200,
            foto: "assets/img/1.jpg",
            description: " Por el contrario, en casi todos los países hispanoamericanos se le conoce como «torta», a excepción de México y El Salvador, donde torta es un sándwich de tipo salado. En Colombia, se le llama «ponqué, pastel o torta» (una transliteración del término inglés pound cake); en Ecuador prevalece el nombre de pastel y a los helados rellenos se les conoce como tortas y en Panamá se le conoce simplemente como «dulce». "
        })

        await p.save()
    }



    productCtrl.addToCart = async(id) => {

        const product = await Product.findById({ _id: id })

        const newCartProduct = new CartProduct({
            name: product.name,
            price: product.price,
            foto: product.foto
        })

        await newCartProduct.save()

    }

    productCtrl.getCartProducts = async() => {

        const cartProducts = await CartProduct.find()

        return cartProducts;
    }

    productCtrl.clearCart = async() => {
        await CartProduct.deleteMany()
    }

    productCtrl.getPrice = async() => {

        totalPrice = 0;

        const cartProducts = await CartProduct.find()

        cartProducts.forEach(product => {
            totalPrice += product.price
        });

        return totalPrice;

    }

    productCtrl.removeProduct = async(id) => {

        const RPoduct = await CartProduct.deleteOne({ _id: id })


    }

    module.exports = productCtrl