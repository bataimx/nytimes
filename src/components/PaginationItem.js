import React, { Component } from 'react';

class PaginationItem extends Component {

  render() {
    return (
      <li
        onClick={()=>{ this.props.onUpdatePage(this.props.content) }} 
        className={`page-item ${this.props.active? this.props.active: ''}`}>
        <a className="page-link">{this.props.children}</a>
      </li>
    );
  }
}

export default PaginationItem;
