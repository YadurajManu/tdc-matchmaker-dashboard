const same = (a, b) => a === b;
const flexible = (a, b) => a === b || a === "Maybe" || b === "Maybe";
const intersects = (a, b) => a.some((item) => b.includes(item));

export function scoreMatch(customer, candidate) {
  let score = 35;
  const reasons = [];

  if (customer.gender === candidate.gender) {
    return { score: 0, label: "Not Eligible", reasons: ["Pool is filtered to opposite-gender matches for this MVP."], intro: "" };
  }

  if (customer.gender === "Male") {
    if (candidate.age < customer.age) {
      score += 14;
      reasons.push("younger age preference fits");
    }
    if (candidate.income < customer.income) {
      score += 10;
      reasons.push("income expectation is aligned");
    }
    if (candidate.heightCm < customer.heightCm) {
      score += 8;
      reasons.push("height preference fits");
    }
    if (same(customer.wantKids, candidate.wantKids)) {
      score += 16;
      reasons.push("same view on children");
    }
  } else {
    if (Math.abs(customer.age - candidate.age) <= 5) {
      score += 10;
      reasons.push("life stage is close");
    }
    if (same(customer.designation, candidate.designation) || same(customer.degree, candidate.degree)) {
      score += 12;
      reasons.push("professional or education overlap");
    }
    if (flexible(customer.openToRelocate, candidate.openToRelocate)) {
      score += 14;
      reasons.push("relocation expectations can work");
    }
    if (intersects(customer.values, candidate.values)) {
      score += 14;
      reasons.push("shared values");
    }
  }

  if (same(customer.city, candidate.city)) {
    score += 8;
    reasons.push("same city");
  }
  if (same(customer.religion, candidate.religion)) {
    score += 5;
    reasons.push("religion preference likely easier for families");
  }
  if (same(customer.diet, candidate.diet)) {
    score += 5;
    reasons.push("dietary lifestyle matches");
  }
  if (flexible(customer.openToPets, candidate.openToPets)) {
    score += 4;
    reasons.push("pet preference is compatible");
  }

  const capped = Math.min(98, score);
  const label = capped >= 82 ? "High Potential Match" : capped >= 68 ? "Strong Match" : capped >= 54 ? "Worth Reviewing" : "Low Priority";
  const intro = `${candidate.firstName} is a ${candidate.age}-year-old ${candidate.designation} in ${candidate.city}. ${label}: ${reasons.slice(0, 3).join(", ")}.`;

  return { score: capped, label, reasons: reasons.slice(0, 5), intro };
}

export function rankedMatches(customer, pool, limit = 8) {
  return pool
    .filter((candidate) => candidate.gender !== customer.gender)
    .map((candidate) => ({ ...candidate, match: scoreMatch(customer, candidate) }))
    .sort((a, b) => b.match.score - a.match.score)
    .slice(0, limit);
}
