import { Component } from "react";
import './dvd.scss';

class Dvd extends Component {
    constructor(props){
        super(props);
        this.onChangeHeight = this.onChangeHeight.bind(this);
        
        this.state = {
            size: '',
        }
    }

    onChangeHeight(e) {
        this.setState({
            size: e.target.value 
            
        });
        this.props.data.onChangeUnit(document.getElementById('size').value, "MB");
    }
    render() { 
        return (
            <div>
                <div className="form-dvd" >
                    <label>Size (MB)</label>
                    <input id='size' type="text" 
                    className="form-size"
                    value={this.state.size}
                    onChange={this.onChangeHeight}
                     />
                </div>
                <p>{this.props.data.err.paramLenght}</p>
                <div>Please provide size in MB</div>
            </div>
        );
    }
}
 
export default Dvd;