export default class SwapiService {
  _apiBase = 'http://localhost:5000';

  _imageBase = '/assets/img';

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }

    return res.json();
  };

  getAllPeople = async () => {
    const res = await this.getResource('/people/');
    return res.map(this._transformPerson);
  };

  getPerson = async (id) => {
    const person = await this.getResource(`/people/${id}/`);
    return this._transformPerson(person);
  };

  getAllPlanets = async () => {
    const res = await this.getResource('/planets/');
    return res.map(this._transformPlanet);
  };

  getPlanet = async (id) => {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet);
  };

  getAllStarships = async () => {
    const res = await this.getResource('/starships/');
    return res.map(this._transformStarship);
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
