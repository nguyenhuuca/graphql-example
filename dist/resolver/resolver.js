import { pizzaToppings, pizzas } from "../model/pizzaModel.js";
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
export const resolvers = {
    Query: {
        pizzas: (parent, args, context) => {
            const { pizza } = args;
            const name = pizza;
            if (name) {
                // this is fake implementation of simple string matching
                // on production environment you would want to query from real database!
                return [pizzas.find(({ pizza }) => pizza === name)];
            }
            return pizzas;
        },
        pizza: (parent, args, context) => {
            const { id } = args;
            if (id) {
                // this is fake implementation of simple id matching
                // on production environment you would want to query from real database!
                return pizzas.find(({ id: pizzaId }) => pizzaId === id);
            }
            return undefined;
        },
        fetchPizza: async (_, { id }, { dataSources }) => {
            const data = await dataSources.pizzaAPI.getPizza();
            console.log(data);
            return data;
        },
    },
    Mutation: {
        createPizza: (parent, args, context) => {
            // this is fake implementation of increment id of database
            // on production environment you would want to insert from real database!
            let { id } = pizzas.reduce((prev, curr) => prev.id > curr.id ? prev : curr);
            id = id + 1;
            // get pizza topping using pizza id
            const { toppings, pizza } = args;
            // treate topping as another table so you also need to get topping using current topping id!
            const toppingRecords = toppings.map(({ id }) => pizzaToppings.find(({ id: pizzaToppingId }) => pizzaToppingId === id));
            const data = { id, toppings: toppingRecords, pizza };
            pizzas.push(data);
            return data;
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
};
