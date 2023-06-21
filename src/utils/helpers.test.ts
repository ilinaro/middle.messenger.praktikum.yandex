import { expect } from 'chai';
import { set } from './helpers';

describe('set function', () => {
  const keypath = 'test';
  const value = 'some value';
  let obj: Record<string, unknown>;

  beforeEach(() => {
    obj = {};
  });

  it('Следует установить значение по пути к объекту', () => {
    set(obj, keypath, value);

    expect(obj).to.haveOwnProperty(keypath, value);
  });

  it('Должен вернуть исходный объект', () => {
    const result = set(obj, keypath, value);

    obj['test2'] = 'another value';

    expect(result).to.equal(obj);
  });

  it('Должен возвращать исходный объект, если он не является объектом', () => {
    const notAnObject = 'string';

    const result = set(notAnObject, keypath, value);

    expect(result).to.eq(notAnObject);
  });

  it('Должен выдать ошибку, если путь не является строкой', () => {
    const keypathNotAString = 10;

    // @ts-ignore because we want to check behaviour in runtime
    const f = () => set(obj, keypathNotAString, value);

    expect(f).to.throw(Error);
  });
});
