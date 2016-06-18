var products = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

var ProductRow = React.createClass({
  render: function () {

    var name = this.props.stocked ?
      this.props.name :
      <span style={{color: 'red'}}>
        {this.props.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.price}</td>
      </tr>
    );
  }
});

var ProductCategoryRow = React.createClass({
  render: function () {
    return (
      <tr>
        <td colSpan="2">{this.props.category}</td>
      </tr>
    );
  }
});

var SearchBar = React.createClass({
  getInitialState: function () {
    return {text: '', isInStockOnly: false};
  },
  onTextChange: function (e) {
    console.log(e.target.value);
    this.setState({text: e.target.value});
    this.props.searchHandler(e.target.value, this.state.isInStockOnly);
  },
  onCheckboxChange: function (e) {
    this.setState({isInStockOnly: e.target.checked});
    this.props.searchHandler(this.state.text, e.target.checked);
  },
  render: function () {
    return (
      <div>
        <input type="text" placeholder="input keyword here..." onChange={this.onTextChange} value={this.state.text}/>
        <input type="checkbox" title="Only show products on stocks" onChange={this.onCheckboxChange}
               checked={this.state.isInStockOnly}/>
      </div>
    );
  }
});

var ProductTable = React.createClass({
  render: function () {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach(function (product) {
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category}/>);
      }
      rows.push(<ProductRow name={product.name} price={product.price} stocked={product.stocked} key={product.name}/>);
      lastCategory = product.category;
    });
    return (
      <table className="table">
        <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

var FilterableProductTable = React.createClass({
  getInitialState: function () {
    return {products: this.props.products}
  },
  searchHandler: function (text, isStockOnly) {
    var filteredProducts = [];
    this.props.products.forEach(function (product) {
      if (product.name.toLowerCase().indexOf(text.toLowerCase()) >= 0 && product.stocked === isStockOnly) {
        filteredProducts.push(product);
      }
    });
    this.setState({products: filteredProducts});
  },
  render: function () {
    return (
      <div>
        <SearchBar searchHandler={this.searchHandler}/>
        <ProductTable products={this.state.products}/>
      </div>
    );
  }
});

ReactDOM.render(
  <FilterableProductTable products={products}/>, document.getElementById('content')
);
