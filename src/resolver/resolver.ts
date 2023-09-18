
//import {pizzaToppings, pizzas} from "../model/pizzaModel.js";
import {Topping} from "../model/types";

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
export const resolvers = {
        PizzaStatus: {
            AVAILABLE: 'AVAILABLE',
            COOKING: 'COOKING',
            UNAVAILABLE: 'UNAVAILABLE',
        },
        Query: {
            fetchPizzaById: async (parent, { id }, { dataSources }) => {
                if(id){
                    const pizzas =  await dataSources.pizzaAPI.getPizzaById(id)
                    console.log(pizzas);
                    return pizzas
                }
                return undefined
            },

            fetchPizzas: async (_, { id }, { dataSources }) => {
                const pizzas =  await dataSources.pizzaAPI.getPizzas()
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
                const pizzaToppings: Topping[] = await dataSources.toppingAPI.getToppings()
                const toppingRecords = toppings.map(({id})=> pizzaToppings.find(({id: pizzaToppingId})=> pizzaToppingId === id))

                // generate id
                let id = Math.floor(100000 + Math.random() * 900000)
                const newItem = {id, toppings: toppingRecords, pizza, status: "COOKING"}

                const rs = await dataSources.pizzaAPI.createPizza(newItem)
                console.log("Make new pizza successfully");
                return rs

            },
            updatePizza: async (parent, args, {dataSources}) => {
                // get current pizza record using pizza id
                const { id, pizzaStatus } = args;

                const pizzas =  await dataSources.pizzaAPI.getPizzaById(id)

                // treate topping as another table so you also need to get topping using current topping id!
                //const toppingRecords = toppings.map(({id})=> pizzaToppings.find(({id: pizzaToppingId})=> pizzaToppingId === id))

                const updateITem = { id, toppings: pizzas.toppings, pizza :pizzas.pizza, pizzaStatus}
                const rs = await dataSources.pizzaAPI.updatePizza(updateITem)
                console.log("Update pizza successfully");
            },
        },
        Pizza: {
            pizza: (item) =>{
                return item.pizza + "!"

            }
        }
        // VariousPizza: {
        //     __resolveType(obj, context, info){
        //         // if Pizza have a dough then it mean it is ChicagoPizza
        //         if(obj.dough){
        //             return 'ChicagoPizza';
        //         }else if(obj.sauce){
        //             // if Pizza have a dough then it mean it is ChicagoPizza
        //             return 'DominoPizza';
        //         } else{
        //             return 'Pizza';
        //         }
        //     },
        // }

  };