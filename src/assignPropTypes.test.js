import React from "react";
import assignPropTypes, {
  optionalSimpleType,
  requiredSimpleType,
  optionalComplexType,
  requiredComplexType,
  shapePrimitive,
  oneOfPrimitive,
  oneOfTypePrimitive,
  arrayOfPrimitive,
  objectOfPrimitive,
  instanceOfPrimitive,
  customPrimitive,
} from "./assignPropTypes";
import DocPropTypes from "./DocPropTypes";

describe("optionalSimpleType", () => {
  it("returns an object with propInfo and propType properties", () => {
    expect(optionalSimpleType("string")).toMatchSnapshot();
  });
});

describe("requiredSimpleType", () => {
  it("returns an object with required propInfo and propType properties", () => {
    expect(requiredSimpleType("number")).toMatchSnapshot();
  });
});

describe("optionalComplexType", () => {
  it("returns a complex prop with required set to false", () => {
    const descriptor = DocPropTypes.shape({
      name: DocPropTypes.string,
      age: DocPropTypes.number,
      pet: DocPropTypes.shape({
        isWellBehaved: DocPropTypes.bool,
      }),
    })();

    const actual = optionalComplexType(descriptor, shapePrimitive);

    expect(actual).toMatchSnapshot();
  });
});

describe("requiredComplexType", () => {
  it("returns a complex prop with required set to true", () => {
    const descriptor = DocPropTypes.shape({
      name: DocPropTypes.string,
      age: DocPropTypes.number,
      pet: DocPropTypes.shape({
        isWellBehaved: DocPropTypes.bool,
      }),
    })();

    const actual = requiredComplexType(descriptor, shapePrimitive);

    expect(actual).toMatchSnapshot();
  });
});

describe("shapePrimitive", () => {
  it("returns an object with info describing an object", () => {
    const descriptor = DocPropTypes.shape({
      name: DocPropTypes.string,
      age: DocPropTypes.number,
      pet: DocPropTypes.shape({
        isWellBehaved: DocPropTypes.bool,
      }),
    })();

    const actual = shapePrimitive(descriptor);

    expect(actual.propInfo()).toMatchSnapshot();
  });
});

describe("oneOfPrimitive", () => {
  it("returns an object with info describing an enum", () => {
    const descriptor = DocPropTypes.oneOf(["One", "Two", "Three"])();

    const actual = oneOfPrimitive(descriptor);

    expect(actual.propInfo()).toMatchSnapshot();
  });
});

describe("oneOfTypePrimitive", () => {
  it("returns an object with info describing a union type", () => {
    const descriptor = DocPropTypes.oneOfType([
      DocPropTypes.string,
      DocPropTypes.number.isRequired,
      DocPropTypes.bool,
    ])();

    const actual = oneOfTypePrimitive(descriptor);

    expect(actual.propInfo()).toMatchSnapshot();
  });
});

describe("arrayOfPrimitive", () => {
  it("returns an object with info describing an array with members of one type", () => {
    const descriptor = DocPropTypes.arrayOf(DocPropTypes.number)();
    const actual = arrayOfPrimitive(descriptor);

    expect(actual.propInfo()).toMatchSnapshot();
  });
});

describe("objectOfPrimitive", () => {
  it("returns an object with info describing an object with values of a given type", () => {
    const descriptor = DocPropTypes.objectOf(DocPropTypes.bool)();
    const actual = objectOfPrimitive(descriptor);

    expect(actual.propInfo()).toMatchSnapshot();
  });
});

describe("instanceOfPrimitive", () => {
  it("returns an object with info describing an instance of a class", () => {
    const descriptor = DocPropTypes.instanceOf(Date)();
    const actual = instanceOfPrimitive(descriptor);

    expect(actual.propInfo()).toMatchSnapshot();
  });
});

describe("customPrimitive", () => {
  it("returns an object with info describing a custom proptype", () => {
    const descriptor = DocPropTypes.custom(() => {})();
    const actual = customPrimitive(descriptor);

    expect(actual.propInfo()).toMatchSnapshot();
  });
});

describe("assignPropTypes", () => {
  it("assigns docPropTypes, propTypes, and propInfo to a component", () => {
    const component = () => React.createElement("div", [], []);

    const proppedComponent = assignPropTypes(component, {
      name: DocPropTypes.string.isRequired,
      age: DocPropTypes.number.isRequired,
      pet: DocPropTypes.shape({
        name: DocPropTypes.string.isRequired,
        isGoodBoy: DocPropTypes.bool.isRequired,
      }),
    });

    expect(proppedComponent.docPropTypes).toMatchSnapshot();
    expect(proppedComponent.propTypes).toMatchSnapshot();
    expect(proppedComponent.propInfo).toMatchSnapshot();
  });
});
