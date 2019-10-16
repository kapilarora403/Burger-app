import React, {Component} from 'react';
import Aux from "../../hoc/aux";
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/BuildControls/BuildControls';

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
        totalPrice: 40
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
        })

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
            })
        }
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
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    lessHandler={this.removeIngredientHandler}
                    moreHandler={this.addIngredientHandler}
                    disabled={disabledInfo}
                    totalPrice={this.state.totalPrice}
                />
            </Aux>
        )
    }
}
export default BurgerBuilder
