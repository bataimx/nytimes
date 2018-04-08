import React, { Component } from 'react';
import PaginationItem from './PaginationItem';
import { lastPage } from '../utilies';

class Pagination extends Component {

  render() {
    let {
          currentPage,
          items_page,
          items_length,
          updatePage
        } = this.props,
        pageNumber = lastPage(items_length, items_page),
        li_item = [];

    for (var i = 1; i <= pageNumber; i++) {
      let active = i === currentPage ? 'active' : '';
      li_item.push(<PaginationItem
                      key={i}
                      active={active}
                      content={i}
                      onUpdatePage={(e)=>{ updatePage(e) }} >
                        {i}
                      </PaginationItem>);
    }

    return (
      <div>
        <ul className="pagination">
          <PaginationItem content={currentPage - 1} onUpdatePage={(e)=>{ updatePage(e) }} >Previous</PaginationItem>
          {li_item}
          <PaginationItem content={currentPage + 1} onUpdatePage={(e)=>{ updatePage(e) }} >Next</PaginationItem>
        </ul>
      </div>
    );
  }
}

export default Pagination;
