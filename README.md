# doc-prop-types

Generate prop documentation at runtime in tandem with
[prop-types](https://github.com/facebook/prop-types).

This library is for users building development environments, styleguides,
storybooks, or anything where you'd like to know about a React component's props
at runtime. Because the same API sets the PropTypes as well as the
documentation, there can never be a divergence between the two!

Unlike [react-docgen](https://github.com/reactjs/react-docgen), which parses
source files of React components and uses that to output JSON that describes
that component's props, `doc-prop-types` is used at runtime, which means that it
can do two things that react-docgen has some difficulty with:

* Use prop-types from imported components (e.g. `ImageButton.PropTypes = {
  ...Button.propTypes }`)
* Allow you to write and structure your components any way you like (multiple
  components per file, unusual component declarations)

The only price of this is that this is _nearly_ a drop-in replacement for
React's own prop-types package: props are assigned using a `assignPropTypes`
function instead of by assigning to the `propTypes` property.

## Installation

`yarn add doc-prop-types`

## Usage example

### Before

```js
import PropTypes from "prop-types";

PetOwnerInfo.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  pet: PropTypes.shape({
    name: PropTypes.string.isRequired,
    species: PropTypes.oneOf("Dog", "Cat")
  })
};
```

### After

```js
import DocPropTypes, { assignPropTypes } from "doc-prop-types";
// Or with ES5 and `require`:
// var DocPropTypes = require('doc-prop-types').default ;
// var assignPropTypes = require('doc-prop-types').assignPropTypes;

assignPropTypes(PetOwnerInfo, {
  name: DocPropTypes.string.isRequired,
  age: DocPropTypes.number,
  pet: DocPropTypes.shape({
    name: DocPropTypes.string.isRequired,
    species: DocPropTypes.oneOf("Dog", "Cat")
  })
});
```

The API of DocPropTypes is identical to that of PropTypes, with an exception for
custom prop types (see below).

`assignPropTypes` will mutate and return the component given as the first
argument, with the following new properties added to it:

* `Component.propTypes` will have vanilla proptypes so that React can do its
  type-checking.
* `Component.docPropTypes` will have DocPropTypes so that you can import them
  into other components.
* `Component.propInfo` will have a description of the props assigned to the
  component (the good bit).

The description on `propInfo` will look something like this (in the case of the
above example):

```js
{
    name: {
      type: 'string',
      isRequired: true
    },
    age: {
      type: 'number',
      isRequired: false
    },
    pet: {
      type: 'shape',
      isRequired: false,
      shape: {
        name: {
          type: 'string',
          isRequired: true
        },
        species: {
          type: 'oneOf',
          isRequired: false,
          enums: [
            'Dog',
            'Cat'
          ]
        }
      }
    }
}
```

## Importing PropTypes from other files

Imported propTypes must also be DocPropTypes:

```js
import Button from "./Button";

const ImagePropTypes = {
  src: DocPropTypes.string.isRequired
};

assignPropTypes(ImageButton, {
  ...ImagePropTypes,
  ...Button.docPropTypes
});
```

If it's valid JavaScript, you can structure and combine your DocPropTypes in
whatever way you wish.

## Custom prop types

DocPropTypes has one API difference with `prop-types`, and that's with how you
specify custom proptypes:

```js
// In component proptype definition
{
  customProp: myCustomPropType;
}

// With DocPropTypes
{
  customProp: DocPropTypes.custom(myCustomPropType);
}
```

## Things this package doesn't do (yet)

The items listed below haven't been excluded for any philosophical reason. We
either just haven't gotten around to it or don't know how to make a nice API for
it!

* Doesn't document descriptions/comments to props

## Contributing

Pull requests are more than welcome. Please make sure that tests pass (with
`yarn test`), that linting passes (with `yarn lint`), and that any new
functionality also includes tests. Thanks!
