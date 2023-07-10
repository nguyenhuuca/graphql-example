import {RESTDataSource} from "@apollo/datasource-rest";
import {Pizza} from "../model/types";

export class PizzaAPI extends RESTDataSource {
    override baseURL = 'https://mocki.io/v1/aaf0c987-bb14-4d20-bc03-68cb2b4e4489';

    async getPizza(): Promise<Pizza>{
        return this.get<Pizza>('');
    }
}
