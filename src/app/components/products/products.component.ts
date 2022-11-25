import { Component } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { CartService } from 'src/app/services/cartservice.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
public productList: any;
public filterCategory:any;
public searchKey:string="";
constructor(private api:ApiServiceService,private cartService:CartService){}
ngOnInit():void{
this.api.getProduct().subscribe(res=>{
  this.productList=res;
  this.filterCategory=res;
  this.productList.forEach((a:any) => {
    if(a.category ==="women's clothing" ||a.category ==="men's clothing"){
      a.category="fashion";
    }
    Object.assign(a,{quantity:1,total:a.price});
  });
  console.log(this.productList)
}); 

 this.cartService.search.subscribe((val)=>{
  this.searchKey=val;
})
}
addtoCart(item:any): void{
this.cartService.addtoCart(item);
}
filter(category:string){
  this.filterCategory=this.productList.filter((a:any)=>{
    if(a.category ==category ||category==''){
      return a;
    }
  })
}
}
