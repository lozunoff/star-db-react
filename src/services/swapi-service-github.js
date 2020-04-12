export default class SwapiServiceGithub {
  _apiBase = 'https://raw.githubusercontent.com/lozunoff/star-db-react/master/src/mocks/db.json';
  _imageBase = 'https://raw.githubusercontent.com/lozunoff/star-db-react/master/public/assets/img';

  getResource = async () => {
    const res = await fetch(`${this._apiBase}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}` +
        `, received ${res.status}`)
    }
    return await res.json();
  };

  getAllPeople = async () => {
    const res = await this.getResource();
    return res.people.map(this._transformPerson).slice(0, 5);
  };

  getPerson = async (id) => {
    const res = await this.getResource();
    return this._transformPerson(res.people.find(item => item.id == id));
  };

  getAllPlanets = async () => {
    const res = await this.getResource();
    return res.planets.map(this._transformPlanet).slice(2, 7);
  };

  getPlanet = async (id) => {
    const res = await this.getResource();
    return this._transformPlanet(res.planets.find(item => item.id == id));
  };

  getAllStarships = async () => {
    const res = await this.getResource();
    return res.starships.map(this._transformStarship).slice(4, 9);
  };

  getStarship = async (id) => {
    const res = await this.getResource();
    return this._transformStarship(res.starships.find(item => item.id == id));
  };

  getPersonImage = ({id}) => {
    return `${this._imageBase}/characters/${id}.jpg`
  };

  getStarshipImage = ({id}) => {
    return `${this._imageBase}/starships/${id}.jpg`
  };

  getPlanetImage = ({id}) => {
    return `${this._imageBase}/planets/${id}.jpg`
  };

  _transformPlanet = (planet) => {
    return {
      id: planet.id,
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    };
  };

  _transformStarship = (starship) => {
    return {
      id: starship.id,
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargo_capacity
    }
  };

  _transformPerson = (person) => {
    return {
      id: person.id,
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color
    }
  };
}
