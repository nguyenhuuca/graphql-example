import {RESTDataSource} from "@apollo/datasource-rest";
import {Pizza} from "../model/types";

export class PizzaAPI extends RESTDataSource {
    override baseURL = 'http://localhost:3000/';

    async getPizzas(): Promise<Pizza>{
        return this.get<Pizza>('pizzas');
    }

    async getPizzaById(id): Promise<Pizza>{
        return this.get<Pizza>(`pizzas/${id}`);
    }

    async getPizzaByPaging(offset, limit, sortName, order): Promise<Pizza[]>{
        return this.get<Pizza[]>(`pizzas?_start=${offset}&_limit=${limit}&_sort=${sortName}&_order=${order}`);
    }

    async createPizza(pizza) {
        return this.post(
            'pizzas',
            {body: pizza}
        )
    }

    async updatePizza(pizza) {
        return this.put(
            `pizzas/${pizza.id}`,
            {body: pizza}
        )
    }
}
