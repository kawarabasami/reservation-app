const Product = require('./model/product');

class FakeDB {
    constructor() {
        this.products = [
            {
                coverImage: './assets/img/phone-cover.jpg',
                name: 'Phone XL',
                price: 799,
                description: 'A large phone with one of the best screens',
                heading1: 'Phone XL heading1',
                headingtext1: 'Phone XL heading1 description',
                heading2: 'Phone XL heading2',
                headingtext2: 'Phone XL heading2 description',
                heading3: 'Phone XL heading3',
                headingtext3: 'Phone XL heading3 description'
            },
            {
                coverImage: './assets/img/phone-cover.jpg',
                name: 'Phone Mini',
                price: 699,
                description: 'A great phone with one of the best cameras',
                heading1: 'Phone Mini heading1',
                headingtext1: 'Phone Mini heading1 description',
                heading2: 'Phone Mini heading2',
                headingtext2: 'Phone Mini heading2 description',
                heading3: 'Phone Mini heading3',
                headingtext3: 'Phone Mini heading3 description'
            },
            {
                coverImage: './assets/img/phone-cover.jpg',
                name: 'Phone Standard',
                price: 299,
                description: 'standard camera phone',
                heading1: 'Phone Standard heading1',
                headingtext1: 'Phone Standard heading1 description',
                heading2: 'Phone Standard heading2',
                headingtext2: 'Phone Standard heading2 description',
                heading3: 'Phone Standard heading3',
                headingtext3: 'Phone Standard heading3 description'
            },
            {
                coverImage: './assets/img/phone-cover.jpg',
                name: 'Phone Special',
                price: 999,
                description: 'special camera phone',
                heading1: 'Phone Special heading1',
                headingtext1: 'Phone Special heading1 description',
                heading2: 'Phone Special heading2',
                headingtext2: 'Phone Special heading2 description',
                heading3: 'Phone Special heading3',
                headingtext3: 'Phone Special heading3 description'
            }];
    }

    async initDb() {
        await this.cleanDb();
        this.pushProductsToDb();
    }

    async cleanDb() {
        await Product.deleteMany({});
    }

    pushProductsToDb() {
        this.products.forEach(
            (product) => {
                const newProduct = new Product(product)
                newProduct.save();
            }
        )
    }
}

module.exports = FakeDB;