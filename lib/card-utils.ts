// Local storage keys
const COLLECTION_KEY = "pokemon_tcg_collection"
const DECKS_KEY = "pokemon_tcg_decks"

// Card rarity types
type CardRarity = "Common" | "Uncommon" | "Rare" | "Rare Holo" | "Ultra Rare"

// Function to open a booster pack
export function openBoosterPack(setId: string): any[] {
  // Define the distribution of card types and rarities in a pack
  // A standard Pokémon booster pack has 10 cards:
  // - 6 common cards
  // - 3 uncommon cards
  // - 1 rare or better card

  const cards = []

  // Add 6 common cards
  for (let i = 0; i < 6; i++) {
    cards.push(generateRandomCard(setId, "Common"))
  }

  // Add 3 uncommon cards
  for (let i = 0; i < 3; i++) {
    cards.push(generateRandomCard(setId, "Uncommon"))
  }

  // Add 1 rare or better card (with a chance for holo or ultra rare)
  const rareRoll = Math.random()
  if (rareRoll < 0.02) {
    // 2% chance for ultra rare
    cards.push(generateRandomCard(setId, "Ultra Rare"))
  } else if (rareRoll < 0.22) {
    // 20% chance for holo rare
    cards.push(generateRandomCard(setId, "Rare Holo"))
  } else {
    // 78% chance for regular rare
    cards.push(generateRandomCard(setId, "Rare"))
  }

  // Add the cards to the collection
  addCardsToCollection(cards)

  return cards
}

// Generate a random card based on set and rarity
function generateRandomCard(setId: string, rarity: CardRarity): any {
  // Get the appropriate card pool based on the set
  const cardPool = getCardPoolBySet(setId, rarity)

  // Select a random card from the pool
  const randomIndex = Math.floor(Math.random() * cardPool.length)
  return cardPool[randomIndex]
}

// Get card pool by set and rarity
function getCardPoolBySet(setId: string, rarity: CardRarity): any[] {
  // This would ideally come from a database of all cards
  // For now, we'll generate some cards based on the set

  const cardPool = []

  // Base set Pokémon
  const baseSetPokemon = [
    { name: "sutta", type: "Pokémon", pokemonType: "Lightning", hp: 60, rarity },
    { name: "Charizard", type: "Pokémon", pokemonType: "Fire", hp: 120, rarity },
    { name: "Blastoise", type: "Pokémon", pokemonType: "Water", hp: 100, rarity },
    { name: "Venusaur", type: "Pokémon", pokemonType: "Grass", hp: 100, rarity },
    ]

  // Add attacks to Pokémon cards
  const addAttacksToPokemon = (pokemon: any[]) => {
    return pokemon.map((card) => {
      if (card.type === "Pokémon") {
        return {
          ...card,
          attacks: [
            {
              name: `${card.pokemonType} Attack`,
              damage: 20 + Math.floor(Math.random() * 40), // Random damage between 20-60
              description: "Basic attack",
            },
            {
              name: `${card.name} Special`,
              damage: 40 + Math.floor(Math.random() * 60), // Random damage between 40-100
              description: "This Pokémon's signature move",
            },
          ],
          set: setId,
        }
      }
      return { ...card, set: setId }
    })
  }

  // Select the appropriate card pool based on the set ID
  let pokemonPool
  switch (setId) {
    case "base":
      pokemonPool = baseSetPokemon
      break
  }

  // Filter the card pool based on rarity
  const filteredPokemonPool = pokemonPool.filter((card) => card.rarity === rarity)
  // Add attacks to Pokémon cards
  const pokemonWithAttacks = addAttacksToPokemon(filteredPokemonPool)

  // Combine all card types based on rarity
  if (rarity === "Common") {
    // Common cards are mostly energy and some Pokémon
    cardPool.push(...pokemonWithAttacks, ...filteredTrainerPool, ...filteredEnergyPool)
  } else if (rarity === "Uncommon") {
    // Uncommon cards are mostly trainers and some Pokémon
    cardPool.push(...pokemonWithAttacks, ...filteredTrainerPool)
  } else {
    // Rare cards are mostly Pokémon
    cardPool.push(...pokemonWithAttacks)
  }

  // If the card pool is empty (which shouldn't happen), return a default card
  if (cardPool.length === 0) {
    return [
      {
        name: "sutta",
        type: "Pokémon",
        pokemonType: "Lightning",
        hp: 60,
        rarity,
        attacks: [
          {
            name: "puff",
            damage: 20,
            description: "cough",
          },
        ],
        set: setId,
      },
    ]
  }

  return cardPool
}

// Add cards to the collection
function addCardsToCollection(cards: any[]): void {
  let collection: any[] = []

  // Try to get existing collection from localStorage
  if (typeof window !== "undefined") {
    const storedCollection = localStorage.getItem(COLLECTION_KEY)
    if (storedCollection) {
      try {
        collection = JSON.parse(storedCollection)
      } catch (e) {
        console.error("Error parsing collection:", e)
        collection = []
      }
    }

    // Add IDs to new cards
    const cardsWithIds = cards.map((card) => ({
      ...card,
      id: `${card.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }))

    // Add new cards
    collection = [...collection, ...cardsWithIds]

    // Save back to localStorage
    localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection))
  }
}

// Get the user's collection
export function getCollection(): any[] {
  if (typeof window !== "undefined") {
    const storedCollection = localStorage.getItem(COLLECTION_KEY)
    if (storedCollection) {
      try {
        return JSON.parse(storedCollection)
      } catch (e) {
        console.error("Error parsing collection:", e)
        return []
      }
    }
  }

  // For server-side rendering or if no collection exists
  return []
}

// Save a deck
export function saveDeck(deck: any): void {
  if (typeof window !== "undefined") {
    let decks = []

    // Try to get existing decks from localStorage
    const storedDecks = localStorage.getItem(DECKS_KEY)
    if (storedDecks) {
      try {
        decks = JSON.parse(storedDecks)
      } catch (e) {
        console.error("Error parsing decks:", e)
        decks = []
      }
    }

    // Check if deck with this ID already exists
    const existingDeckIndex = decks.findIndex((d: any) => d.id === deck.id)
    if (existingDeckIndex >= 0) {
      // Update existing deck
      decks[existingDeckIndex] = deck
    } else {
      // Add new deck
      decks.push(deck)
    }

    // Save back to localStorage
    localStorage.setItem(DECKS_KEY, JSON.stringify(decks))
  }
}

// Get all saved decks
export function getDecks(): any[] {
  if (typeof window !== "undefined") {
    const storedDecks = localStorage.getItem(DECKS_KEY)
    if (storedDecks) {
      try {
        return JSON.parse(storedDecks)
      } catch (e) {
        console.error("Error parsing decks:", e)
        return []
      }
    }
  }

  // For server-side rendering or if no decks exist
  return []
}

// Delete a deck
export function deleteDeck(deckId: string): void {
  if (typeof window !== "undefined") {
    let decks = []

    // Try to get existing decks from localStorage
    const storedDecks = localStorage.getItem(DECKS_KEY)
    if (storedDecks) {
      try {
        decks = JSON.parse(storedDecks)
        // Filter out the deck to delete
        decks = decks.filter((deck: any) => deck.id !== deckId)
        // Save back to localStorage
        localStorage.setItem(DECKS_KEY, JSON.stringify(decks))
      } catch (e) {
        console.error("Error parsing decks:", e)
      }
    }
  }
}
