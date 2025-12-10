export class ProductModel{
    constructor({id,nombre,precio,stock,descripcion,categoria,img}){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.descripcion = descripcion || "sin descripcion";
        this.categoria = categoria || "general";
        this.img = img || "https://placehold.co/600x400?text=Sin+Imagen"
    }
}