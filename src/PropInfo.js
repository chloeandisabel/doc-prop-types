// Helper functions
export const optionalType = typeName => () => ({
  type: typeName,
  isRequired: false,
});

export const addIsRequired = propType => {
  propType.isRequired = () => ({
    ...propType(),
    isRequired: true,
  });
  return propType;
};

const withIsRequired = propType => {
  addIsRequired(propType);
  return propType;
};

// More complex prop types
const shape = shape =>
  withIsRequired(() => {
    return {
      type: "shape",
      shape: Object.keys(shape).reduce(
        (memo, key) => ({
          ...memo,
          [key]: shape[key],
        }),
        {},
      ),
      isRequired: false,
    };
  });

const oneOf = array =>
  withIsRequired(() => ({
    type: "oneOf",
    enums: array,
    isRequired: false,
  }));

const oneOfType = arrayOfPropTypes =>
  withIsRequired(() => ({
    type: "oneOfType",
    types: arrayOfPropTypes,
    isRequired: false,
  }));

const arrayOf = propType =>
  withIsRequired(() => ({
    type: "arrayOf",
    memberType: propType,
    isRequired: false,
  }));

const objectOf = propType =>
  withIsRequired(() => ({
    type: "objectOf",
    valueType: propType,
    isRequired: false,
  }));

const instanceOf = instanceClass =>
  withIsRequired(() => ({
    type: "instanceOf",
    instanceClass,
    isRequired: false,
  }));

const custom = customPropType =>
  withIsRequired(() => ({
    type: "custom",
    customPropType,
    isRequired: false,
  }));

export default {
  string: addIsRequired(optionalType("string")),
  number: addIsRequired(optionalType("number")),
  bool: addIsRequired(optionalType("bool")),
  symbol: addIsRequired(optionalType("symbol")),
  func: addIsRequired(optionalType("func")),
  object: addIsRequired(optionalType("object")),
  node: addIsRequired(optionalType("node")),
  element: addIsRequired(optionalType("element")),
  array: addIsRequired(optionalType("array")),
  any: addIsRequired(optionalType("any")),
  shape,
  oneOf,
  oneOfType,
  arrayOf,
  objectOf,
  instanceOf,
  custom,
};
