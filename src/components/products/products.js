import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import './products.scss';
class Products extends Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
        this.state = {posts: [], toDelete: []};     
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

onDelete (e) {
    let i;
    let myArr= [...this.state.toDelete];
    const checkboxes = document.getElementsByClassName('delete-checkbox');
    console.log(checkboxes.value);
    for (i=0; i<checkboxes.length;i++){
    if (checkboxes[i].checked===true){myArr.push(document.getElementsByClassName('delete-checkbox')[i].value); this.setState({ toDelete: myArr }); console.log(this.state.toDelete)}
    }
    const obj = {
        id: myArr      
    }
    console.log(obj);
    axios.post('https://juniortest-arkadijs-kudrjavcevs.000webhostapp.com/delete.php',myArr)
       
    .then(window.location.href="/")
          
       .catch(err => console.log(err));
}
    
    render() { 
        return ( 
            <div>
                 <div className="header">
                    <div className="header-text"><h1>Product List</h1></div>
                        <div className="buttons">
                             <div><Link to="/add-product"><button>ADD</button></Link></div>
                             <div><button id="delete-product-btn" onClick={this.onDelete} >MASS DELETE</button></div>
                         </div>
                </div>
                 <div className="products">
                     {this.state.posts.map((productItem, i) => (
                      <div className="card"  >
                         <div className='products-text'>
                             <input type="checkbox" 
                            className="delete-checkbox"
                            onChange={this.onChecked}
                            value={productItem.id}
                             ></input>
                   <div className="product-info">
                   <p>{productItem.sku}</p>
                   <p>{productItem.name}</p>
                   <p>{productItem.price} $</p>
                   <p>{ productItem.measurement === "MB" ? (
                    ("Size ")
                   ) : productItem.measurement === "KG" ? (
                    ("Weight ")
                     ) : productItem.measurement === "CM" ? (
                    ("Dimensions ")
                   ) : null }{productItem.size}  {productItem.measurement === "MB" ? (
                    ("MB" )
                             ) : productItem.measurement === "KG" ? (
                    ("KG")
                             )  : null }</p>
                     </div>          
                   </div>
               </div>
                  ) ) }
            </div>
            </div>
         );
    }
}
 
export default Products;