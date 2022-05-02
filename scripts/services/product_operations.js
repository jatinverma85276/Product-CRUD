import {Product} from "../models/product.js";
export const productOperations = {
    products:[],
    editUpdations:[],
    getTotal(){
        return this.products.length;
    },
    removeMarked(){
        // remove all marked records permant
        //this.products = this.products.filter(product=> product.isMarkForDelete===false);
        this.products = this.products.filter(product=>!product.isMarkForDelete);
        return this.products;
    },
    toggleMarking(id){
        // Looking the id in array of objects
        let product = this.products.find(product=>product.id == id);
        if(product){
            product.isMarkForDelete = !product.isMarkForDelete;
        }
    },
    getMarkTotal(){
        return this.products.filter(product=>product.isMarkForDelete).length;
    },
    getUnmarkTotal(){
        return this.getTotal() - this.getMarkTotal();
    },
    // add : function(){} (Key and Value)
    // ES6 Object ShortHand Style
    add(productParam){
        //let product = new Product(productParam['id'], productParam['name'], productParam['desc'],productParam['date'], productParam['url'], productParam['price']);
        let product = new Product();
        for(let key in productParam){
            product[key] = productParam[key];
        }
        this.products.push(product);
        return product;
    },
    remove(){

    },
    search(searchBy, searchTerm){

        if(searchBy === "Search By Price"){
            this.editUpdations = this.products.filter(product=>product.price < parseInt(searchTerm));
            
        }else{
            this.editUpdations = this.products.filter(product=>product.name === searchTerm);
        }
        // console.log(pro);
        return this.editUpdations;
    },

    update(products){
        let id = products.id;
        const index = this.products.findIndex(object => {
            return products.id === id;
        })
        this.products[index] = products;
        return this.products;
    },

    sort(name){
        if(name === "ascending"){
            this.products = this.products.sort((first,second)=>first.name.localeCompare(second.name));
        }else if(name === "descending"){
            this.products = this.products.sort((first,second)=>second.name.localeCompare(first.name));
        }else if(name === "highToLow"){
            this.products = this.products.sort((first,second)=>first.price-second.price);
        }else{
            this.products = this.products.sort((first,second)=>second.price-first.price);
        }
        return this.products;
    }
}