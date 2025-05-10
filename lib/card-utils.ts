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
    { name: "Pikachu", type: "Pokémon", pokemonType: "Lightning", hp: 60, rarity },
    { name: "Charizard", type: "Pokémon", pokemonType: "Fire", hp: 120, rarity },
    { name: "Blastoise", type: "Pokémon", pokemonType: "Water", hp: 100, rarity },
    { name: "Venusaur", type: "Pokémon", pokemonType: "Grass", hp: 100, rarity },
    { name: "Mewtwo", type: "Pokémon", pokemonType: "Psychic", hp: 80, rarity },
    { name: "Alakazam", type: "Pokémon", pokemonType: "Psychic", hp: 80, rarity },
    { name: "Machamp", type: "Pokémon", pokemonType: "Fighting", hp: 100, rarity },
    { name: "Gyarados", type: "Pokémon", pokemonType: "Water", hp: 100, rarity },
    { name: "Raichu", type: "Pokémon", pokemonType: "Lightning", hp: 80, rarity },
    { name: "Zapdos", type: "Pokémon", pokemonType: "Lightning", hp: 90, rarity },
    { name: "Articuno", type: "Pokémon", pokemonType: "Water", hp: 90, rarity },
    { name: "Moltres", type: "Pokémon", pokemonType: "Fire", hp: 90, rarity },
  ]

  // Jungle set Pokémon
  const junglePokemon = [
    { name: "Snorlax", type: "Pokémon", pokemonType: "Normal", hp: 90, rarity },
    { name: "Flareon", type: "Pokémon", pokemonType: "Fire", hp: 80, rarity },
    { name: "Jolteon", type: "Pokémon", pokemonType: "Lightning", hp: 70, rarity },
    { name: "Vaporeon", type: "Pokémon", pokemonType: "Water", hp: 80, rarity },
    { name: "Wigglytuff", type: "Pokémon", pokemonType: "Normal", hp: 80, rarity },
    { name: "Scyther", type: "Pokémon", pokemonType: "Grass", hp: 70, rarity },
    { name: "Pinsir", type: "Pokémon", pokemonType: "Grass", hp: 70, rarity },
    { name: "Vileplume", type: "Pokémon", pokemonType: "Grass", hp: 80, rarity },
    { name: "Victreebel", type: "Pokémon", pokemonType: "Grass", hp: 80, rarity },
    { name: "Kangaskhan", type: "Pokémon", pokemonType: "Normal", hp: 90, rarity },
  ]

  // Fossil set Pokémon
  const fossilPokemon = [
    { name: "Aerodactyl", type: "Pokémon", pokemonType: "Fighting", hp: 60, rarity },
    { name: "Articuno", type: "Pokémon", pokemonType: "Water", hp: 70, rarity },
    { name: "Ditto", type: "Pokémon", pokemonType: "Normal", hp: 50, rarity },
    { name: "Dragonite", type: "Pokémon", pokemonType: "Colorless", hp: 100, rarity },
    { name: "Gengar", type: "Pokémon", pokemonType: "Psychic", hp: 80, rarity },
    { name: "Haunter", type: "Pokémon", pokemonType: "Psychic", hp: 60, rarity },
    { name: "Hitmonlee", type: "Pokémon", pokemonType: "Fighting", hp: 70, rarity },
    { name: "Hypno", type: "Pokémon", pokemonType: "Psychic", hp: 90, rarity },
    { name: "Kabutops", type: "Pokémon", pokemonType: "Fighting", hp: 70, rarity },
    { name: "Lapras", type: "Pokémon", pokemonType: "Water", hp: 80, rarity },
  ]

  // Team Rocket set Pokémon
  const teamRocketPokemon = [
    { name: "Dark Alakazam", type: "Pokémon", pokemonType: "Psychic", hp: 60, rarity },
    { name: "Dark Arbok", type: "Pokémon", pokemonType: "Grass", hp: 60, rarity },
    { name: "Dark Blastoise", type: "Pokémon", pokemonType: "Water", hp: 80, rarity },
    { name: "Dark Charizard", type: "Pokémon", pokemonType: "Fire", hp: 100, rarity },
    { name: "Dark Dragonite", type: "Pokémon", pokemonType: "Colorless", hp: 90, rarity },
    { name: "Dark Dugtrio", type: "Pokémon", pokemonType: "Fighting", hp: 70, rarity },
    { name: "Dark Golbat", type: "Pokémon", pokemonType: "Grass", hp: 60, rarity },
    { name: "Dark Gyarados", type: "Pokémon", pokemonType: "Water", hp: 90, rarity },
    { name: "Dark Hypno", type: "Pokémon", pokemonType: "Psychic", hp: 70, rarity },
    { name: "Dark Machamp", type: "Pokémon", pokemonType: "Fighting", hp: 80, rarity },
  ]

  // Gym Heroes set Pokémon
  const gymHeroesPokemon = [
    { name: "Brock's Rhydon", type: "Pokémon", pokemonType: "Fighting", hp: 80, rarity },
    { name: "Erika's Clefable", type: "Pokémon", pokemonType: "Normal", hp: 70, rarity },
    { name: "Erika's Vileplume", type: "Pokémon", pokemonType: "Grass", hp: 80, rarity },
    { name: "Lt. Surge's Electabuzz", type: "Pokémon", pokemonType: "Lightning", hp: 70, rarity },
    { name: "Lt. Surge's Raichu", type: "Pokémon", pokemonType: "Lightning", hp: 80, rarity },
    { name: "Misty's Golduck", type: "Pokémon", pokemonType: "Water", hp: 70, rarity },
    { name: "Misty's Gyarados", type: "Pokémon", pokemonType: "Water", hp: 100, rarity },
    { name: "Misty's Tentacruel", type: "Pokémon", pokemonType: "Water", hp: 80, rarity },
    { name: "Rocket's Hitmonchan", type: "Pokémon", pokemonType: "Fighting", hp: 70, rarity },
    { name: "Rocket's Scyther", type: "Pokémon", pokemonType: "Grass", hp: 70, rarity },
  ]

  // Gym Challenge set Pokémon
  const gymChallengePokemon = [
    { name: "Blaine's Arcanine", type: "Pokémon", pokemonType: "Fire", hp: 90, rarity },
    { name: "Blaine's Charizard", type: "Pokémon", pokemonType: "Fire", hp: 100, rarity },
    { name: "Brock's Ninetales", type: "Pokémon", pokemonType: "Fire", hp: 80, rarity },
    { name: "Giovanni's Gyarados", type: "Pokémon", pokemonType: "Water", hp: 100, rarity },
    { name: "Giovanni's Machamp", type: "Pokémon", pokemonType: "Fighting", hp: 100, rarity },
    { name: "Giovanni's Nidoking", type: "Pokémon", pokemonType: "Grass", hp: 90, rarity },
    { name: "Giovanni's Persian", type: "Pokémon", pokemonType: "Normal", hp: 70, rarity },
    { name: "Koga's Beedrill", type: "Pokémon", pokemonType: "Grass", hp: 80, rarity },
    { name: "Koga's Ditto", type: "Pokémon", pokemonType: "Normal", hp: 50, rarity },
    { name: "Sabrina's Alakazam", type: "Pokémon", pokemonType: "Psychic", hp: 80, rarity },
  ]

  // Trainer cards (for all sets)
  const trainerCards = [
    {
      name: "Professor Oak",
      type: "Trainer",
      subtype: "Supporter",
      rarity,
      description: "Discard your hand and draw 7 cards.",
    },
    { name: "Bill", type: "Trainer", subtype: "Supporter", rarity, description: "Draw 2 cards." },
    {
      name: "Potion",
      type: "Trainer",
      subtype: "Item",
      rarity,
      description: "Remove 2 damage counters from 1 of your Pokémon.",
    },
    {
      name: "Super Potion",
      type: "Trainer",
      subtype: "Item",
      rarity,
      description: "Remove 4 damage counters from 1 of your Pokémon. Discard 1 Energy card attached to that Pokémon.",
    },
    {
      name: "Energy Retrieval",
      type: "Trainer",
      subtype: "Item",
      rarity,
      description: "Put 2 basic Energy cards from your discard pile into your hand.",
    },
    {
      name: "Energy Removal",
      type: "Trainer",
      subtype: "Item",
      rarity,
      description: "Discard 1 Energy card attached to 1 of your opponent's Pokémon.",
    },
    {
      name: "Switch",
      type: "Trainer",
      subtype: "Item",
      rarity,
      description: "Switch your Active Pokémon with 1 of your Benched Pokémon.",
    },
    {
      name: "Gust of Wind",
      type: "Trainer",
      subtype: "Item",
      rarity,
      description: "Choose 1 of your opponent's Benched Pokémon and switch it with their Active Pokémon.",
    },
  ]

  // Energy cards (for all sets)
  const energyCards = [
    { name: "Fire Energy", type: "Energy", energyType: "Fire", rarity: "Common" },
    { name: "Water Energy", type: "Energy", energyType: "Water", rarity: "Common" },
    { name: "Grass Energy", type: "Energy", energyType: "Grass", rarity: "Common" },
    { name: "Lightning Energy", type: "Energy", energyType: "Lightning", rarity: "Common" },
    { name: "Psychic Energy", type: "Energy", energyType: "Psychic", rarity: "Common" },
    { name: "Fighting Energy", type: "Energy", energyType: "Fighting", rarity: "Common" },
    { name: "Darkness Energy", type: "Energy", energyType: "Darkness", rarity: "Common" },
    { name: "Metal Energy", type: "Energy", energyType: "Metal", rarity: "Common" },
    { name: "Fairy Energy", type: "Energy", energyType: "Fairy", rarity: "Common" },
    { name: "Double Colorless Energy", type: "Energy", energyType: "Colorless", rarity: "Uncommon" },
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
    case "jungle":
      pokemonPool = junglePokemon
      break
    case "fossil":
      pokemonPool = fossilPokemon
      break
    case "team-rocket":
      pokemonPool = teamRocketPokemon
      break
    case "gym-heroes":
      pokemonPool = gymHeroesPokemon
      break
    case "gym-challenge":
      pokemonPool = gymChallengePokemon
      break
    default:
      pokemonPool = baseSetPokemon
  }

  // Filter the card pool based on rarity
  const filteredPokemonPool = pokemonPool.filter((card) => card.rarity === rarity)
  const filteredTrainerPool = trainerCards.filter((card) => card.rarity === rarity)
  const filteredEnergyPool = energyCards.filter((card) => card.rarity === rarity)

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
        name: "Pikachu",
        type: "Pokémon",
        pokemonType: "Lightning",
        hp: 60,
        rarity,
        attacks: [
          {
            name: "Thunder Shock",
            damage: 20,
            description: "Flip a coin. If heads, the Defending Pokémon is now Paralyzed.",
          },
          { name: "Quick Attack", damage: 30, description: "Flip a coin. If heads, this attack does 10 more damage." },
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
