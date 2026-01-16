

import { EncodeCoverage, DecodeCoverage, MapBenefitSelection } from "../src/helpers.mjs";
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';



describe('EncodeCoverage', () => {
  it('should return the correct value', () => {
    let result = 0;

    result = EncodeCoverage(false, false, false)
    assert.equal(result, 0);

    result = EncodeCoverage(true, false, false)
    assert.equal(result, 1);

    result = EncodeCoverage(false, true, false)
    assert.equal(result, 2);

    result = EncodeCoverage(true, true, false)
    assert.equal(result, 3);

    result = EncodeCoverage(false, false, true)
    assert.equal(result, 4);

    result = EncodeCoverage(true, false, true)
    assert.equal(result, 5);

    result = EncodeCoverage(false, true, true)
    assert.equal(result, 6);

    result = EncodeCoverage(true, true, true)
    assert.equal(result, 7);

  });
});

describe('DecodeCoverage', () => {
  it('should return the correct values', () => {
    let result = {};

    result = DecodeCoverage(0)
    assert.equal(result.medical, false);
    assert.equal(result.vision, false);
    assert.equal(result.dental, false);

    //refactor the below code to match the example above
    result = DecodeCoverage(1)
    assert.equal(result.medical, true);
    assert.equal(result.vision, false);
    assert.equal(result.dental, false);

    result = DecodeCoverage(2)
    assert.equal(result.medical, false);
    assert.equal(result.vision, true);
    assert.equal(result.dental, false);

    result = DecodeCoverage(3)
    assert.equal(result.medical, true);
    assert.equal(result.vision, true);
    assert.equal(result.dental, false);

    result = DecodeCoverage(4)
    assert.equal(result.medical, false);
    assert.equal(result.vision, false);
    assert.equal(result.dental, true);

    result = DecodeCoverage(5)
    assert.equal(result.medical, true);
    assert.equal(result.vision, false);
    assert.equal(result.dental, true);

    result = DecodeCoverage(6)
    assert.equal(result.medical, false);
    assert.equal(result.vision, true);
    assert.equal(result.dental, true);

    result = DecodeCoverage(7)
    assert.equal(result.medical, true);
    assert.equal(result.vision, true);
    assert.equal(result.dental, true);


  });
});

// describe('MapBenefitSelection', () => {
//   it('should return the corresponding coverage selection for a given value', () => {
//     assert.strictEqual(MapBenefitSelection('1'), '👷🏼‍♂️ - Employee Only');
//     assert.strictEqual(MapBenefitSelection('2'), '👷🏼‍♂️🧍🏼‍♀️ - Employee + Child(ren)');
//     assert.strictEqual(MapBenefitSelection('3'), '👷🏼‍♂️👱🏼‍♀️ - Employee + Spouse');
//   });

//   it('should return a default value if the given value is not found in the mapping', () => {
//     assert.strictEqual(MapBenefitSelection('0'), '👷🏼‍♂️ - Employee Only');
//   });
// });