//----------* REQUIRE'S *----------//
const fs = require('fs');
const path = require('path');


//----------* VARIABLE'S *----------//
const pathProductsJSON = path.resolve(__dirname + '/../database/products.json');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


//----------* MAIN CONTROLLER *----------//
const controller = {
	index: (req, res) => {
		const productsJSON = fs.readFileSync(pathProductsJSON, 'utf-8');
		const products = JSON.parse(productsJSON);

		const visitedProducts = products.filter(product => product.category == 'visited');
		const inSaleProducts = products.filter(product => product.category == 'in-sale');

		return res.render('index', {
			visitedProducts,
			inSaleProducts
		});
	}
};


//----------* EXPORTS CONTROLLER *----------//
module.exports = controller;