import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const INGREDIENT_CALORIES = {
    salad: 10,
    cheese: 70,
    meat: 220,
    bacon: 100
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        totalCalories: 200
    }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        const caloriesAddition = INGREDIENT_CALORIES[type];
        const oldCalories = this.state.totalCalories;
        const newCalories = oldCalories + caloriesAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients, totalCalories: newCalories});
    }

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        if(oldCount >= 1) {
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            }
            updatedIngredients[type] = updatedCount;
            const priceDeduction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction;
            const caloriesDeduction = INGREDIENT_CALORIES[type];
            const oldCalories = this.state.totalCalories;
            const newCalories = oldCalories - caloriesDeduction;
            this.setState({totalPrice: newPrice, ingredients: updatedIngredients, totalCalories: newCalories});
        }
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                calories={this.state.totalCalories}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;