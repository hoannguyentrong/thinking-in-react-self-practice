var data = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

var ProductRow = React.createClass({
  render: function () {
    return (
      <tr>
        <td>{this.props.data.name}</td>
        <td>{this.props.data.price}</td>
      </tr>
    );
  }
});

var ProductCategoryRow = React.createClass({
  render: function () {
    return (
      <tr>
        <td colSpan="2">{this.props.data.category}</td>
      </tr>
    );
  }
});

var ProductTable = React.createClass({
  render: function () {
    console.log(data[0]);
    return (
      <div>
        <ProductCategoryRow data={data[0]}/>
        <ProductRow data={data[0]}/>
      </div>
    );
  }
});


ReactDOM.render(
  <ProductTable/>, document.getElementById('content')
);
