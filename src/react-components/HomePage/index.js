import React from 'react';

import ProductList from '../Product/productList';

import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';
import Actions from '../../actions';

var firebase = require('firebase');

@connectToStores
class HomePage extends React.Component {

	constructor(props) {
	  super(props);

		Actions.getProducts();
	}

	static getStores() {
		return [ProductStore];
	}

	static getPropsFromStores() {
		return ProductStore.getState();
	}

	render() {

		return(

			<div>

				<header>
					<img src="/img/banner.jpeg" width="100%" />
				</header>

				<section>
					<section className="container">

						{
							this.props.products
							?
							<ProductList productList={this.props.products}/>
							:
							null
						}

					</section>
				</section>

			</div>

		);
	}
}

export default HomePage;
