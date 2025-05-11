import { CardType, PokemonType, TrainerSubtype } from "./types"

const COLLECTION_KEY = "pokemon_tcg_collection"

type CardRarity = "Common" | "Uncommon" | "Rare" | "Rare Holo" | "Ultra Rare"

const baseSetPokemon = [
  {
    id: "sutta",
    name: "sutta",
    type: CardType.POKEMON,
    pokemonType: "Smoke",
    hp: 60,
    stage: "Basic",
    attacks: [{ name: "puff", damage: 10, effect: "coughing" }],
    retreatCost: 1,
    rarity: "Common",
    alwaysInclude: true,
  },
  {
    id: "rai1",
    name: "Invite",
    type: CardType.POKEMON,
    pokemonType: "Electric",
    hp: 90,
    stage: "Basic",
    attacks: [{ name: "location", damage: 20, effect: "u go to kyoto and say my name" }],
    retreatCost: 1,
    rarity: "Common",
    alwaysInclude: true,
  },
  {
    id: "bulb1",
    name: "cocktail",
    type: CardType.POKEMON,
    pokemonType: "Poison",
    hp: 60,
    stage: "Basic",
    attacks: [{ name: "nausea", damage: 20, effect: "gives u nausea effect." }],
    retreatCost: 1,
    rarity: "Common",
    alwaysInclude: true,
  },
  {
    id: "ivy1",
    name: "dresscode",
    type: CardType.POKEMON,
    pokemonType: "Fashion",
    hp: 70,
    stage: "Basic",
    attacks: [{ name: "your drip", damage: 30 }],
    retreatCost: 1,
    rarity: "Ultra Rare"
  },
  {
    id: "ivy2",
    name: "kareoke",
    type: CardType.POKEMON,
    pokemonType: "Sound",
    hp: 70,
    stage: "Basic",
    attacks: [{ name: "do your song", damage: 30 }],
    retreatCost: 1,
    rarity: "Ultra Rare"
  },
]

export function openBoosterPack(): any[] {
  const cards: any[] = []

  // Always include the guaranteed ones
  const guaranteed = baseSetPokemon.filter(card => card.alwaysInclude)
  cards.push(...guaranteed)

  // Add a 20% chance to pull one ultra rare
  const ultraRares = baseSetPokemon.filter(c => c.rarity === "Ultra Rare")
  if (Math.random() < 0.2 && ultraRares.length > 0) {
    const index = Math.floor(Math.random() * ultraRares.length)
    cards.push(ultraRares[index])
  }

  // Add to collection
  addCardsToCollection(cards)

  return cards
}

function addCardsToCollection(cards: any[]): void {
  let collection: any[] = []

  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(COLLECTION_KEY)
    if (stored) {
      try {
        collection = JSON.parse(stored)
      } catch (e) {
        console.error("Collection parse error:", e)
      }
    }

    const cardsWithIds = cards.map(card => ({
      ...card,
      id: `{card.name.toLowerCase().replace(/\s+/g, "-")}-\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}`
    }))

    localStorage.setItem(COLLECTION_KEY, JSON.stringify([...collection, ...cardsWithIds]))
  }
}

export function getCollection(): any[] {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(COLLECTION_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (e) {
        console.error("Error parsing collection:", e)
      }
    }
  }
  return []
}
