import { shallow , configure} from 'enzyme';
import CreateContactFactory from '../components/CreateContact';
import { assert } from 'chai';
import React from "react"
import Adapter from 'enzyme-adapter-react-16'
import sinon, { stub } from 'sinon'

configure({adapter: new Adapter()});

describe('CreateContact', () => {
  const serializeFormStub = stub();
  const CreateContact = CreateContactFactory(React,serializeFormStub);

  beforeEach(() => {
    serializeFormStub.reset();
  });

  it('deve retornar uma função',() => {
    const CreateContact = CreateContactFactory(React);
    assert.isFunction(CreateContact);
  });

  it('deve renderizar um componente Link',() => {
    const wrapper = shallow(<CreateContact/>);
    const actual = wrapper.find("Link[to='/']").length;
    const expected = 1
    assert.equal(actual,expected,'Componente link não renderizado');
  });

  it('deve renderizar um form', () => {
    const wrapper = shallow(<CreateContact/>);
    const handleSubmitFunction = wrapper.instance().handleSubmit;
    const actual = wrapper.find('form').prop('onSubmit');
    const expected = handleSubmitFunction;
    assert.equal(actual, expected, 'Componente form não renderizou');
  });

  it('deve renderizar um componente ImageInput', () => {
    const wrapper = shallow(<CreateContact/>);
    const actual = wrapper.find('form > ImageInput').length;
    const expected = 1;
    assert.equal(actual,expected,'Componente ImageInput não renderizado.');
  });

  it('deve renderizar um componente de texto para nome', () => {
    const wrapper = shallow(<CreateContact/>);
    const actual = wrapper.find('form > div > input[name="name"]').prop('type');
    const expected = "text";
    assert.equal(actual,expected,'Input de nome não renderizado.');
  });

  it('deve renderizar um componente de texto para email', () => {
    const wrapper = shallow(<CreateContact/>);
    const actual = wrapper.find('form > div > input[name="email"]').prop('type');
    const expected = "text";
    assert.equal(actual,expected,'Input de email não renderizado.');
  });

  it('deve renderizar um componente de botão para envio do formulário', () => {
    const wrapper = shallow(<CreateContact/>);
    const actual = wrapper.find('form > div > button').length;
    const expected = 1;
    assert.equal(actual,expected,'Input de botão não renderizado.');
  });

  describe('possui a função handleSubmit',() => {
    it('que deve executar a função preventDefault antes do serializer',()=>{
      const event = {
        preventDefault: stub(),
      }
      const wrapper = shallow(<CreateContact />);
      const handleSubmitFunction = wrapper.instance().handleSubmit;
      handleSubmitFunction(event);
      // assert(event.preventDefault.called, "Não chamou a função e.preventDefault()")
      assert(event.preventDefault.calledBefore(serializeFormStub),"Não executou preventDefault antes do serializeForm")
    });

    it('que deve executar a função onAddContact com os valores serializados',() => {
      const target = "teste";
      const hash = {hash: true};
      const returnedValueFromStub = "Retornado do Stub";
      const onAddContactStub = stub();
      const wrapper = shallow(<CreateContact onAddContact={onAddContactStub}/>);
      const handleSubmitFunction = wrapper.instance().handleSubmit;
      const event = {
        preventDefault: () => {(true)},
        target
      };
      serializeFormStub.withArgs(target,hash).returns(returnedValueFromStub);

      handleSubmitFunction(event);
      // assert(event.preventDefault.called, "Não chamou a função e.preventDefault()")
      sinon.assert.calledWithExactly(onAddContactStub, returnedValueFromStub)
    });

  })

});
