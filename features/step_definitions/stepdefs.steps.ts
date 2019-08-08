import { loadFeature, defineFeature} from 'jest-cucumber';
import { isItFriday } from '../../app/app';
import assert = require('assert');

const feature = loadFeature('../some_features/some_features.feature', {loadRelativePath: true});

defineFeature(feature, (test) => {
  let today: String;
  let actualAnswer: String;
  let regex = '[A-Za-z]+';
  test('Today is or is not Friday', ({ given, when, then }) => {

    given(/^today is (.*)$/, (givenDay) => {
      today = givenDay.match(regex)[0];
    });

    when('I ask whether it\'s Friday yet', () => {
      actualAnswer = isItFriday(today).match(regex)[0];

    });

    then(/^I should be told (.*)$/, (expectedAnswer) => {
      assert.equal(actualAnswer, expectedAnswer.match(regex)[0]);
    });
  });

});


