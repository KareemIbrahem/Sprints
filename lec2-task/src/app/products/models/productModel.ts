export class Product{
    nameProduct: string;
    imageProduct: string;
    priceProduct: number;
    isAvailable: boolean;
    isFeatured: boolean;
    constructor(nameProduct?: string, imageProduct?: string, priceProduct?: number, isAvailable?: boolean, isFeatured?:boolean){
        this.nameProduct = nameProduct??"";
        this.imageProduct = imageProduct??"../../../assets/product-1.jpg";
        this.priceProduct = priceProduct??0;
        this.isAvailable = isAvailable??false;
        this.isFeatured = isFeatured??false;
    }
}