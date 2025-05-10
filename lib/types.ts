// Card Types
export enum CardType {
  POKEMON = "Pokémon",
  TRAINER = "Trainer",
  ENERGY = "Energy",
}

// Pokémon Types
export enum PokemonType {
  FIRE = "Fire",
  WATER = "Water",
  GRASS = "Grass",
  LIGHTNING = "Lightning",
  PSYCHIC = "Psychic",
  FIGHTING = "Fighting",
  DARKNESS = "Darkness",
  METAL = "Metal",
  FAIRY = "Fairy",
  DRAGON = "Dragon",
  COLORLESS = "Colorless",
}

// Energy Types (same as Pokémon Types)
export type EnergyType = PokemonType

// Trainer Card Subtypes
export enum TrainerSubtype {
  ITEM = "Item",
  SUPPORTER = "Supporter",
  STADIUM = "Stadium",
  TOOL = "Tool",
}

// Game Zones
export enum Zone {
  ACTIVE = "active",
  BENCH = "bench",
  HAND = "hand",
  DECK = "deck",
  DISCARD = "discard",
  PRIZE = "prize",
}

// Attack interface
export interface Attack {
  name: string
  damage: number
  energyCost: EnergyType[]
  effect?: string
}

// Card interfaces
export interface PokemonCardType {
  id: string
  type: CardType.POKEMON
  name: string
  hp: number
  stage: "Basic" | "Stage 1" | "Stage 2"
  evolvesFrom?: string
  pokemonType: PokemonType
  weakness?: PokemonType
  resistance?: PokemonType
  retreatCost: number
  attacks: Attack[]
  ability?: {
    name: string
    effect: string
  }
  attachedEnergy: EnergyCardType[]
}

export interface TrainerCardType {
  id: string
  type: CardType.TRAINER
  name: string
  subtype: TrainerSubtype
  effect: string
}

export interface EnergyCardType {
  id: string
  type: CardType.ENERGY
  name: string
  energyType: EnergyType
  provides: EnergyType[]
  special?: boolean
}

// Player State
export interface PlayerState {
  active: PokemonCardType | null
  bench: PokemonCardType[]
  hand: (PokemonCardType | TrainerCardType | EnergyCardType)[]
  deck: (PokemonCardType | TrainerCardType | EnergyCardType)[]
  discard: (PokemonCardType | TrainerCardType | EnergyCardType)[]
  prizeCards: (PokemonCardType | TrainerCardType | EnergyCardType)[]
}

// Game State
export interface GameState {
  player: PlayerState
  opponent: PlayerState
  turn: number
  currentTurn: "player" | "opponent"
  gameOver: boolean
  winner?: "player" | "opponent"
}
