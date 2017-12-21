import { shallow, configure } from 'enzyme';
import ListContactsFactory from '../components/ListContacts';
import sinon, { stub } from 'sinon'
import { assert } from 'chai';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()})

describe('ListContacts', () => {
  const ListContacts = ListContactsFactory(React);

  it('deve retornar a função ContactList',() =>{
    assert.isFunction(ListContacts);
  });

  it('deve obter um state com uma propriedade search (string)',() =>{
    const wrapper = shallow(<ListContacts contacts={[]} onDeleteContact={()=>{}} />);
    const search = wrapper.instance().state.search;
    assert.isString(search,"Não possui um state com um objeto search");
  });

  it("deve renderizar uma FilterBar", () => {
    const wrapper = shallow(<ListContacts contacts={[]} onDeleteContact={()=>{}} />);
    const actual = wrapper.find("FilterBar").length;
    const expected = 1;
    assert.equal(actual, expected, "Não renderizou o componente FilterBar")
  });

  it("deve renderizar uma ResultList", () => {
    const wrapper = shallow(<ListContacts contacts={[]} onDeleteContact={()=>{}} />);
    const actual = wrapper.find("ResultList").length;
    const expected = 1;
    assert.equal(actual, expected, "Não renderizou o componente ResultList")
  });

  it('deve possuir uma função updateFilter que deve atualizar o state com o parâmetro recebido', () => {
    const value = "nova string";
    const wrapper = shallow(<ListContacts contacts={[]} onDeleteContact={()=>{("string retornada")}}/>)
    const instance = wrapper.instance();
    const setStateStub = stub(instance, "setState");
    instance.updateFilter(value);
    sinon.assert.calledWithExactly(setStateStub,{search:value})
  });

  it('deve possuir uma função filterBySearch que filtra os resultados', () => {
    const contacts = [
      {name:'Guilherme'},
      {name:'Qualquer Nome'},
    ];
    const value = 'Guilherme';
    const wrapper = shallow(<ListContacts contacts={contacts} onDeleteContact={()=>{}}/>);
    wrapper.setState({search:value});
    const actual = wrapper.instance().filterBySearch(contacts).length;
    const expected = 1;
    assert.equal(expected, actual, "Não filtrou os contatos corretamente");

  })

  it('possui uma função clearFilter que limpa o parâmetro search no state', () => {
    const wrapper = shallow(<ListContacts contacts={[]} onDeleteContact={()=>{("string retornada")}}/>)
    const instance = wrapper.instance();
    const setStateStub = stub(instance,"setState");
    instance.clearFilter();

    sinon.assert.calledWithExactly(setStateStub,{search:""});
  });

});
