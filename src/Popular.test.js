import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import { spy } from 'sinon';
import chai, { expect } from "chai";
import PaginationItem from './components/PaginationItem';
import Pagination from './components/Pagination';
import Modal from './components/Modal';
import Article from './components/Article';
import Popular from './components/Popular';
import fetchMock from 'fetch-mock';
chai.use(require('sinon-chai'));

configure({ adapter: new Adapter() });


describe('Component: <PaginationItem/>', ()=>{
  let wrapper, onSpy, props;

  beforeEach(()=>{
    onSpy = spy();
    props = {
      'content': '1',
      'active': '',
      'onUpdatePage': onSpy
    };
    wrapper = shallow( <PaginationItem {...props} >1</PaginationItem> );
  });

  it('renders <PaginationItem/> without crashing', () => {
    expect(wrapper.length).to.equal(1);
  });

  it('renders <PaginationItem/> active class', () => {
    expect(shallow( <PaginationItem active="active" >1</PaginationItem> ).find('li.active').length).to.equal(1);
  });

  it('call <PaginationItem/> click', () => {
    wrapper.find('li').simulate('click');
    expect(onSpy).to.have.been.called;
  });
});


describe('Component: <Pagination/>', ()=>{
  let wrapper, onSpy, props;

  beforeEach(()=>{
    onSpy = spy();
    props = {
      'currentPage': 1,
      'items_page': 4,
      'items_length': 8,
      'updatePage': onSpy
    };
    wrapper = shallow( <Pagination {...props} /> );
  });

  it('renders <Pagination/> without crashing', () => {
    expect(wrapper.length).to.equal(1);
  });

  it('call <Pagination/> onUpdatePage', () => {
    wrapper.find(PaginationItem).forEach((node) => {
      node.prop('onUpdatePage')();
    });
    expect(onSpy).to.have.been.called;
  });
});


describe('Component: <Modal/>', ()=>{
  let wrapper, onSpy, props;

  beforeEach(()=>{
    onSpy = spy();
    props = {
      'modal_data':{
        'snippet': 'snippet',
        'pub_date': 'pub_date',
        'source': 'source',
        'multimedia': []
      }
    };
    wrapper = shallow( <Modal {...props} /> );
  });

  it('renders <Modal/> without crashing', () => {
    expect(wrapper.length).to.equal(1);
  });

  it('renders <Modal/> modal thumb with no multimedia', () => {
    props.modal_data.multimedia = [{crop_name:"articleLarge",url:"test.jpg"}];
    wrapper = shallow( <Modal {...props} /> );
    wrapper.instance().componentDidUpdate();
    expect(wrapper.length).to.equal(1);
  });

});


describe('Component: <Article/>', ()=>{
  let wrapper, onSpy, props;

  beforeEach(()=>{
    onSpy = spy();
    props = {
      data:{
        'snippet': 'snippet',
        'pub_date': 'pub_date',
        'source': 'source',
        'multimedia': [],
        '_id': '1'
      },
      'openModal': onSpy
    };
    wrapper = shallow( <Article {...props} /> );
  });

  it('renders <Article/> without crashing', () => {
    expect(wrapper.length).to.equal(1);
  });

  it('call <Article/> openModal', () => {
    wrapper.find('.article-wrapper').simulate('click');
    expect(onSpy).to.have.been.called;
  });

});


describe('Component: <Popular/>', ()=>{
  let wrapper, onSpy, props;

  beforeEach(()=>{
    onSpy = spy();
    props = {
      'items_page': 8
    };
    wrapper = shallow( <Popular {...props} /> );
    wrapper.setState({
      'news': [{_id:2},{_id:3},{_id:4}],
      'modal_id': 345
    });
    fetchMock.mock('*', { response: { docs: [{_id:5},{_id:3},{_id:4}] } } );
  });

  afterEach(()=>{
    fetchMock.restore();
  });

  it('renders <Popular/> without crashing', () => {
    expect(wrapper.length).to.equal(1);
  });

  it('renders <Popular/> run updatePage with page = 1', () => {
    wrapper.instance().updatePage(1);
    expect(wrapper.state().page).to.equal(1);
  });

  it('renders <Popular/> run updatePage with page = 10', () => {
    wrapper.instance().updatePage(10);
    expect(wrapper.state().page).to.not.equal(10);
  });

  it('renders <Popular/> run updatePage with page = 99', () => {
    wrapper.setState({
      page: 99
    });
    expect(wrapper.state().page).to.equal(99);
  });

  it('renders <Popular/> openModal with modal_id = 123', () => {
    wrapper.instance().openModal(123);
    expect(wrapper.state().modal_id).to.equal(123);
  });

  it('renders <Popular/> openModal with modal_id = null', () => {
    wrapper.instance().openModal();
    expect(wrapper.state().modal_id).to.equal(345);
  });

  it('renders <Popular/> componentDidMount', () => {
    wrapper.instance().componentDidMount();
    expect(fetchMock.called()).to.equal(true);
  });

});
