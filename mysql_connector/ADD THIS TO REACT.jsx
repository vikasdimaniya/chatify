import React, { Component } from "react";
class LoginPage extends Component {
  state = {
    products: [],
    product: {
      name: "",
      price: 0
    }
  };
  componentDidMount() {
    this.getProducts();
  }
  getProducts = _ => {
    fetch("http://localhost:3307/products")
      .then(response => response.json())
      .then(response => this.setState({ products: response.data }))
      .catch(err => console.error(err));
  };
  renderProduct = ({ product_id, name, price }) => (
    <div key={product_id}>
      {name} {price}₹
    </div>
  );
  addProduct = _ => {
    const { product } = this.state;
    fetch(
      `http://localhost:3307/products/add?name=${product.name}&price=${product.price}`
    )
      .then(this.getProducts)
      .catch(err => console.error(err));
  };
  render() {
    const { products, product } = this.state;
    return (
      <div>
        product | price
        {products.map(this.renderProduct)}
        <br />
        <br />
        ADD NEW PRODUCT
        <div>
          name
          <input
            value={product.name}
            onChange={e =>
              this.setState({ product: { ...product, name: e.target.value } })
            }
          />
          <br />
          price
          <input
            value={product.price}
            onChange={e =>
              this.setState({ product: { ...product, price: e.target.value } })
            }
          />
          <br />
          <button onClick={this.addProduct}>Add product</button>
        </div>
      </div>
    );
  }
}

export default LoginPage;
