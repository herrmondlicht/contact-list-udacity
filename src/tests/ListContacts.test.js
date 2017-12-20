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

  it('deve obter um state com uma propriedade query (string)',() =>{
    const wrapper = shallow(<ListContacts contacts={[]} onDeleteContact={()=>{}} />);
    const query = wrapper.instance().state.query;
    assert.isString(query,"Não possui um state com um objeto query");
  });

  it('deve renderizar um input do tipo texto com uma função no onChange',() => {
    const wrapper = shallow(<ListContacts contacts={[]} onDeleteContact={()=>{}} />);
    const actual = wrapper.find('input[type="text"]').prop("onChange");
    const expected = wrapper.instance().updateQuery;
    assert.equal(actual,expected, "Não possui função correta no onChange");
  });

  it('deve renderizar um componente Link',() => {
    const wrapper = shallow(<ListContacts contacts={[]} onDeleteContact={()=>{}} />);
    const actual = wrapper.find('Link[to="/create"]').length;
    const expected = 1;
    assert.equal(actual,expected,"Não renderizou componente Link");
  });

  describe('deve retornar uma lista ordenada',() =>{
    const contacts = [
      {
        name:'Guilherme',
        email:'gui@mail.com',
        avatarURL:'',
        id:1,
      }
    ];

    const wrapper = shallow(<ListContacts contacts={contacts} onDeleteContact={()=>{("string retornada")}}/>)

    it('que deve renderizar um item da lista',()=>{
      const actual = wrapper.find('ol > li').length;
      const expected = 1;
      assert.equal(actual, expected, "Não renderizou a lista ordenada");
    });

    it('que deve possuir uma função no onClick do button Remove', () => {
      const actual = wrapper.find('ol > li > button').prop('onClick');
      assert.isFunction(actual,"Não possui função no onClick");
    });

    describe("que deve renderizar uma view de pesquisa quando há filtros aplicados", () => {
      it("que deve ter um botão para limpar os filtros", () => {
        const instance = wrapper.instance();
        const event = {
          target: {
            value: "Não pode retornar resultados válidos"
          }
        };
        const clearQueryFunction = instance.clearQuery;
        // instance.updateQuery(event);
        wrapper.setState({query:event.target.value})
        const actual = wrapper.find('div > div > button').prop('onClick');
        const expected = clearQueryFunction;
        assert.equal(actual, expected, "Não possui a função correta de limpar os filtros")
      });
    });
  });

  it('que possui uma função updateQuery que deve atualizar o state com o parâmetro recebido', () => {
    const event = {
      target:{
        value:"nova string",
      }
    }
    const wrapper = shallow(<ListContacts contacts={[]} onDeleteContact={()=>{("string retornada")}}/>)
    const instance = wrapper.instance();
    const setStateStub = stub(instance, "setState");
    instance.updateQuery(event);
    sinon.assert.calledWithExactly(setStateStub,{query:event.target.value})
  });

  it('que possui uma função clearQuery que limpa o parâmetro query no state', () => {
    const wrapper = shallow(<ListContacts contacts={[]} onDeleteContact={()=>{("string retornada")}}/>)
    const instance = wrapper.instance();
    const setStateStub = stub(instance,"setState");
    instance.clearQuery();

    sinon.assert.calledWithExactly(setStateStub,{query:""});
  });

});
