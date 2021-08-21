import './drawer.css'
import React from 'react';
import ReactAutocomplete from "react-autocomplete";

class MyDrawer extends React.Component {
  constructor(props){
    super(props)
    
    this.orders_db = this.props.firebase.firestore().collection('orders');
    this.products_db = this.props.firebase.firestore().collection('products');
    
    
    this.state = {
      orders: [],
      products: []
    }

    // items.forEach((element, index) => {
    //   this.products_db.doc(String(index+1)).set({
    //     name:element,
    //     price:(getRandomArbitrary(6,16)*5)
    //   })
    // })

    this.input_keypress = this.input_keypress.bind(this)
    this.add_order = this.add_order.bind(this)
    this.delete_order = this.delete_order.bind(this)
    this.add_button = this.add_button.bind(this)
    this.minus_button = this.minus_button.bind(this)
    this.clear_orders = this.clear_orders.bind(this)
  }

  componentDidMount(){
    this.orders_db.onSnapshot((snap)=> {
      var data = snap.docs.map(x => x.data());
      this.setState({
        orders:data
      })
    })
    
    this.products_db.onSnapshot((snap)=> {
      var data = snap.docs.map(x => x.data());
      // console.log(data);
      this.setState({
        products:data
      })
    })
  }

  add_order(order){
    var data = {};
    if (order in this.state.orders[this.props.current_table-1]){
      data[order] = this.state.orders[this.props.current_table-1][order]+1;
    } else {
      data[order] = 1;
    }
    if (order in this.state.products){
    this.orders_db.doc(String(this.props.current_table)).update(data);
  }
  }

  delete_order(event){
    var order = event.target.getAttribute("order");
    var data = {};
    data[order] = this.props.firebase.firestore.FieldValue.delete();
    this.orders_db.doc(String(this.props.current_table)).update(data);
  }

  input_keypress(value){
    this.state.products.forEach((product,i) => {
      if (product.name === value){
        this.add_order(i);
        this.setState({ autocomplete_value: ""})
        return;
      }
    })
  }

  add_button(event){
    var order = event.target.getAttribute("order");
    this.add_order(order);
  }

  minus_button(event){
    var order = event.target.getAttribute("order");
    var data = {};
    data[order] = this.state.orders[this.props.current_table-1][order]-1;
    if (data[order]===0){
      this.delete_order(event);
    } else {
    this.orders_db.doc(String(this.props.current_table)).update(data);}
  }


  get_total(){
    var sum = 0;
    if (this.state.orders.length+1>this.props.current_table && Object.keys(this.state.orders[this.props.current_table-1]).length>0 && this.state.products.length>0){
      Object.keys(this.state.orders[this.props.current_table-1]).forEach(element =>{
        if (element in this.state.products){
        sum = sum + this.state.orders[this.props.current_table-1][element]*this.state.products[element].price;
      }
      });
    }
    return sum;
  }

  clear_orders(){
    var data=this.state.orders[this.props.current_table-1];
    Object.keys(data).forEach(order => data[order] = this.props.firebase.firestore.FieldValue.delete())
    this.orders_db.doc(String(this.props.current_table)).update(data);
  }

  render() {
    return (
      <div class="drawer">
        
        <div class="drawer-child title">
          Orders <br/>
          Table {this.props.current_table}
        </div>

        <ReactAutocomplete
        items={this.state.products}
        shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
        getItemValue={item => item.name}
        renderItem={(item, highlighted) =>
          <div
            style={{ backgroundColor: highlighted ? '#eee' : 'transparent',fontSize:"14pt"}}
          >
            {item.name}
          </div>
        }
        value={this.state.autocomplete_value}
        wrapperStyle={{width:"100%",marginBottom:"30px"}}
        onChange={e => this.setState({ autocomplete_value: e.target.value })}
        onSelect={this.input_keypress}
      />

        {(this.state.orders.length+1>this.props.current_table && Object.keys(this.state.orders[this.props.current_table-1]).length>0 && this.state.products.length>0) ?
        Object.keys(this.state.orders[this.props.current_table-1]).map(order => (
          (order in this.state.products) ?
        <div class="drawer-child">
          {this.state.orders[this.props.current_table-1][order]}{"x "}
          {this.state.products[parseInt(order)].name}
          <button class = "x" order={order} onClick={this.delete_order}>❌</button>
          <button class = "minus" order={order} onClick={this.minus_button}>➖</button>
          <button class = "plus" order={order} onClick={this.add_button}>➕</button>
        </div>
          :"")): ""}

        <div class ="footer">
          Total: {this.get_total()}{" SEK"}
          <br/>
          <button class = "clear" onClick={this.clear_orders}>C</button>
        </div>
      </div>  
    );
  }
}


export default MyDrawer;


