import PropInfo, { optionalType, addIsRequired } from "./PropInfo";

describe("PropInfo", () => {
  describe("optionalType", () => {
    it("returns a descriptive object with the typename", () => {
      const actual = optionalType("testPropType");

      const expected = {
        type: "testPropType",
        isRequired: false,
      };

      expect(actual()).toEqual(expected);
    });
  });

  describe("addIsRequired", () => {
    it("adds a isRequired property to a prop", () => {
      const actual = optionalType("testPropType");
      addIsRequired(actual);

      const expected = {
        type: "testPropType",
        isRequired: true,
      };

      expect(actual.isRequired()).toEqual(expected);
    });
  });

  describe("shape", () => {
    it("returns a descriptive object for a shape of propTypes", () => {
      const actual = PropInfo.shape({
        name: PropInfo.string.isRequired(),
        age: PropInfo.number.isRequired(),
        likesWritingTests: PropInfo.bool(),
      });

      const expected = {
        type: "shape",
        shape: {
          name: {
            type: "string",
            isRequired: true,
          },
          age: {
            type: "number",
            isRequired: true,
          },
          likesWritingTests: {
            type: "bool",
            isRequired: false,
          },
        },
        isRequired: false,
      };

      expect(actual()).toEqual(expected);
    });
  });

  describe("oneOf", () => {
    it("returns a descriptive object for a series of enums", () => {
      const actual = PropInfo.oneOf(["ONE", "TWO", "THREE"]);

      const expected = {
        type: "oneOf",
        enums: ["ONE", "TWO", "THREE"],
        isRequired: false,
      };

      expect(actual()).toEqual(expected);
    });
  });

  describe("oneOfType", () => {
    it("returns a descriptive object for an enum of propTypes", () => {
      const actual = PropInfo.oneOfType([
        PropInfo.string.isRequired(),
        PropInfo.func.isRequired(),
        PropInfo.number(),
      ]);

      const expected = {
        type: "oneOfType",
        types: [
          {
            type: "string",
            isRequired: true,
          },
          {
            type: "func",
            isRequired: true,
          },
          {
            type: "number",
            isRequired: false,
          },
        ],
        isRequired: false,
      };

      expect(actual()).toEqual(expected);
    });
  });

  describe("arrayOf", () => {
    it("returns a descriptive object for an array of a given type", () => {
      const actual = PropInfo.arrayOf(PropInfo.string());
      const expected = {
        type: "arrayOf",
        memberType: {
          type: "string",
          isRequired: false,
        },
        isRequired: false,
      };

      expect(actual()).toEqual(expected);
    });
  });

  describe("objectOf", () => {
    it("returns a descriptive object for an object with values of a given type", () => {
      const actual = PropInfo.objectOf(PropInfo.number.isRequired());

      const expected = {
        type: "objectOf",
        valueType: {
          type: "number",
          isRequired: true,
        },
        isRequired: false,
      };

      expect(actual()).toEqual(expected);
    });
  });

  describe("instanceOf", () => {
    it("returns a descriptive object for an instance of a class", () => {
      const actual = PropInfo.instanceOf(Date);
      const expected = {
        type: "instanceOf",
        instanceClass: Date,
        isRequired: false,
      };

      expect(actual()).toEqual(expected);
    });
  });
});
