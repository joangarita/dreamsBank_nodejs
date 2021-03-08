import { ProductsDao } from "../../infrastructure/dao/products.dao";
import { ProductsRepository } from "../interfaces/productsRepository.interface";

class ProductsService{
    repository: ProductsRepository;
    constructor(repository: ProductsRepository){
        this.repository = repository;
    }

    public async requestProduct(productId: string, userId: string){
        return this.repository.requestProduct(productId,userId);
    }

}

export default new ProductsService(new ProductsDao);