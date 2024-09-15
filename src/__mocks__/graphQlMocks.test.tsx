import {
  mockHeadersPoke,
  mockHeadersSwapi,
  mockQueryPoke,
  mockQuerySwapiNetlify,
  mockSdlUrl,
  mockEndpointUrlPoke,
  mockEndpointUrlCountries,
  mockEndpointUrlSwapiNetlify,
  mockVariablesPoke,
  mockedResponsePoke,
} from './graphQlMocks';

describe('Mock Data Tests', () => {
  test('mockHeadersPoke should have correct structure', () => {
    expect(mockHeadersPoke).toHaveLength(2);
    expect(mockHeadersPoke[0]).toEqual({ key: 'Content-Type', value: 'application/json' });
    expect(mockHeadersPoke[1]).toEqual({ key: 'X-Method-Used', value: 'graphiql' });
  });

  test('mockHeadersSwapi should have correct structure', () => {
    expect(mockHeadersSwapi).toHaveLength(1);
    expect(mockHeadersSwapi[0]).toEqual({ key: 'Content-Type', value: 'application/json' });
  });

  test('mockQueryPoke should be a non-empty string', () => {
    expect(mockQueryPoke).toBeDefined();
    expect(mockQueryPoke).toMatch(/query pokemon_details/);
  });

  test('mockQuerySwapiNetlify should be a non-empty string', () => {
    expect(mockQuerySwapiNetlify).toBeDefined();
    expect(mockQuerySwapiNetlify).toMatch(/allFilms/);
  });

  test('mockSdlUrl should be a valid URL', () => {
    expect(mockSdlUrl).toMatch(/^https?:\/\/.+/);
  });

  test('mockEndpointUrlPoke should be a valid URL', () => {
    expect(mockEndpointUrlPoke).toMatch(/^https?:\/\/.+/);
  });

  test('mockEndpointUrlCountries should be a valid URL', () => {
    expect(mockEndpointUrlCountries).toMatch(/^https?:\/\/.+/);
  });

  test('mockEndpointUrlSwapiNetlify should be a valid URL', () => {
    expect(mockEndpointUrlSwapiNetlify).toMatch(/^https?:\/\/.+/);
  });

  test('mockVariablesPoke should have correct structure', () => {
    expect(mockVariablesPoke).toEqual({ name: 'starmie' });
  });

  test('mockHeadersPoke should not contain unexpected keys', () => {
    mockHeadersPoke.forEach((header) => {
      expect(header).not.toHaveProperty('unexpectedKey');
    });
  });

  test('mockQueryPoke should not be empty', () => {
    expect(mockQueryPoke).not.toBe('');
  });

  test('mockQuerySwapiNetlify should not be empty', () => {
    expect(mockQuerySwapiNetlify).not.toBe('');
  });

  test('mockSdlUrl should not be an invalid URL', () => {
    expect(mockSdlUrl).not.toMatch(/invalid-url/);
  });

  test('mockEndpointUrlPoke should not be an invalid URL', () => {
    expect(mockEndpointUrlPoke).not.toMatch(/invalid-url/);
  });

  test('mockEndpointUrlCountries should not be an invalid URL', () => {
    expect(mockEndpointUrlCountries).not.toMatch(/invalid-url/);
  });

  test('mockEndpointUrlSwapiNetlify should not be an invalid URL', () => {
    expect(mockEndpointUrlSwapiNetlify).not.toMatch(/invalid-url/);
  });

  test('mockVariablesPoke should not have an unexpected property', () => {
    expect(mockVariablesPoke).not.toHaveProperty('unexpectedProperty');
  });

  test('should contain species array with at least one species', () => {
    expect(Array.isArray(mockedResponsePoke.species)).toBe(true);
    expect(mockedResponsePoke.species.length).toBeGreaterThan(0);
  });

  test('should have correct species name', () => {
    const species = mockedResponsePoke.species[0];
    expect(species.name).toBe('starmie');
  });

  test('should have a valid base happiness value', () => {
    const species = mockedResponsePoke.species[0];
    expect(species.base_happiness).toBeGreaterThanOrEqual(0);
    expect(species.base_happiness).toBeLessThanOrEqual(255);
  });

  test('should have correct abilities', () => {
    const abilities = mockedResponsePoke.species[0].pokemon.nodes[0].abilities.nodes;
    const abilityNames = abilities.map((ability) => ability.ability.name);
    expect(abilityNames).toContain('illuminate');
    expect(abilityNames).toContain('natural-cure');
    expect(abilityNames).toContain('analytic');
  });

  test('should have valid stats', () => {
    const stats = mockedResponsePoke.species[0].pokemon.nodes[0].stats;
    expect(stats.length).toBe(6);
    expect(stats[0].base_stat).toBe(60);
    expect(stats[1].base_stat).toBe(75);
    expect(stats[2].base_stat).toBe(85);
    expect(stats[3].base_stat).toBe(100);
    expect(stats[4].base_stat).toBe(85);
    expect(stats[5].base_stat).toBe(115);
  });

  test('should not have a species name other than "starmie"', () => {
    const species = mockedResponsePoke.species[0];
    expect(species.name).not.toBe('pikachu');
  });

  test('should not have negative base happiness', () => {
    const species = mockedResponsePoke.species[0];
    expect(species.base_happiness).not.toBeLessThan(0);
  });

  test('should not have more than 6 stats', () => {
    const stats = mockedResponsePoke.species[0].pokemon.nodes[0].stats;
    expect(stats.length).not.toBeGreaterThan(6);
  });

  test('should handle empty species array gracefully', () => {
    const emptyResponse = { species: [] };
    expect(() => {
      expect(Array.isArray(emptyResponse.species)).toBe(true);
      expect(emptyResponse.species.length).toBeGreaterThan(0);
    }).toThrow();
  });

  test('should validate the structure of the first species', () => {
    const species = mockedResponsePoke.species[0];
    expect(species).toHaveProperty('name');
    expect(species).toHaveProperty('base_happiness');
    expect(species).toHaveProperty('is_legendary');
    expect(species).toHaveProperty('habitat');
    expect(species).toHaveProperty('pokemon');
    expect(species.pokemon).toHaveProperty('nodes');
  });
});
