import { CustomElement } from 'custom-elements-ts'
import { expect } from 'chai'

@CustomElement({
  tag: 'basic-element',
  template: '<span>my element</span>',
  style: ':host{border:0}'
})
export class BasicElement extends HTMLElement {}

describe('basic test', () => {
  let myElementInstance: any

  beforeEach(() => {
    const myElement = document.createElement('basic-element');
    myElementInstance = document.body.appendChild(myElement);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should load html template', () => {
    expect(myElementInstance.shadowRoot.innerHTML).contain('<span>my element</span>');
  });

  it('should load css', () => {
    expect(myElementInstance.shadowRoot.querySelector('style').innerText).contain(':host{border:0}');
  });

  it('should have shadowroot', () => {
    expect(myElementInstance.shadowRoot).not.undefined
  });

});

@CustomElement({
  tag: 'shadow-false-element',
  template: '<span>my element</span>',
  style: ':host{border:0}',
  shadow: false
})
export class ShadowFalseElement extends HTMLElement {}

describe('basic test no shadowroot', () => {
  let myElementInstance: any

  beforeEach(() => {
    const myElement = document.createElement('shadow-false-element');
    myElementInstance = document.body.appendChild(myElement);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should load html template', () => {
      expect(myElementInstance.innerHTML).contain('<span>my element</span>');
  });

  it('should have css', () => {
    expect(myElementInstance.querySelector('style')).not.undefined
  });

  it('shadow not have a shadowroot', () => {
    expect(myElementInstance.shadowRoot).to.null
  });
});