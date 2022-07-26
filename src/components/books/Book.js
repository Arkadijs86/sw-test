import { Component } from "react";
import './book.scss';

class Book extends Component {
    state = {  } 
    render() { 
        return (
            <div>
                
                <div className="form-book" >
                    <label>Weight (KG)</label>
                    <input type="text" className="form-weight"
                    id="weight"
                    value={this.props.data.unit}
                    onChange={(e)=>this.props.data.onChangeUnit(e.target.value, "KG")} />
                </div>
                <p>{this.props.data.err.paramLenght}</p>
                <div>Please provide weight in KG</div>
            </div>
        );
    }
}
 
export default Book;