import React, {Component} from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: '',
        loading: false
    };

    orderHandler = async (e) => {
        e.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Kapil',
                address: 'Gurgaon',
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };
        await axios.post('/orders.json', order);
        this.setState({loading: false});
        this.props.history.push('/');
    }
    render() {
        let form = (
            <form>
                <Input inputtype='input' type="text" name="name" placeholder="Your Name" />
                <Input inputtype='input' type="email" name="email" placeholder="Your Email" />
                <Input inputtype='input' type="text" name="address" placeholder="Your Address" />
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )

    }
}

export default ContactData
