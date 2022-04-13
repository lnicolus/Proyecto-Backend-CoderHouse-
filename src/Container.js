class Container{
    constructor (){
        this.products = [
            {
                "title": "FaberCastell Color Pencils",
                "price": 150.90,
                "id": 1,
                "thumbnail": "https://cdn-icons-png.flaticon.com/512/5434/5434492.png"
              },
              {
                "title": "Mundi Map",
                "price": 250,
                "id": 2,
                "thumbnail": "https://cdn-icons-png.flaticon.com/512/1243/1243420.png"
              },
              {
                "title": "Ruler",
                "price": 103.35,
                "id": 3,
                "thumbnail": "https://cdn-icons-png.flaticon.com/512/3791/3791118.png"
              }
        ];
    }

    save(product){
        try{
            let data = {
                title:product.title,
                price:product.price,
                thumbnail:product.thumbnail,
                id: this.products.length+1
            }
            this.products.push(data);
            return data;
        }catch(error){
            throw new Error(`Error on saving product ${error.message}`)
        }
    }

    getById(id){
        try{
            return this.products.find(i => i.id === id);
        }
        catch(err){
            throw new Error('ID does not exist');
        }
    }

    getAll(){ 
        try{
            return this.products;
        }
        catch(error){
            throw new Error(`Error ${error.message}`);
        }
    }
    
    deleteById(id){
        try {
            this.products = this.products.filter(prod => prod.id != idProduct)
        } catch(error){
            throw new Error(`Product was not eliminated ${error.message}`)
        }
    }

    deleteAll(){
        try{
             this.products = [];
        }
        catch(err){
            throw new Error(`Could not delete all products ${error.message}`);
        }
    }

    updateProduct(id, modifObj){
        try{
            const productIndex = this.products.findIndex(product => product.id == id);
            if(productIndex === -1) return {status:"error", message:"Product does not exist with ID " + id}
            else { 
                modifObj.id = Number(id);
                this.products[productIndex] = modifObj;
                return modifObj;
            };
        }catch(error){
            throw new Error(`Could not update ${error.message}`)
        }
    }
}

module.exports = Container;

