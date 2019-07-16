import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Order Entry Screen UI';

  pizzaOffers = [{name:' Offer 1 '},{name:'Offer 2'},{name:'Offer 3'}]
  pizzaSizes = [{name:'Toppings'} , {name:'Small ($5)'},{name:'Medium ($7)'},{name:'Large ($8)'},{name:'Extra Large ($9)'}];
  pizzaToppingsVeggies = [{name:'Tomatoes ( $1.00)',price:1.00},{name:'Onions ($0.50)',price:0.50},{name:'Bell pepper ($1.00)',price:1.00},{name:'Mushrooms ($1.20)',price:1.20},{name:'Pineapple ($0.75)',price:0.75}]
  pizzaToppingMeats = [{"description":"topping","name":'Sausage ($1.00)',"price":1.00},{"description":"topping","name":'Pepperoni ($2.00)',"price":2.00},{"description":"topping","name":'Barbecue chicken ($3.00)',"price":3.00}]

  myForm: FormGroup;

  Totalemails:any[] = [];
  Totalemails2:any[] = [];
  Totalemails3:any[] = [];
  Totalemails4:any[] = [];

  TotalAmount:number = 0;
  TotalAmount2:any = 0 ;
  TotalAmount3:any = 0 ;
  TotalAmount4:any = 0;
  myjson:any=JSON;
  

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      useremail: this.fb.array([])
    });
  }

  offer1(isChecked: boolean){
    if (isChecked && this.Totalemails2.length == 2) {
    this.TotalAmount2 = 5
    }else{
      this.TotalAmount2 = this.Totalemails2.reduce((a, b) => a + b, 7) 
    }
  }
  offer2(isChecked: boolean){
    this
    if (isChecked && this.Totalemails2.length == 8) {
    this.TotalAmount2 = 9
    }else{
      this.TotalAmount2 =this.Totalemails2.reduce((a, b) => a + b, 7) 
    }
  }
  

  offer3(isChecked: boolean){
    var val = "Barbecue chicken ($3.00)";
    var val2 = "Pepperoni ($2.00)";


    var index = this.Totalemails3.findIndex(function(item, i){
      return item.name === val
    });

    var index2 = this.Totalemails3.findIndex(function(item, i){
      return item.name === val2
    });

    console.log("dsadsada" + index + " " + index2);
    if (isChecked && index > -1  && index2 > -1 && this.Totalemails3.length == 2 || isChecked && index > -1 && this.Totalemails3.length == 3 ||  isChecked && index2 > -1 && this.Totalemails3.length == 3 || isChecked && this.Totalemails3.length == 4 && index <=-1  && index2 <= -1) {
      this.TotalAmount3.undefined =  this.TotalAmount3.undefined /2
    }else{
      this.TotalAmount3 = this.Totalemails3.reduce((c, v) => {
        c[v.description] = (c[v.description] || 8) + v.price;
        return c;
      }, {});
    }
  }
  onChange(email: string, isChecked: boolean, pizzaSize: string,pizzaToppingName:string) {
    const emailFormArray = <FormArray>this.myForm.controls.useremail;
    var obj = {};

    if (isChecked) {
      emailFormArray.push(new FormControl(email));
      if (pizzaSize == 'small'){
        console.log(this.Totalemails.push(email))
      }else if(pizzaSize == 'medium'){
        console.log(this.Totalemails2.push(email))
      }else if(pizzaSize == 'large'){
        obj['price'] = email;
        obj['name'] = pizzaToppingName;
        console.log(this.Totalemails3.push(obj))
      }else if(pizzaSize == 'Extra large'){
        console.log(this.Totalemails4.push(email))
      }
      
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == email)
      emailFormArray.removeAt(index);
      if (index > -1) {
      let index2 = this.Totalemails3.findIndex(obj => obj.name==pizzaToppingName);
      console.log("index gh"+ index2);
        if(pizzaSize == 'small'){
          this.Totalemails.splice(index, 1);
        }else if(pizzaSize == 'medium'){
          this.Totalemails2.splice(index, 1);
        }else if(pizzaSize == 'large'){
          this.Totalemails3.splice(index, 1);
        }else if(pizzaSize == 'Extra large'){
          this.Totalemails4.splice(index, 1);
        }
      }
    }
    console.log(this.TotalAmount = this.Totalemails.reduce((a, b) => a + b, 0) > 0 ? this.TotalAmount =this.Totalemails.reduce((a, b) => a + b, 5) :0)
    console.log(this.TotalAmount2 = this.Totalemails2.reduce((a, b) => a + b, 0)  > 0 ? this.TotalAmount2 =this.Totalemails2.reduce((a, b) => a + b, 7) :0)
    
      this.TotalAmount3 = this.Totalemails3.reduce((c, v) => {
        c[v.description] = (c[v.description] || 8) + v.price;
        return c;
      }, {});

    console.log(JSON.stringify(this.TotalAmount3.undefined));
    console.log(this.TotalAmount4 = this.Totalemails4.reduce((a, b) => a + b, 0) > 0 ? this.TotalAmount4 =this.Totalemails4.reduce((a, b) => a + b, 9) :0)
    console.log(JSON.stringify(this.Totalemails3))
    console.log(this.Totalemails3.length)

  }

}