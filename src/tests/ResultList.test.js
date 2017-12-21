import { shallow, configure } from 'enzyme';
import ResultListFactory from '../components/ResultList';
import sinon, { stub } from 'sinon'
import { assert } from 'chai';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()})

describe("Componente ResultList", () => {
  const ResultList = ResultListFactory(React);

  it("que deve renderizar uma lista de contatos com o array recebido", () => {
    assert.isFunction(ResultList)
  })

  it("que deve ter um botão de remover com a função de remoção", () => {
    const onDeleteContactStub = stub();
    const contacts = [
      {
        id:1,
        name:'Guilherme',
        email:'guilherme@mail.com',
      }
    ];
    const wrapper = shallow(<ResultList contacts={contacts} onDeleteContact={onDeleteContactStub} />);
    wrapper.find('button').simulate('click');
    sinon.assert.calledWithExactly(onDeleteContactStub,contacts[0]);
  });

})
