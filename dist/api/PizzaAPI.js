import { RESTDataSource } from "@apollo/datasource-rest";
export class PizzaAPI extends RESTDataSource {
    constructor() {
        super(...arguments);
        this.baseURL = 'https://mocki.io/v1/aaf0c987-bb14-4d20-bc03-68cb2b4e4489';
    }
    async getPizza() {
        return this.get('');
    }
}
