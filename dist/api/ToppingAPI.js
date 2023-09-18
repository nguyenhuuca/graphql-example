import { RESTDataSource } from "@apollo/datasource-rest";
export class ToppingAPI extends RESTDataSource {
    constructor() {
        super(...arguments);
        this.baseURL = 'http://localhost:3000/';
    }
    async getToppings() {
        return this.get('toppings');
    }
    async getToppingById(id) {
        return this.get(`toppings/${id}`);
    }
}
