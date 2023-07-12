import {RESTDataSource} from "@apollo/datasource-rest";
import {Pizza} from "../model/types";

export class PizzaAPI extends RESTDataSource {
    override baseURL = 'http://localhost:3000/';

    async getPizza(): Promise<Pizza>{
        return this.get<Pizza>('pizzas');
    }

    async createPizza(pizza) {
        return this.post(
            'pizzas',
            {body: pizza}
        )
    }
}
