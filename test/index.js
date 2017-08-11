'use strict';

const { assert } = require('chai');
const ajv = require('ajv')();

describe('buzzi-event-schema', function () {
  let schemas;

  it('should be required', function () {
    schemas = require('../');
    assert.isObject(schemas);
  });

  ([
    'buzzi.ecommerce.browse-abandonment',
    'buzzi.ecommerce.cart-abandonment',
    'buzzi.ecommerce.cart-purchase',
    'buzzi.ecommerce.product-view',
    'buzzi.ecommerce.site-search',
    'buzzi.ecommerce.user-registration',
    'buzzi.ecommerce.wishlist-item',
  ]).forEach(eventName => {

    describe(eventName, function () {

      let eventSchema;

      it('should exist on main index import', function () {
        eventSchema = schemas[eventName];
        assert.isObject(eventSchema);
      });

      it('should be able to be required', function () {
        let requiredEventSchema = require(`../${eventName}`);
        assert.equal(eventSchema, requiredEventSchema);
      });

      it('should be valid json-schema', function () {
        if (!ajv.validateSchema(eventSchema)) {
          throw ajv.errors;
        }
      });

    });
  });

});
