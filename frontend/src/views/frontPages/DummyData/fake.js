/* eslint-disable prettier/prettier */
const disciplines = [
  { 
    discipline: "Law",
    services: [
      { type: "Lawyer", services: ["Criminal Law", "Civil Law", "Family Law", "Corporate Law"] },
      { type: "Legal Consultant", services: ["Contract Law", "Intellectual Property Law", "Tax Law"] }
    ]
  },
  { 
    discipline: "Dental",
    services: [
      { type: "Dentist", services: ["Teeth Cleaning", "Fillings", "Root Canal", "Dental Implants"] },
      { type: "Orthodontist", services: ["Braces", "Invisalign", "Retainers"] }
    ]
  },
  { 
    discipline: "Plumbing",
    services: [
      { type: "Plumber", services: ["Pipe Repair", "Fixture Installation", "Drain Cleaning", "Water Heater Repair"] },
      { type: "Pipefitter", services: ["Pipe Installation", "Pipe Welding", "Pipe Maintenance"] }
    ]
  },
  { 
    discipline: "Medicine",
    services: [
      { type: "Doctor", services: ["General Checkup", "Pediatrics", "Internal Medicine", "Dermatology"] },
      { type: "Surgeon", services: ["General Surgery", "Orthopedic Surgery", "Plastic Surgery"] }
    ]
  },
  { 
    discipline: "Electrical",
    services: [
      { type: "Electrician", services: ["Wiring Installation", "Electrical Repairs", "Lighting Installation", "Appliance Installation"] },
      { type: "Electrical Engineer", services: ["Electrical Design", "Power System Analysis", "Control Systems"] }
    ]
  }
];

export default disciplines;
