// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
export const resolvers = {
    PizzaStatus: {
        AVAILABLE: 'available',
        COOKING: 'cooking',
        UNAVAILABLE: 'unavailable',
    },
    Query: {
        fetchPizzaById: async (parent, { id }, { dataSources }) => {
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
        fetchPaging: async (_, { offset, limit, sortInput }, { dataSources }) => {
            const pizzas = await dataSources.pizzaAPI.getPizzaByPaging(offset, limit, sortInput.name, sortInput.order);
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
            const pizzaToppings = await dataSources.toppingAPI.getToppings();
            const toppingRecords = toppings.map(({ id }) => pizzaToppings.find(({ id: pizzaToppingId }) => pizzaToppingId === id));
            // generate id
            let id = Math.floor(100000 + Math.random() * 900000);
            const newItem = { id, toppings: toppingRecords, pizza, status: "cooking" };
            const rs = await dataSources.pizzaAPI.createPizza(newItem);
            console.log("Make new pizza successfully");
            return rs;
        },
        updatePizza: async (parent, args, { dataSources }) => {
            // get current pizza record using pizza id
            const { id, pizzaStatus } = args;
            const pizzas = await dataSources.pizzaAPI.getPizzaById(id);
            // treate topping as another table so you also need to get topping using current topping id!
            //const toppingRecords = toppings.map(({id})=> pizzaToppings.find(({id: pizzaToppingId})=> pizzaToppingId === id))
            const updateITem = { id, toppings: pizzas.toppings, pizza: pizzas.pizza, status: pizzaStatus };
            const rs = await dataSources.pizzaAPI.updatePizza(updateITem);
            console.log("Update pizza successfully");
            return rs;
        },
    },
    Pizza: {
        pizza: (item) => {
            return item.pizza + "!";
        }
    },
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
