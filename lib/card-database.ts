import { CardType, PokemonType, TrainerSubtype } from "./types"

// Generate a starter deck (Pikachu & Friends)
export function getStarterDeck() {
  return [
    // Pokémon Cards
    {
      id: "sutta",
      type: CardType.POKEMON,
      name: "sutta",
      hp: 60,
      stage: "Basic",
      resistance: null,
      retreatCost: 1,
      attacks: [
        {
          name: "puff",
          damage: 10,
          effect: "coughing",
        },
      ],
    },
    {
      id: "rai1",
      type: CardType.POKEMON,
      name: "Invite",
      hp: 90,
      stage: "basic",
      resistance: null,
      retreatCost: 1,
      attacks: [
        {
          name: "location",
          damage: 20,
          effect:
            "u go to kyoto and say my name",
        },
      ],
    },
    {
      id: "bulb1",
      type: CardType.POKEMON,
      name: "cocktail",
      hp: 60,
      stage: "Basic",
      resistance: null,
      retreatCost: 1,
      attacks: [
        {
          name: "nausea",
          damage: 20,
          effect: "gives u nausea effect.",
        },
      ],
    },
    {
      id: "ivy1",
      type: CardType.POKEMON,
      name: "dresscode",
      hp: 70,
      stage: "basic",
      resistance: null,
      retreatCost: 1,
      attacks: [
        {
          name: "your drip",
          damage: 30,
          effect: null,
        },
     
  
      ],
    },
     {
      id: "ivy1",
      type: CardType.POKEMON,
      name: "kareoke",
      hp: 70,
      stage: "basic",
      resistance: null,
      retreatCost: 1,
      attacks: [
        {
          name: "do your song",
          damage: 30,
          effect: null,
        },
     
  
      ],
    },



  ]
}
