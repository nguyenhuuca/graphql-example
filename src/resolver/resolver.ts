
import {pizzaToppings, pizzas} from "../model/pizzaModel.js";

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
export const resolvers = {
        Query: {
            pizzas: (parent, args, context) => {
                const { pizza } = args;
                const name = pizza;
                if(name){
                    // this is fake implementation of simple string matching
                    // on production environment you would want to query from real database!
                    return [pizzas.find(({pizza})=> pizza === name)];
                }
                return pizzas
            },
            pizza: (parent, args, context) => {
                const { id } = args;
                if(id){
                    // this is fake implementation of simple id matching
                    // on production environment you would want to query from real database!
                    return pizzas.find(({id: pizzaId})=> pizzaId === id);
                }
                return undefined
            },

            fetchPizza: async (_, { id }, { dataSources }) => {
                const pizzas =  await dataSources.pizzaAPI.getPizza()
                console.log(pizzas);
                return pizzas
            },
        },
        Mutation: {
            createPizza: async (parent, args, {dataSources}) => {
                console.log(args);
                // get pizza topping using pizza id
                const { toppings, pizza } = args;
                // treate topping as another table so you also need to get topping using current topping id!
                const toppingRecords = toppings.map(({id})=> pizzaToppings.find(({id: pizzaToppingId})=> pizzaToppingId === id))

                // generate id
                let id = Math.floor(100000 + Math.random() * 900000)
                const newItem = {id, toppings: toppingRecords, pizza}

                const rs = await dataSources.pizzaAPI.createPizza(newItem)
                console.log("Make new pizza successfully");
                return rs

            },
            updatePizza: (parent, args, context) => {
                // get current pizza record using pizza id
                const { id, pizza, toppings } = args;

                const index = pizzas.findIndex((pizza) => pizza.id === id)

                // treate topping as another table so you also need to get topping using current topping id!
                const toppingRecords = toppings.map(({id})=> pizzaToppings.find(({id: pizzaToppingId})=> pizzaToppingId === id))

                pizzas[index] = { id, toppings: toppingRecords, pizza}
                return pizzas[index];
            },
        },
        Pizza: {
            pizza: (item) =>{
                return item.pizza + "!"

            }
        }
  };