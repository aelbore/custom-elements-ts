import { CustomElement, Dispatch, DispatchEmitter, Listen } from 'custom-elements-ts'
import { expect } from 'chai'

@CustomElement({
  tag: 'btn-dispatch',
  template: `<button>Test</button>`
})
export class DispatchElement extends HTMLElement {

  @Dispatch() btnClick: DispatchEmitter;
  @Dispatch('btn.namedClick') btnClickNamed: DispatchEmitter;

  constructor() {
    super()
  }

  @Listen('click')
  btnHandler(){
    this.shadowRoot.querySelector('button').innerHTML = 'Hello';
    this.btnClick.emit({detail: 'Hello'});
    this.btnClickNamed.emit({detail: 'Hello from named click'});
  }

}

describe('dispatch decorators', () => {
  let element: any;

  beforeEach(() => {
    const btnElement = document.createElement('btn-dispatch');
    element = document.body.appendChild(btnElement);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should trigger a btn.click DispatchEmitter', (done) => {
    element.addEventListener('btn.click', (e) => {
      expect(e.detail).eq('Hello');
      done();
    });
    element.click();
  });

  it('should trigger a btn.namedClick DispatchEmitter', (done) => {
    element.addEventListener('btn.namedClick', (e) => {
      expect(e.detail).eq('Hello from named click');
      done();
    });
    element.click();
  });

});