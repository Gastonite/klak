const Lab = require('lab');
const { expect } = require('code');

const Emitter = require('../src/emitter');

const { describe, it, beforeEach, before, after } = exports.lab = Lab.script();


describe('Emitter', () => {


  it('should add and remove listeners', done => {

    const emitter = Emitter(['bu', 'ga']);

    const array = [];

    const handler1 = () => array.push(1);
    const handler2 = () => array.push(2);
    const handler3 = () => array.push(3);
    const handler4 = () => array.push(4);
    const handler5 = () => array.push(5);

    emitter.on(['ga', 'bu'], handler1);
    emitter.on('bu', handler2);
    emitter.on('bu', handler3);
    emitter.on('ga', [handler4, handler5]);

    expect(array).equal([]);

    emitter.emit('ga');

    expect(array).equal([1,4,5]);

    emitter.off('ga', handler1);

    expect(array).equal([1,4,5]);

    emitter.emit('ga');

    expect(array).equal([1,4,5, 4,5]);

    emitter.emit('ga');

    expect(array).equal([1,4,5, 4,5, 4,5]);

    emitter.on('bu', [handler4, handler2, handler3]);
    emitter.on('bu', handler1);

    expect(array).equal([1,4,5 ,4,5, 4,5]);

    emitter.emit('bu');

    expect(array).equal([1,4,5, 4,5, 4,5, 1,2,3,4]);

    emitter.emit('ga');

    expect(array).equal([1,4,5, 4,5, 4,5, 1,2,3,4, 4,5]);

    emitter.off(['ga', 'bu'], handler4);

    expect(array).equal([1,4,5, 4,5, 4,5, 1,2,3,4, 4,5]);

    emitter.off(['ga', 'bu'], handler4);

    expect(array).equal([1,4,5, 4,5, 4,5, 1,2,3,4, 4,5]);

    emitter.emit('ga');

    expect(array).equal([1,4,5, 4,5, 4,5, 1,2,3,4, 4,5, 5]);

    emitter.emit('bu');

    expect(array).equal([1,4,5, 4,5, 4,5, 1,2,3,4, 4,5, 5, 1,2,3]);

    done();
  })

});