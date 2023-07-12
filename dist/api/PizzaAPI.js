import { RESTDataSource } from "@apollo/datasource-rest";
export class PizzaAPI extends RESTDataSource {
    constructor() {
        super(...arguments);
        this.baseURL = 'http://localhost:3000/';
    }
    async getPizza() {
        return this.get('pizzas');
    }
    async createPizza(pizza) {
        return this.post('pizzas', { body: pizza });
    }
}
