const docProp = () => {
  const docProp = () => {};
  docProp.isRequired = () => {};
};

const docPropWithArgs = () => {
  const docProp = () => {
    const reallyDocProp = () => {};
    reallyDocProp.isRequired = () => {};
    return reallyDocProp;
  };
  return docProp;
};

export default {
  string: docProp,
  number: docProp,
  bool: docProp,
  symbol: docProp,
  func: docProp,
  object: docProp,
  node: docProp,
  element: docProp,
  any: docProp,
  shape: docPropWithArgs,
  oneOf: docPropWithArgs,
  oneOfType: docPropWithArgs,
  arrayOf: docPropWithArgs,
  objectOf: docPropWithArgs,
  instanceOf: docPropWithArgs,
  custom: docPropWithArgs,
};

export const assignPropTypes = (component, docproptypes) => {
  component.docPropTypes = docproptypes;
  return component;
};
