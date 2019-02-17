/* eslint-env mocha */
const assert = require('assert');
const jsonAPI = require('../index');

describe('Deserialize', function() {
  it('Understands an empty JSONAPI Object', function() {
    const dataIn = {data: {}};
    const expectedOutput = {};

    assert.deepEqual(
      jsonAPI.deserialise({}, dataIn),
      expectedOutput,
      'Structure is correct'
    );
  });
  it('Understands an empty JSONAPI Object array', function() {
    const dataIn = {data: [ {} ]};
    const expectedOutput = [ {} ];

    assert.deepEqual(
      jsonAPI.deserialise({}, dataIn),
      expectedOutput,
      'Structure is correct'
    );
  });

  describe('Maps Attributes', function() {
    it('Maps Single Object', function() {
      const dataIn = {
        data: {
          id: 999,
          type: 'articles',
          attributes: {
            title: 'This is a title'
          }
        }
      };
      const expectedOutput = {
        idKey: 999,
        titleKey: 'This is a title'
      };
      const mapperObject = {
        id: 'idKey',
        type: 'articles',
        attributes: {
          title: 'titleKey'
        }
      };

      assert.deepEqual(
        jsonAPI.deserialise(mapperObject, dataIn),
        expectedOutput,
        'Structure is correct'
      );
    });
    it('Maps Multiple Objects', function() {
      const dataIn = {
        data: [
          {
            id: 999,
            type: 'articles',
            attributes: {
              title: 'This is a title'
            }
          },
          {
            id: 111,
            type: 'articles',
            attributes: {
              title: 'This is another title'
            }
          }
        ]
      };
      const expectedOutput = [
        {
          idKey: 999,
          titleKey: 'This is a title'
        },
        {
          idKey: 111,
          titleKey: 'This is another title'
        }
      ];
      const mapperObject = {
        id: 'idKey',
        type: 'articles',
        attributes: {
          title: 'titleKey'
        }
      };

      assert.deepEqual(
        jsonAPI.deserialise(mapperObject, dataIn),
        expectedOutput,
        'Structure is correct'
      );
    });
  });

  // describe('Maps Relationships', function() {
  //   it('Maps single relationships', function() {
  //     const expectedOutput = {
  //       idKey: 222,
  //       authorId: 1,
  //     };
  //     const dataIn = {
  //       data: {
  //         id: 222,
  //         type: 'articles',
  //         relationships: {
  //           author: {
  //             data: { type: 'author', id: 1 }
  //           }
  //         }
  //       }
  //     };
  //     const mapperObject = {
  //       id: 'idKey',
  //       type: 'articles',
  //       relationships: {
  //         author: {
  //           type: 'author',
  //           id: 'authorId'
  //         }
  //       }
  //     };

  //     assert.deepEqual(
  //       jsonAPI.deserialise(mapperObject, dataIn),
  //       expectedOutput,
  //       'Single relationship mapped'
  //     );
  //   });
  // });
});
