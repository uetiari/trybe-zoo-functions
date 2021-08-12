const data = require('./data');

const { species, employees, prices } = data;

function getSpeciesByIds(...ids) {
  return species.filter((specie) => ids.includes(specie.id));
}

function getAnimalsOlderThan(animal, age) {
  return species.find((specie) => specie.name === animal)
    .residents.every((resident) => resident.age > age);
  // usei o Every para passar em todos do itens array
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/every
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find((coop) => coop.firstName === employeeName
  || coop.lastName === employeeName);
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(specie) {
  if (specie === undefined) {
    const quantAnimal = species.reduce((acc, curAnimal) => {
      acc[curAnimal.name] = curAnimal.residents.length;
      return acc;
    }, {});
    return quantAnimal;
  }
  return species.find((search) => search.name === specie).residents.length;
}

function calculateEntry({ Child = 0, Adult = 0, Senior = 0 } = {}) {
  const totalValue = (Child * prices.Child) + (Adult * prices.Adult) + (Senior * prices.Senior);
  return totalValue;
}

function getAnimalMap(options) {
  // seu código aqui
}

const { hours } = require('./data');

function getSchedule(dayName) {
  const { Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } = hours; // destructuring dias da semana
  const weekInfo = { // constroi um objeto com dias da semana e infos com horários
    Tuesday: `Open from ${Tuesday.open}am until ${Tuesday.close - 12}pm`, // -12 é pra arrumar horário
    Wednesday: `Open from ${Wednesday.open}am until ${Wednesday.close - 12}pm`,
    Thursday: `Open from ${Thursday.open}am until ${Thursday.close - 12}pm`,
    Friday: `Open from ${Friday.open}am until ${Friday.close - 12}pm`,
    Saturday: `Open from ${Saturday.open}am until ${Saturday.close - 12}pm`,
    Sunday: `Open from ${Sunday.open}am until ${Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };
  if (dayName === 'null' || dayName === undefined) {
    return weekInfo; // faz uma condição se o param dayName não for informado retorna lista toda
  }
  return { [dayName]: weekInfo[dayName] }; // se não, mostra retorna param dado informa dia da semana e horários.
}

function getOldestFromFirstSpecies(id) {
  // procura a id do funcionário na primeira posição
  const employeeName = employees.find((coop) => coop.id === id).responsibleFor[0];
  // procura id do animal relacionado com funcionário
  const animalId = species.find((specie) => specie.id === employeeName).residents;
  // procura pela idade
  const animalOlder = animalId.reduce((acc, curr) => (acc.age > curr.age ? acc : curr));
  return [animalOlder.name, animalOlder.sex, animalOlder.age];
  // retorna resultado nome, sexo e idade
}

function increasePrices(percentage) {
  // destruturing prices
  const { Adult, Senior, Child } = prices;
  const adultValue = Math.round((Adult * ((percentage / 100) + 1)) * 100) / 100;
  const seniorValue = Math.round((Senior * ((percentage / 100) + 1)) * 100) / 100;
  const childValue = Math.round((Child * ((percentage / 100) + 1)) * 100) / 100;
  // guarda cada um em uma const e faz conta de porcentagem, quando recebe percentage de param
  // arredonda com math round
  prices.Senior = seniorValue;
  prices.Adult = adultValue;
  prices.Child = childValue;
  // atribui os novos valores

  return prices;
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
