import { shallow , configure} from 'enzyme';
import CreateContactFactory from '../components/CreateContact';
import { assert } from 'chai';
import React from "react"
import Adapter from 'enzyme-adapter-react-16'
import sinon, { stub } from 'sinon'

configure({adapter: new Adapter()});

describe("WithFilter", () => {
  it("deve ter um state contendo um atributo search usado para busca");
  it("deve ter uma função de aplicação do filtro");
  it("deve ter uma atualização de limpar o filtro");

});
