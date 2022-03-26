import React from 'react';

import '../App.css';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ApiUtilities from '../api/ApiUtilities.js';
import Loader from '../components/Loader';
import OrderFrame from '../components/OrderFrame';

class Order extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            orders: null,
            user: null
        }
    }

    async componentDidMount(){
        var data =  JSON.parse(localStorage.getItem('user'));
        var isLogged = data && data.Bearer;

        if(!isLogged){
            return;
        }

        const orders = await ApiUtilities.getOrders();
        this.setState({loaded: true, orders: orders.data, user:data});
    }

    render(){
        if (this.state.loaded === false){
            return (
                <>
                    <Navbar/>
                    <Loader/>
                    <Footer />
                </>
            )
        }

        const orders = this.state.orders
        const user_id = this.state.user.User.id;

        var showOrders = Object.keys(orders).map(function(key) {
            if(orders[key].attributes.user.data.id === user_id){
                return [key, orders[key]];
            }
        });
        //cleaning up
        for (const [key, value] of Object.entries(showOrders)) {
            if (value === undefined){
                const index = showOrders.indexOf(value);
                if (index > -1) {
                    showOrders.splice(index, 1); 
                }
            }
        }
        console.log(showOrders);

        return(
            <>
                <Navbar/>
                <div className="container-games">
                    <h2 className="flow-text center">Your Orders</h2>
                    <ul className="collection">
                        {showOrders.map((data,i) => <OrderFrame key={i} data={data}/>)}
                    </ul>
                </div>
                <Footer />
            </>
        )
    }
}

export default Order;