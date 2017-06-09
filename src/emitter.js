
const internals = {};

internals.TypeFilter = type => value => value.type === type;
internals.EqualityFilter = value => input => input === value;

internals.getListener = value => value.listener;
internals.isString = input => typeof input === 'string';
internals.isArray = input => input instanceof Array;
internals.isFunction = input => typeof input === 'function';
internals.isEmpty = input => input.length < 1;
internals.assert = (condition, message) => {if (!condition) throw new Error(message)};
internals.ArgumentCheck = (types, method) => {

  const { assert, isArray, isString, isFunction, isEmpty } = internals;

  assert(isFunction(method), `'method' must be a function`);

  const check = (type, listener) => {

    if (isArray(type))
      return type.forEach(type => check(type, listener));

    assert(isString(type) && !isEmpty(type), `'type' must be a string`);

    assert(types.includes(type), `"${type}" listener type is not allowed`);

    if (isArray(listener))
      return listener.forEach(handler => check(type, handler));

    assert(isFunction(listener), `'listener' must be a function`);

    method(type, listener);
  };

  return check;
};

internals.Emitter = module.exports = (allowedTypes) => {

  const { assert, TypeFilter, EqualityFilter, getListener, isArray, isString, isEmpty } = internals;

  assert(isArray(allowedTypes) && !isEmpty(allowedTypes) && allowedTypes.every(isString),
    `'types' must be an array of string` );

  const _listeners = [];

  const _getListeners = (type) => _listeners.filter(TypeFilter(type)).map(getListener);
  const _findListener = (type, listener) => _getListeners(type).find(EqualityFilter(listener));

  const emitter =  {
    on(type, listener) {

      if (_findListener(type, listener))
        return;

      _listeners.push({ type, listener });
    },
    off(type, listener) {

      const found = _findListener(type, listener);

      if (!found)
        return;

      _listeners.splice(_listeners.findIndex(item => item.type === type && item.listener === found), 1);
    },
    emit(type, ...args) {

      assert(isString(type) && !isEmpty(type), `'type' must be a string`);

      _getListeners(type).forEach(handler => void handler(...args));
    }
  };

  emitter.on = internals.ArgumentCheck(allowedTypes, emitter.on);
  emitter.off = internals.ArgumentCheck(allowedTypes, emitter.off);

  return emitter;
};
