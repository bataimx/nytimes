import React, { Component } from 'react';
import Article from './Article';
import Modal from './Modal';
import Pagination from './Pagination';
import {api as nytimes_api } from '../config.json';
import { lastPage } from '../utilies';

class Popular extends Component {
  constructor(props){
    super(props);
    this.state = {
      requestFailed: false,
      modal_id: 0,
      page: 1
    };
    this.openModal = this.openModal.bind(this);
    this.updatePage = this.updatePage.bind(this);
  }

  componentDidMount(){
    // let api = '/asset/articlesearch.json';
    let api = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${nytimes_api}&q=singapore&page=0`;
    fetch(api)
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed");
        }
        return response
      })
      .then(d => d.json())
      .then(d => {
        this.setState({
          news: d.response.docs
        })
      }, () => {
        this.setState({
          requestFailed: true
        })
      })
  }

  openModal(id){
    if ( id == null )
      return false;

    this.setState({
      modal_id: id
    })
  }

  paginationItem(){
    let {news, page} = this.state,
        {items_page} = this.props,
        itemStart = items_page * (page - 1),
        itemEnd = (items_page * page) > news.length ? news.length : (items_page * page),
        arrayItems = [];
    if (itemStart > news.length) {
      return [];
    }
    for (var i = itemStart; i < itemEnd; i++) {
      arrayItems.push(news[i]);
    }
    return arrayItems;
  }

  updatePage(e){
    if ( e < 1 || e > lastPage(this.state.news.length, this.props.items_page) ) {
      return false;
    }
    this.setState({
      page: e,
      modal_id: 0
    })
  }

  render() {
    if (this.state.requestFailed) return <p>request Failed!</p>
    if (!this.state.news) return <p>Loading...</p>
    let {news, modal_id, page} = this.state,
        newsFilter = modal_id !== 0 ? news.filter(item => item._id === modal_id) : [],
        modal_data = newsFilter.length ? newsFilter[0] : '',
        listNews = this.paginationItem();
    return (
      <div className="container popular">
        <div className="row mt-3">
          { listNews.map((data, idx) => <Article key={idx} data={data} cls="col-md-4 col-sm-6 col-xs-12 mb-4" openModal={this.openModal} /> ) }
        </div>
        {modal_data ? <Modal modal_data={modal_data}/> : ''}
        <Pagination currentPage={page} updatePage={this.updatePage} items_page={this.props.items_page} items_length={news.length} />
      </div>
    );
  }
}

export default Popular;
