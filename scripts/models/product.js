export class Product{
    constructor(id, name, description, date, url, price){
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.url = url;
        this.price = price;
        this.isMarkForDelete = false;
    }
}

