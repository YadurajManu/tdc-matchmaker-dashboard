const maleNames = [
  "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Reyansh", "Sai", "Ishaan", "Kabir", "Rohan",
  "Kunal", "Rahul", "Yash", "Nikhil", "Dev", "Samar", "Rishi", "Aryan", "Kartik", "Dhruv"
];

const femaleNames = [
  "Aanya", "Diya", "Ira", "Kiara", "Myra", "Anika", "Saanvi", "Riya", "Tara", "Meera",
  "Nisha", "Priya", "Ananya", "Kavya", "Aditi", "Neha", "Isha", "Avni", "Rhea", "Mira"
];

const lastNames = [
  "Sharma", "Mehta", "Iyer", "Kapoor", "Rao", "Malhotra", "Bansal", "Nair", "Joshi", "Singh",
  "Patel", "Agarwal", "Chopra", "Menon", "Reddy", "Saxena", "Gupta", "Bose", "Desai", "Trivedi"
];

const cities = ["Delhi", "Mumbai", "Bengaluru", "Pune", "Hyderabad", "Chennai", "Jaipur", "Ahmedabad"];
const companies = ["Google", "Tata Digital", "Infosys", "Deloitte", "Zomato", "ICICI Bank", "TCS", "Accenture"];
const jobs = ["Product Manager", "Software Engineer", "Consultant", "Founder", "Architect", "Finance Manager", "Doctor", "Lawyer"];
const colleges = ["Delhi University", "IIT Bombay", "IIM Ahmedabad", "BITS Pilani", "Christ University", "SRCC", "NIT Trichy", "Manipal University"];
const degrees = ["B.Tech", "MBA", "B.Com", "MBBS", "BA Economics", "M.Des", "M.Tech", "LLB"];
const religions = ["Hindu", "Sikh", "Jain", "Christian", "Muslim"];
const castes = ["Agarwal", "Khatri", "Brahmin", "Punjabi", "Marwari", "Kayastha", "Reddy", "Nair"];
const diets = ["Vegetarian", "Eggetarian", "Non-vegetarian", "Vegan"];
const values = ["Family-oriented", "Ambitious", "Spiritual", "Liberal", "Traditional", "Balanced"];
const languages = ["Hindi", "English", "Punjabi", "Tamil", "Telugu", "Marathi", "Gujarati", "Kannada"];
const stages = ["Verified", "Intro Call", "Shortlisting", "Meeting Scheduled", "Feedback Pending"];
const yesNoMaybe = ["Yes", "No", "Maybe"];

function dateOfBirth(age, seed) {
  const month = String((seed % 12) + 1).padStart(2, "0");
  const day = String((seed % 27) + 1).padStart(2, "0");
  return `${2026 - age}-${month}-${day}`;
}

function profile(seed, gender) {
  const names = gender === "Female" ? femaleNames : maleNames;
  const firstName = names[seed % names.length];
  const lastName = lastNames[(seed * 3) % lastNames.length];
  const age = gender === "Female" ? 24 + (seed % 10) : 27 + (seed % 11);
  const city = cities[(seed * 5) % cities.length];
  const income = gender === "Female" ? 1200000 + (seed % 28) * 180000 : 1800000 + (seed % 30) * 220000;
  const valueSet = [values[seed % values.length], values[(seed + 2) % values.length]];

  return {
    id: `${gender[0].toLowerCase()}-${seed}`,
    firstName,
    lastName,
    gender,
    age,
    dateOfBirth: dateOfBirth(age, seed),
    country: "India",
    city,
    heightCm: gender === "Female" ? 154 + (seed % 18) : 168 + (seed % 18),
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${seed}@example.com`,
    phone: `+91 98${String(70000000 + seed * 9137).slice(0, 8)}`,
    undergraduateCollege: colleges[seed % colleges.length],
    degree: degrees[(seed + 3) % degrees.length],
    income,
    currentCompany: companies[(seed + 4) % companies.length],
    designation: jobs[(seed + 2) % jobs.length],
    maritalStatus: seed % 9 === 0 ? "Divorced" : seed % 13 === 0 ? "Widowed" : "Never Married",
    languagesKnown: [languages[seed % languages.length], "English", languages[(seed + 3) % languages.length]].filter((v, i, a) => a.indexOf(v) === i),
    siblings: seed % 4 === 0 ? "Only child" : `${(seed % 2) + 1} sibling${seed % 2 ? "s" : ""}`,
    caste: castes[(seed + 1) % castes.length],
    religion: religions[seed % religions.length],
    wantKids: yesNoMaybe[seed % yesNoMaybe.length],
    openToRelocate: yesNoMaybe[(seed + 1) % yesNoMaybe.length],
    openToPets: yesNoMaybe[(seed + 2) % yesNoMaybe.length],
    diet: diets[(seed + 2) % diets.length],
    familyType: seed % 3 === 0 ? "Joint family" : "Nuclear family",
    manglik: yesNoMaybe[(seed + 2) % yesNoMaybe.length],
    values: valueSet,
    interests: ["Travel", "Fitness", "Music", "Startups", "Reading", "Food"][seed % 6],
    statusTag: stages[seed % stages.length],
    matchmakerNotes: seed % 2 === 0 ? "Prefers a thoughtful intro before sharing numbers." : "Family would like education and lifestyle fit highlighted."
  };
}

export const customers = [
  { ...profile(2, "Female"), id: "customer-1", firstName: "Ananya", lastName: "Singh", statusTag: "Verified", city: "Delhi", wantKids: "Yes", openToRelocate: "Maybe" },
  { ...profile(7, "Male"), id: "customer-2", firstName: "Rohan", lastName: "Mehra", statusTag: "Shortlisting", city: "Mumbai", wantKids: "Yes", openToRelocate: "No" },
  { ...profile(12, "Female"), id: "customer-3", firstName: "Priya", lastName: "Kapoor", statusTag: "Feedback Pending", city: "Bengaluru", wantKids: "Maybe", openToPets: "Yes" },
  { ...profile(18, "Male"), id: "customer-4", firstName: "Kabir", lastName: "Malhotra", statusTag: "Meeting Scheduled", city: "Pune", wantKids: "No", openToRelocate: "Maybe" },
  { ...profile(23, "Female"), id: "customer-5", firstName: "Meera", lastName: "Iyer", statusTag: "Intro Call", city: "Chennai", wantKids: "Yes", openToRelocate: "Yes" }
];

export const matchPool = Array.from({ length: 120 }, (_, index) => profile(index + 30, index % 2 === 0 ? "Male" : "Female"));
