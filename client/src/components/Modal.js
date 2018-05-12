import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class QfModal extends React.Component {
   
  constructor(props){
      super(props);
      this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.toggle();
      if(this.props.modalFunction)
        this.props.modalFunction();
      
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.props.toggle}>{this.props.title}</ModalHeader>
          <ModalBody>
{
this.props.text
}   
       </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>this.handleClick()}>{this.props.btntext}</Button>{' '}
            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default QfModal;