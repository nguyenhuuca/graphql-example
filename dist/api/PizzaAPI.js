import { RESTDataSource } from "@apollo/datasource-rest";
export class PizzaAPI extends RESTDataSource {
    constructor() {
        super(...arguments);
        this.baseURL = 'http://localhost:3000/';
    }
    async getPizzas() {
        return this.get('pizzas');
    }
    async getPizzaById(id) {
        return this.get(`pizzas/${id}`);
    }
    async getPizzaByPaging(offset, limit, sortName, order) {
        return this.get(`pizzas?_start=${offset}&_limit=${limit}&_sort=${sortName}&_order=${order}`);
    }
    async createPizza(pizza) {
        return this.post('pizzas', { body: pizza });
    }
    async updatePizza(pizza) {
        return this.put(`pizzas/${pizza.id}`, { body: pizza });
    }
}
