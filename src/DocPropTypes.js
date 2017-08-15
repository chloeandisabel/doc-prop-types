const docProp = id => {
  const docProp = () => {
    return { id };
  };
  docProp.isRequired = () => {
    return { id: `${id}_IS_REQUIRED` };
  };
  return docProp;
};

const docPropWithArgs = id => {
  const docProp = args => {
    const reallyDocProp = () => {
      return { id, args };
    };
    reallyDocProp.isRequired = () => {
      return {
        id: `${id}_IS_REQUIRED`,
        args,
      };
    };
    return reallyDocProp;
  };

  return docProp;
};

export default {
  string: docProp("STRING"),
  number: docProp("NUMBER"),
  bool: docProp("BOOL"),
  symbol: docProp("SYMBOL"),
  func: docProp("FUNC"),
  object: docProp("OBJECT"),
  node: docProp("NODE"),
  element: docProp("ELEMENT"),
  array: docProp("ARRAY"),
  any: docProp("ANY"),
  shape: docPropWithArgs("SHAPE_OF"),
  oneOf: docPropWithArgs("ONE_OF"),
  oneOfType: docPropWithArgs("ONE_OF_TYPE"),
  arrayOf: docPropWithArgs("ARRAY_OF"),
  objectOf: docPropWithArgs("OBJECT_OF"),
  instanceOf: docPropWithArgs("INSTANCE_OF"),
  custom: docPropWithArgs("CUSTOM"),
};
