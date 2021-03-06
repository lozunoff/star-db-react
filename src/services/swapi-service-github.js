export default class SwapiServiceGithub {
  _apiBase = 'https://raw.githubusercontent.com/lozunoff/star-db-react/master/src/mocks/db.json';

  _imageBase = 'https://raw.githubusercontent.com/lozunoff/star-db-react/master/public/assets/img';

  getResource = async () => {
    const res = await fetch(`${this._apiBase}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}, received ${res.status}`);
    }

    return res.json();
  };

  getAllPeople = async (page = 1) => {
    const res = await this.getResource();

    const start = page * 10 - 10;
    const end = page * 10;

    return {
      allPages: Math.ceil(res.people.length / 10),
      data: res.people.slice(start, end).map(this._transformPerson),
    };
  };

  getPerson = async (id) => {
    const res = await this.getResource();
    return this._transformPerson(res.people.find((item) => item.id === Number(id)));
  };

  getAllPlanets = async (page = 1) => {
    const res = await this.getResource();

    const start = page * 10 - 10;
    const end = page * 10;

    return {
      allPages: Math.ceil(res.planets.length / 10),
      data: res.planets.slice(start, end).map(this._transformPlanet),
    };
  };

  getPlanet = async (id) => {
    const res = await this.getResource();
    return this._transformPlanet(res.planets.find((item) => item.id === Number(id)));
  };

  getAllStarships = async (page = 1) => {
    const res = await this.getResource();

    const start = page * 10 - 10;
    const end = page * 10;

    return {
      allPages: Math.ceil(res.starships.length / 10),
      data: res.starships.slice(start, end).map(this._transformStarship),
    };
  };

  getStarship = async (id) => {
    const res = await this.getResource();
    return this._transformStarship(res.starships.find((item) => item.id === Number(id)));
  };

  getPersonImage = ({ id }) => ({
    src: `${this._imageBase}/characters/${id}.jpg`,
    defaultSrc: `${this._imageBase}/placeholder.jpg`,
  });

  getStarshipImage = ({ id }) => ({
    src: `${this._imageBase}/starships/${id}.jpg`,
    defaultSrc: `${this._imageBase}/placeholder-big.jpg`,
  });

  getPlanetImage = ({ id }) => ({
    src: `${this._imageBase}/planets/${id}.jpg`,
    defaultSrc: `${this._imageBase}/placeholder-square.jpg`,
  });

  _transformPlanet = (planet) => ({
    id: planet.id,
    name: planet.name,
    population: planet.population,
    rotationPeriod: planet.rotation_period,
    diameter: planet.diameter,
  });

  _transformStarship = (starship) => ({
    id: starship.id,
    name: starship.name,
    model: starship.model,
    manufacturer: starship.manufacturer,
    costInCredits: starship.cost_in_credits,
    length: starship.length,
    crew: starship.crew,
    passengers: starship.passengers,
    cargoCapacity: starship.cargo_capacity,
  });

  _transformPerson = (person) => ({
    id: person.id,
    name: person.name,
    gender: person.gender,
    birthYear: person.birth_year,
    eyeColor: person.eye_color,
  });
}
