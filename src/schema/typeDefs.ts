// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # Schema Type

  enum PizzaStatus {
    AVAILABLE,
    COOKING
    UNAVAILABLE
  }
  type Pizza {
    id: Int!
    pizza: String!
    toppings: [Topping!]!
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

