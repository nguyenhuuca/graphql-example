// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # Schema Type
  interface IPizza {
    id: Int!
    pizza: String!
    toppings: [Topping!]!
    status: PizzaStatus
  }

  enum PizzaStatus {
    AVAILABLE,
    COOKING
    UNAVAILABLE
  }
  type Pizza implements IPizza{
    id: Int!
    pizza: String!
    toppings: [Topping!]!
    status: PizzaStatus
  }
  
  type Topping {
    id: Int!
    topping: String!
  }
  
  input ToppingInput {
    id: Int!
  }

  type Query {
    fetchPizzaById(id: Int): Pizza!
    fetchPizzas: [Pizza]
  }
  
  type Mutation {
    createPizza(pizza: String, toppings: [ToppingInput!]!): Pizza!
    updatePizza(id: Int!, pizza: String, toppings: [ToppingInput]): Pizza!
}
`

