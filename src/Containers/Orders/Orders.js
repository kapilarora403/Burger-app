import React, {Component} from 'react';
import Order from '../../Components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class Orders extends Component {
    state = {
        orders: [],
        loading: true
    };
    async componentDidMount() {
      const orders = await axios.get('/orders.json');
      let fetchedOrders = [];
      for (let key in orders.data) {
          fetchedOrders.push({
              ...orders.data[key],
              id: key
          });
      }
      this.setState({loading: false, orders: fetchedOrders});
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => {
                    return <Order
                            key={order.id}
                            price={order.price}
                            ingredients={order.ingredients}
                            />
                })}
            </div>
        )
    }
}


export default withErrorHandler(Orders, axios);
