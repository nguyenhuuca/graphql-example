import { pizzaToppings, pizzas } from "../model/pizzaModel.js";
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
export const resolvers = {
    Query: {
        fetchPizzaById: async (_, { id }, { dataSources }) => {
            if (id) {
                const pizzas = await dataSources.pizzaAPI.getPizzaById(id);
                console.log(pizzas);
                return pizzas;
            }
            return undefined;
        },
        fetchPizzas: async (_, { id }, { dataSources }) => {
            const pizzas = await dataSources.pizzaAPI.getPizzas();
            console.log(pizzas);
            return pizzas;
        },
    },
    Mutation: {
        createPizza: async (parent, args, { dataSources }) => {
            console.log(args);
            // get pizza topping using pizza id
            const { toppings, pizza } = args;
            // treate topping as another table so you also need to get topping using current topping id!
            const toppingRecords = toppings.map(({ id }) => pizzaToppings.find(({ id: pizzaToppingId }) => pizzaToppingId === id));
            // generate id
            let id = Math.floor(100000 + Math.random() * 900000);
            const newItem = { id, toppings: toppingRecords, pizza };
            const rs = await dataSources.pizzaAPI.createPizza(newItem);
            console.log("Make new pizza successfully");
            return rs;
        },
        updatePizza: (parent, args, context) => {
            // get current pizza record using pizza id
            const { id, pizza, toppings } = args;
            const index = pizzas.findIndex((pizza) => pizza.id === id);
            // treate topping as another table so you also need to get topping using current topping id!
            const toppingRecords = toppings.map(({ id }) => pizzaToppings.find(({ id: pizzaToppingId }) => pizzaToppingId === id));
            pizzas[index] = { id, toppings: toppingRecords, pizza };
            return pizzas[index];
        },
    },
    Pizza: {
        pizza: (item) => {
            return item.pizza + "!";
        }
    }
};
