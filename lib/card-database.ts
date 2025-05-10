import { CardType, PokemonType, TrainerSubtype } from "./types"

// Generate a starter deck (Pikachu & Friends)
export function getStarterDeck() {
  return [
    // Pokémon Cards
    {
      id: "pika1",
      type: CardType.POKEMON,
      name: "sutta",
      hp: 60,
      stage: "Basic",
      pokemonType: PokemonType.LIGHTNING,
      weakness: PokemonType.FIGHTING,
      resistance: null,
      retreatCost: 1,
      attacks: [
        {
          name: "puff",
          damage: 10,
          energyCost: [PokemonType.LIGHTNING],
          effect: "coughing",
        },
      ],
    },
    {
      id: "rai1",
      type: CardType.POKEMON,
      name: "Raichu",
      hp: 90,
      stage: "Stage 1",
      evolvesFrom: "Pikachu",
      pokemonType: PokemonType.LIGHTNING,
      weakness: PokemonType.FIGHTING,
      resistance: null,
      retreatCost: 1,
      attacks: [
        {
          name: "Agility",
          damage: 20,
          energyCost: [PokemonType.LIGHTNING, PokemonType.COLORLESS],
          effect:
            "Flip a coin. If heads, during your opponent's next turn, prevent all effects of attacks, including damage, done to this Pokémon.",
        },
        {
          name: "Thunder",
          damage: 60,
          energyCost: [PokemonType.LIGHTNING, PokemonType.LIGHTNING, PokemonType.COLORLESS],
          effect: "This Pokémon does 10 damage to itself.",
        },
      ],
    },
    {
      id: "bulb1",
      type: CardType.POKEMON,
      name: "Bulbasaur",
      hp: 60,
      stage: "Basic",
      pokemonType: PokemonType.GRASS,
      weakness: PokemonType.FIRE,
      resistance: null,
      retreatCost: 1,
      attacks: [
        {
          name: "Leech Seed",
          damage: 20,
          energyCost: [PokemonType.GRASS, PokemonType.COLORLESS],
          effect: "Remove 1 damage counter from this Pokémon.",
        },
      ],
    },
    {
      id: "ivy1",
      type: CardType.POKEMON,
      name: "Ivysaur",
      hp: 70,
      stage: "Stage 1",
      evolvesFrom: "Bulbasaur",
      pokemonType: PokemonType.GRASS,
      weakness: PokemonType.FIRE,
      resistance: null,
      retreatCost: 1,
      attacks: [
        {
          name: "Vine Whip",
          damage: 30,
          energyCost: [PokemonType.GRASS, PokemonType.COLORLESS],
          effect: null,
        },
        {
          name: "Poisonpowder",
          damage: 20,
          energyCost: [PokemonType.GRASS, PokemonType.GRASS, PokemonType.COLORLESS],
          effect: "The Defending Pokémon is now Poisoned.",
        },
  
      ],
    },


  ]
}
