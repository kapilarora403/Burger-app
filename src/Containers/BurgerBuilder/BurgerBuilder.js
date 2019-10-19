import React, {Component} from 'react';
import Aux from "../../hoc/Aux/aux";
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 5,
    cheese: 4,
    meat: 10,
    bacon: 6
};
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 40,
        purchasable: false,
        purchasing: false
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

    purchaseContinueHandler = () => {
        alert('You Continue!');
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0;
        }
        return(
            <Aux>
                 <Modal show={this.state.purchasing} modalCloser={this.modalCloser}>
                     <OrderSummary ingredients={this.state.ingredients}
                     purchaseCancelled={this.modalCloser}
                     purchaceContinued={this.purchaseContinueHandler}
                     totalPrice={this.state.totalPrice}
                     />
                 </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    lessHandler={this.removeIngredientHandler}
                    moreHandler={this.addIngredientHandler}
                    disabled={disabledInfo}
                    totalPrice={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    purchasing={this.checkoutModalHandler}
                />
            </Aux>
        )
    }
}
export default BurgerBuilder
