import React, {Component} from 'react';
import Aux from "../../hoc/Aux/aux";
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 5,
    cheese: 4,
    meat: 10,
    bacon: 6
};
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 40,
        purchasable: false,
        purchasing: false,
        loading: false
    };

    async componentDidMount() {
        const ingredients = await axios.get('/ingredients.json');
        this.setState({ingredients: ingredients.data});
        };


    updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        }, 0);
        this.setState({purchasable: sum > 0})
    };

    addIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount + 1;
      const updatedIngredients = {
          ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
             ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);

    };
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount !== 0) {
            const newCount = oldCount - 1;
            const updatedIngredients = {...this.state.ingredients};
            updatedIngredients[type] = newCount;
            const priceSubtraction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceSubtraction;
            this.setState({
                ingredients: updatedIngredients,
                totalPrice: newPrice
            });
            this.updatePurchaseState(updatedIngredients);
        }
    };
    checkoutModalHandler = () => {
        this.setState({purchasing: true})
    };

    modalCloser = () => {
        this.setState({purchasing: false})
    };

    purchaseContinueHandler = async () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + this.state.ingredients[i])
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    };

    render() {

        let orderSummary = null;

        let burger = <Spinner/>;

        if(this.state.ingredients) {
            const disabledInfo = {
                ...this.state.ingredients
            };
            for (let key in disabledInfo) {
                disabledInfo[key] = disabledInfo[key] === 0;
            }
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        lessHandler={this.removeIngredientHandler}
                        moreHandler={this.addIngredientHandler}
                        disabled={disabledInfo}
                        totalPrice={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        purchasing={this.checkoutModalHandler}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                          purchaseCancelled={this.modalCloser}
                          purchaceContinued={this.purchaseContinueHandler}
                          totalPrice={this.state.totalPrice}
            />;
        }

        if(this.state.loading) {
            orderSummary = <Spinner />
        }

        return(
            <Aux>
                 <Modal show={this.state.purchasing} modalCloser={this.modalCloser}>
                     {orderSummary}
                 </Modal>
                {burger}
            </Aux>
        )
    }
}
export default  withErrorHandler(BurgerBuilder, axios)
