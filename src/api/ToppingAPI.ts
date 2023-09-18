import {RESTDataSource} from "@apollo/datasource-rest";
import {Topping} from "../model/types";

export class ToppingAPI extends RESTDataSource {
    override baseURL = 'http://localhost:3000/';

    async getToppings(): Promise<Topping[]>{
        return this.get<Topping[]>('toppings');
    }

    async getToppingById(id): Promise<Topping>{
        return this.get<Topping>(`toppings/${id}`);
    }

}
