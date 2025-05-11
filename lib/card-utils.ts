import { CardType, PokemonType, TrainerSubtype } from "./types"

const COLLECTION_KEY = "pokemon_tcg_collection"

type CardRarity = "Common" | "Uncommon" | "Rare" | "Rare Holo" | "Ultra Rare"

const baseSetPokemon = [
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
    image: "/2.png" ,
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
    rarity: "Common",
    image: "/5.png" ,
    alwaysInclude: true,
   
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
    rarity: "Common",
    image: "/3.png" ,
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
    rarity: "Ultra Rare",
    image: "/4.png" ,
    alwaysInclude: false,
    
  },
  {
    id: "sutta",
    name: "sutta",
    type: CardType.POKEMON,
    pokemonType: "Smoke",
    hp: 60,
    stage: "Basic",
    attacks: [{ name: "puff", damage: 10, effect: "coughing" }],
    retreatCost: 1,
    rarity: "Ultra Rare",
    image: "/12.png" ,
    alwaysInclude: false,
    
  }
]

export function openBoosterPack(): any[] {
  const cards: any[] = []

  // Add always-included cards
  const guaranteed = baseSetPokemon.filter(card => card.alwaysInclude)
  cards.push(...guaranteed)

  // 20% chance to include one ultra rare card
  const ultraRares = baseSetPokemon.filter(card => card.rarity === "Ultra Rare")
  if (Math.random() < 0.2 && ultraRares.length > 0) {
    const randomIndex = Math.floor(Math.random() * ultraRares.length)
    cards.push(ultraRares[randomIndex])
  }

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
      id: `${card.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
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
