import DocPropTypes from "./DocPropTypes";

describe("DocPropTypes", () => {
  it("mimics the official React.PropTypes API", () => {
    expect(DocPropTypes).toMatchSnapshot();
  });

  it("returns prop identifiers from its property functions", () => {
    const docPropsFired = Object.keys(DocPropTypes).reduce((fired, key) => {
      fired[key] = DocPropTypes[key]();
      return fired;
    }, {});

    expect(docPropsFired).toMatchSnapshot();
  });
});
