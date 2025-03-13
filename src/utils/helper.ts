export const formatMoney = (amount: number, locale = 'en-US', currency = 'PHP') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount);
  };

export const parseMoney = (formattedMoney: string) => {
  const numericString = formattedMoney
    .replace(/[^\d.-]/g, ''); // Keep digits, minus, and dot

  return parseFloat(numericString);
};

export const carMakeList = [
"Toyota",
"Mitsubishi",
"Ford",
"Hyundai",
"Nissan",
"Isuzu",
"Mazda",
"Suzuki",
"Chevrolet",
"Honda",
"Kia",
"Subaru",
"BMW",
"Mercedes-Benz",
"Audi",
"Volkswagen",
"Peugeot",
"Volvo",
"Jeep",
"Lexus",
"Jaguar",
"Land Rover",
"Porsche",
"Mini",
"Foton",
"Chery",
"BYD",
"MG",
"Tata",
"GAC",
"Geely",
"SsangYong",
"Dongfeng",
"BAIC",
"JAC",
"Hino",
"Fuso",
"Mahindra"
];

export const CarTypeList = [
    "Sedan",
    "Hatchback",
    "Coupe",
    "Convertible",
    "Wagon",
    "Compact SUV",
    "Mid-size SUV",
    "Full-size SUV",
    "Luxury SUV",
    "Crossover",
    "Compact Pickup Truck",
    "Full-size Pickup Truck",
    "Heavy-duty Pickup Truck",
    "Minivan",
    "Passenger Van",
    "Cargo Van",
    "MPV (Multi-Purpose Vehicle)",
    "Sports Car",
    "Supercar",
    "Hypercar",
    "Electric Car (EV)",
    "Plug-in Hybrid (PHEV)",
    "Hybrid Car",
    "Off-Roader",
    "4x4 Pickup",
    "Utility Vehicle (UTV)"
]