import React from "react";
import '../../stylesheets/individuals.css';
import Button from 'react-bootstrap/Button';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { AiFillLock } from 'react-icons/ai';

class IndividualsCard extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         toggleChecked: true,
         amountMonth: this.props.option_basic_cost
      }
   }

   renderTooltip = (props, text) => {
      return (
      <Tooltip id="nofall-tooltip" {...props}>
         {text}
      </Tooltip>
      );
    }

    renderTooltipBase = (text) => {
      if (text){
         return (<OverlayTrigger
            placement={this.props.tooltipPlacement || 'right'}
            delay={{ show: 250, hide: 400 }}
            overlay={this.renderTooltip(this.props, text)}
         >
            <AiOutlineQuestionCircle className="h5 mb-4"/>
         </OverlayTrigger>);
      }
    }

   handleCheckedPress = () => {
      this.setState({ toggleChecked: !this.state.toggleChecked, amountMonth: !this.state.toggleChecked ? this.props.option_basic_cost : this.props.option_advanced_cost })
    }

   renderButton = () =>{
      if (this.props.login_locked && !localStorage.getItem('steam_id')){
         return(
            <OverlayTrigger
               placement='top'
               delay={{ show: 250, hide: 400 }}
               overlay={this.renderTooltip(this.props, 'Необходимо войти, чтобы приобрести данный товар')}
            >
               <div>
               <Button variant="success" disabled href={this.state.toggleChecked ? this.props.option_basic_link : this.props.option_advanced_link} className="btn-price">
                  <AiFillLock className="mb-1"/>
                  {this.state.amountMonth}₽
               </Button>
               </div>
            </OverlayTrigger>
         )
      }

      return(<Button variant="success" href={this.state.toggleChecked ? this.props.option_basic_link : this.props.option_advanced_link} className="btn-price">{this.state.amountMonth}₽</Button>)
   }

    render() {
        return(
            <div className="individuals-card" id="ind-card" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${this.props.img_url})`}}>
               <h2>{this.props.name}{this.renderTooltipBase(this.props.tooltip)}</h2>
               {this.renderButton()}
               <BootstrapSwitchButton 
                  checked={this.state.toggleChecked}
                  onlabel={this.props.option_basic_name}
                  onstyle='danger'
                  offlabel={this.props.option_advanced_name}
                  //size="m"
                  offstyle='primary'
                  style='w-50 mx-3'
                  onChange={() => {
                     this.handleCheckedPress()
                  }}
               />
            </div>
        );
    }
}

export default IndividualsCard;