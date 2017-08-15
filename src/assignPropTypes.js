import PropTypes from "prop-types";
import PropInfo from "./PropInfo";

export const optionalSimpleType = propTypeName => ({
  propInfo: PropInfo[propTypeName](),
  propType: PropTypes[propTypeName],
});

export const requiredSimpleType = propTypeName => ({
  propInfo: PropInfo[propTypeName].isRequired(),
  propType: PropTypes[propTypeName].isRequired,
});

export const optionalComplexType = (descriptor, primitive) => {
  const { propInfo, propType } = primitive(descriptor);

  return {
    propInfo: propInfo(),
    propType,
  };
};

export const requiredComplexType = (descriptor, primitive) => {
  const { propInfo, propType } = primitive(descriptor);

  return {
    propInfo: propInfo.isRequired(),
    propType: propType.isRequired,
  };
};

export const shapePrimitive = descriptor => ({
  propInfo: PropInfo.shape(
    Object.keys(descriptor.args).reduce((shape, key) => {
      shape[key] = getType(descriptor.args[key]()).propInfo;
      return shape;
    }, {}),
  ),
  propType: PropTypes.shape(
    Object.keys(descriptor.args).reduce((args, key) => {
      args[key] = getType(descriptor.args[key]()).propType;
      return args;
    }, {}),
  ),
});

export const oneOfPrimitive = descriptor => ({
  propInfo: PropInfo.oneOf(descriptor.args),
  propType: PropTypes.oneOf(descriptor.args),
});

export const oneOfTypePrimitive = descriptor => ({
  propInfo: PropInfo.oneOfType(
    descriptor.args.map(docPropType => {
      return getType(docPropType()).propInfo;
    }),
  ),
  propType: PropTypes.oneOfType(
    descriptor.args.map(docPropType => {
      return getType(docPropType()).propType;
    }),
  ),
});

export const arrayOfPrimitive = descriptor => ({
  propInfo: PropInfo.arrayOf(getType(descriptor.args()).propInfo),
  propType: PropTypes.arrayOf(getType(descriptor.args()).propType),
});

export const objectOfPrimitive = descriptor => ({
  propInfo: PropInfo.objectOf(getType(descriptor.args()).propInfo),
  propType: PropTypes.objectOf(getType(descriptor.args()).propType),
});

export const instanceOfPrimitive = docPropType => ({
  propInfo: PropInfo.instanceOf(docPropType.args),
  propType: PropTypes.instanceOf(docPropType.args),
});

export const customPrimitive = descriptor => ({
  propInfo: PropInfo.custom(descriptor.args),
  propType: descriptor.args,
});

export const getType = descriptor => {
  switch (descriptor.id) {
    case "STRING":
      return optionalSimpleType("string");

    case "NUMBER":
      return optionalSimpleType("number");

    case "BOOL":
      return optionalSimpleType("bool");

    case "SYMBOL":
      return optionalSimpleType("symbol");

    case "FUNC":
      return optionalSimpleType("func");

    case "OBJECT":
      return optionalSimpleType("object");

    case "NODE":
      return optionalSimpleType("node");

    case "ELEMENT":
      return optionalSimpleType("element");

    case "ARRAY":
      return optionalSimpleType("array");

    case "ANY":
      return optionalSimpleType("any");

    case "STRING_IS_REQUIRED":
      return requiredSimpleType("string");

    case "NUMBER_IS_REQUIRED":
      return requiredSimpleType("number");

    case "BOOL_IS_REQUIRED":
      return requiredSimpleType("bool");

    case "SYMBOL_IS_REQUIRED":
      return requiredSimpleType("symbol");

    case "FUNC_IS_REQUIRED":
      return requiredSimpleType("func");

    case "OBJECT_IS_REQUIRED":
      return requiredSimpleType("object");

    case "NODE_IS_REQUIRED":
      return requiredSimpleType("node");

    case "ELEMENT_IS_REQUIRED":
      return requiredSimpleType("element");

    case "ANY_IS_REQUIRED":
      return requiredSimpleType("any");

    case "SHAPE_OF":
      return optionalComplexType(descriptor, shapePrimitive);

    case "SHAPE_OF_IS_REQUIRED":
      return requiredComplexType(descriptor, shapePrimitive);

    case "ONE_OF":
      return optionalComplexType(descriptor, oneOfPrimitive);

    case "ONE_OF_IS_REQUIRED":
      return requiredComplexType(descriptor, oneOfPrimitive);

    case "ONE_OF_TYPE":
      return optionalComplexType(descriptor, oneOfTypePrimitive);

    case "ONE_OF_TYPE_IS_REQUIRED":
      return requiredComplexType(descriptor, oneOfTypePrimitive);

    case "ARRAY_OF":
      return optionalComplexType(descriptor, arrayOfPrimitive);

    case "ARRAY_OF_IS_REQUIRED":
      return requiredComplexType(descriptor, arrayOfPrimitive);

    case "OBJECT_OF":
      return optionalComplexType(descriptor, objectOfPrimitive);

    case "OBJECT_OF_IS_REQUIRED":
      return requiredComplexType(descriptor, objectOfPrimitive);

    case "INSTANCE_OF":
      return optionalComplexType(descriptor, instanceOfPrimitive);

    case "INSTANCE_OF_IS_REQUIRED":
      return requiredComplexType(descriptor, instanceOfPrimitive);

    case "CUSTOM":
      return optionalComplexType(descriptor, customPrimitive);

    case "CUSTOM_IS_REQUIRED":
      return requiredComplexType(descriptor, customPrimitive);

    default:
      /* eslint-disable no-console */
      console.error("An unexpected value was passed to assignPropTypes:");
      console.error(descriptor);
      console.error(
        "Make sure that you’re using DocPropTypes, not React.PropTypes!",
      );
      /* eslint-enable no-console*/
      return {
        docPropType: null,
        propType: null,
      };
  }
};

export default function attachPropInfo(component, docPropTypes) {
  const propsWithInfo = Object.keys(docPropTypes).reduce(
    (propsWithInfo, key) => ({
      ...propsWithInfo,
      [key]: getType(docPropTypes[key]()),
    }),
    {},
  );

  component.propInfo = Object.keys(propsWithInfo).reduce(
    (propInfo, key) => ({
      ...propInfo,
      [key]: propsWithInfo[key].propInfo,
    }),
    {},
  );

  component.propTypes = Object.keys(propsWithInfo).reduce(
    (propTypes, key) => ({
      ...propTypes,
      [key]: propsWithInfo[key].propType,
    }),
    {},
  );

  component.docPropTypes = docPropTypes;

  return component;
}
