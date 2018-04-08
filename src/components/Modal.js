import React, { Component } from 'react';
import { getThumb, openModal } from '../utilies';
import {domain} from '../config.json';
import '../styles/modal.css';

class Modal extends Component {
  componentDidMount(){
    openModal()
  }

  componentDidUpdate(){
    openModal()
  }

  render() {
    let {
          snippet,
          pub_date,
          source,
          multimedia,
        } = this.props.modal_data,
        imgUrl = getThumb(multimedia, 'articleLarge');
    return (
      <div id="modal" className="modal fade" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h3 className="title mb-0">{source}</h3>
              <div className="info font-weight-light font-italic mb-3">
                <small>{pub_date}</small>
              </div>
              <div className="row">
                <div className="col-sm-8 offset-sm-2 mt-3 mb-3">
                  { imgUrl ? <img src={domain+imgUrl} alt="thumb" className="img-fluid rounded mx-auto d-block mb-3"/> : ''}
                  <div className="snippet">
                    <p className="mb-0">{snippet}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
