export default class SwapiService {
  _apiBase = 'https://swapi.dev/api';

  _imageBase = '/assets/img';

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }

    return res.json();
  };

  getAllPeople = async (page = 1) => {
    const res = await this.getResource(`/people/?page=${page}`);
    return {
      allPages: Math.ceil(res.count / 10),
      data: res.results.map(this._transformPerson),
    };
  };

  getPerson = async (id) => {
    const person = await this.getResource(`/people/${id}/`);
    return this._transformPerson(person);
  };

  getAllPlanets = async (page = 1) => {
    const res = await this.getResource(`/planets/?page=${page}`);
    return {
      allPages: Math.ceil(res.count / 10),
      data: res.results.map(this._transformPlanet),
    };
  };

  getPlanet = async (id) => {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet);
  };

  getAllStarships = async (page = 1) => {
    const res = await this.getResource(`/starships/?page=${page}`);
    return {
      allPages: Math.ceil(res.count / 10),
      data: res.results.map(this._transformStarship),
    };
  };

  getStarship = async (id) => {
    const starship = await this.getResource(`/starships/${id}/`);
    return this._transformStarship(starship);
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

  _extractId = (item) => {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  };

  _transformPlanet = (planet) => ({
    id: this._extractId(planet),
    name: planet.name,
    population: planet.population,
    rotationPeriod: planet.rotation_period,
    diameter: planet.diameter,
  });

  _transformStarship = (starship) => ({
    id: this._extractId(starship),
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
    id: this._extractId(person),
    name: person.name,
    gender: person.gender,
    birthYear: person.birth_year,
    eyeColor: person.eye_color,
  });
}
