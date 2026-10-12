import assert from "node:assert/strict";
import { customers, matchPool } from "./data.js";
import { rankedMatches, scoreMatch } from "./matchEngine.js";

const maleCustomer = customers.find((customer) => customer.gender === "Male");
const femaleCustomer = customers.find((customer) => customer.gender === "Female");

const maleMatches = rankedMatches(maleCustomer, matchPool, 10);
assert.equal(maleMatches.length, 10);
assert.ok(maleMatches.every((match) => match.gender === "Female"));
assert.ok(maleMatches[0].match.score >= maleMatches[9].match.score);

const femaleMatches = rankedMatches(femaleCustomer, matchPool, 10);
assert.equal(femaleMatches.length, 10);
assert.ok(femaleMatches.every((match) => match.gender === "Male"));
assert.ok(femaleMatches[0].match.reasons.length > 0);

const blocked = scoreMatch(femaleCustomer, femaleCustomer);
assert.equal(blocked.score, 0);

console.log("match engine checks passed");
