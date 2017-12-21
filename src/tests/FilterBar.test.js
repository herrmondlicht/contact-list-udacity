import { shallow , configure} from 'enzyme';
import FilterBarFactory from '../components/FilterBar';
import { assert } from 'chai';
import React from "react"
import Adapter from 'enzyme-adapter-react-16'
import sinon, { stub } from 'sinon'

configure({adapter: new Adapter()})

describe("Renderiza componente de filtro", () => {
  const FilterBar = FilterBarFactory(React);

  it("que deve retornar uma function", () => {
    assert.isFunction(FilterBar, "Não é uma função");
  });
  it("que possui um Input com método de alteração de filter no onChange", () => {
    const wrapper = shallow(<FilterBar updateFilter={()=>{}}/>);
    const actual = wrapper.find('input').prop('onChange');
    const expected = wrapper.instance().updateFilterHandler;
    assert.equal(actual,expected, "Componente não renderizou");
  });

  
  it("que possui um componente Link que envia o usuário ao /create", () => {
    const wrapper = shallow(<FilterBar updateFilter={()=>{}}/>);
    const actual = wrapper.find('Link[to="/create"]').length;
    const expected = 1;
    assert.equal(actual,expected,"Componente Link não renderizou");
  });



  it("que possui uma função updateFilter usada para atualizar o filtro", () => {
    const event = {
      target: {
        value:"teste",
      }
    }
    const updateFilterStub = stub();
    const wrapper = shallow(<FilterBar updateFilter={updateFilterStub} search="teste" />);
    wrapper.instance().updateFilterHandler(event);
    sinon.assert.calledWithExactly(updateFilterStub,event.target.value);
  });
})
