import { Component } from "react";
import './furniture.scss';

class Furniture extends Component {
   
    constructor(props){
        super(props);
        this.onChangeHeight = this.onChangeHeight.bind(this);
        this.onChangeWidth = this.onChangeWidth.bind(this);
        this.onChangeLenght = this.onChangeLenght.bind(this);   
        this.state = {
            height: '',
            widht: '',
            lenght: '',
            errors: {}        
        }
    }

    onChangeHeight(e) {
        this.setState({
            height: e.target.value 
            
        });
    }
    onChangeWidth(e) {
        this.setState({
            widht: e.target.value 
            
        });
    }
    onChangeLenght(e) {
        this.setState({
            lenght: e.target.value 
            
        });
    }
    onCheck = (e) =>{
        const {height, widht, lenght} = this.state;
        const errors = {};
        if ((height === "") || (widht === "") || (lenght === "")) {
            this.setState({errors});
        } else {
        this.props.data.onChangeUnit(document.getElementById("height").value+
         'x'+document.getElementById("width").value+'x'+document.getElementById("length").value, "CM")

        }
    }
     
    render() { 
        return (
            <div className="form-furniture">
            <form id="Furniture" onChange={this.onCheck}>
                <div >
                    <label>Height (CM)</label>
                    <input id="height" type="text" className="form-height"
                    value={this.state.height}
                    onChange={this.onChangeHeight} />
                </div>  
                <div >
                    <label>Widht (CM)  </label>
                    <input id="width" type="text" className="form-widht"
                    value={this.state.widht}
                    onChange={this.onChangeWidth} />
                </div>
                <div >
                    <label>Length (CM)</label>
                    <input id="length" type="text" className="form-lenght"
                    value={this.state.lenght}
                    onChange={this.onChangeLenght} />
                </div>
                <p>{this.props.data.err.paramLenght}</p>
                <p>{this.props.data.err.paramChar}</p>
                <div>Please provide dimensions HxWxL</div>
            </form>
            
        </div>
        );
    }
}
 
export default Furniture;