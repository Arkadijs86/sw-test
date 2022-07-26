import { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Dvd from "../dvd/Dvd";
import Book from "../books/Book";
import Furniture from "../furniture/Furniture";
import './add.scss';

class Add extends Component {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            title: '',
            text: '',
            price: '',
            unit: '',
            category: 'DVD',
            measurement : '',
            errors: {},
            posts: []
        }
    }

    onChangeUnit(item, mes) {
       
        this.setState({
            unit: item ,
            measurement: mes
        });
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value, 
            unit: ''
        });
        console.log(document.getElementById("size").value);
    }

    componentDidMount(){
        axios.get('https://juniortest-arkadijs-kudrjavcevs.000webhostapp.com/list.php')
        .then(response => {
            this.setState({ posts: response.data });
        })
        .catch(function(error) {
            console.log(error);
        })  
    }
 
    formValidation = () => {
        const {title, text, price, unit} = this.state;
        let isValid =true;
        const errors = {};
        const isFound = this.state.posts.some(element => {
            if (element.id === title) {
              return true;
            }

            return false;
          });
        if (title.length === 0) {
            errors.titleLength = "Please, submit required data";
            isValid = false;
        } else
        if (isFound) {
            errors.titleLength = "SKU already exists";
            isValid = false;
        }
        if (text.length === 0) {
            errors.textLength = "Please, submit required data";
            isValid = false;
        }
        if (price.length === 0) {
            errors.priceLength = "Please, submit required data";
            isValid = false;
        } else
        if (!(/^\d+(?:\.\d{1,2})?$/.test(price))) {
            errors.priceType = "Please, provide the data of indicated type";
            isValid = false;
        } 
        if (unit.replace('x', '').replace('x', '').length === 0 ){
            errors.paramLenght = "Please, submit required data";
            isValid = false;
        } else
        if (!(/^\d+(?:\.\d{1,2})?$/.test(unit.replace('x', '').replace('x', '')))) {
            errors.paramChar = "Please, provide the data of indicated type";
            isValid = false;
        } 

        this.setState({errors});
        return isValid;  
    }

    onSubmit(e) {
        e.preventDefault();
       const isValid = this.formValidation();
      
       
        if (isValid===true) {

            const obj = {
                sku: this.state.title,
                name: this.state.text,
                price: this.state.price,
                unit: this.state.unit,
                measurement: this.state.measurement
                
            };
            this.setState({
                title: '',
                text: '',
                price: '',
                unit: '',
                category: 'DVD',
                measurement : '',
                errors: {},
                posts: []
            });
           
            console.log(obj);

            axios.post('https://juniortest-arkadijs-kudrjavcevs.000webhostapp.com/insert.php',obj)
        .then(window.location.href="/");
       
        }
     }  
       
       

    render() { 
        
        return ( 
            <div className="main" >   
           
                <form id="product_form" onSubmit={this.onSubmit} > 
                    <div className="header">
                        <div className="header-text"><h1>Product Add</h1></div>
                            <div className="buttons">
                                 <div><button type="submit" >Save</button></div>
                                 <div><Link to="/"><button>Cancel</button></Link></div>
                            </div>
                    </div>
                     <div className="form">
                        <div   >
                             <label>SKU </label>
                             <input type="text" 
                             id="sku"
                             name="title"
                             value={this.state.title}
                             className="form-sku"
                             onChange={this.onChange} />
                        </div>
                     <p>{this.state.errors.titleLength}</p>
                     <div  >
                            <label>Name</label>
                            <input type="text" 
                            id="name"
                            name="text"
                            value={this.state.text}
                            className="form-name"
                            onChange={this.onChange} />
                     </div>
                     <p>{this.state.errors.textLength}</p>
                     <div >
                          <label>Price ($) </label>
                          <input type="text" 
                          name="price"
                          id="price"
                          value={this.state.price}
                          className="form-price"
                          onChange={this.onChange} />
                     </div>
                    <p>{this.state.errors.priceLength}</p>
                    <p>{this.state.errors.priceType}</p>
                     <div >
                        <label>Type Switcher </label>
                        <select name="category" value={this.state.category} onChange={this.onChange} id="productType">
                        <option  value="DVD">DVD</option>
                        <option  value="Furniture">Furniture</option>
                        <option  value="Book">Book</option>
                         </select>
                    </div>
                    { this.state.category === "DVD" ? (  
                    <div><Dvd data={
                    {unit:this.state.unit, err:this.state.errors, onChangeUnit: this.onChangeUnit.bind(this)}
                     }
                     /></div>
                    ) : this.state.category === "Book" ? (
                     <div><Book data={
                    {unit:this.state.unit, err:this.state.errors, onChangeUnit: this.onChangeUnit.bind(this)}
                     }
                     /></div>
                     ) : this.state.category === "Furniture" ? (
                     <div><Furniture data={
                    {unit:this.state.unit, err:this.state.errors, onChangeUnit: this.onChangeUnit.bind(this)}
                     }
                      /></div>
                     ) : null }
                     </div>
                </form>
               
            </div>
         );
    }
}
 
export default Add;