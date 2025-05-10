import { type GameState, CardType, Zone } from "./types"
import { getStarterDeck, getWaterDeck, getFireDeck } from "./card-database"

// Initialize a new game
export function startGame(deckType: string): GameState {
  // Get the appropriate deck based on selection
  let playerDeck
  switch (deckType) {
    case "water":
      playerDeck = getWaterDeck()
      break
    case "fire":
      playerDeck = getFireDeck()
      break
    default:
      playerDeck = getStarterDeck()
  }

  // Shuffle the player's deck
  const shuffledPlayerDeck = shuffleDeck([...playerDeck])

  // Draw initial hand
  const playerHand = shuffledPlayerDeck.splice(0, 7)

  // Set prize cards
  const playerPrizeCards = shuffledPlayerDeck.splice(0, 6)

  // Create opponent's deck (using starter deck for simplicity)
  const opponentDeck = shuffleDeck([...getStarterDeck()])
  const opponentHand = opponentDeck.splice(0, 7)
  const opponentPrizeCards = opponentDeck.splice(0, 6)

  // Find a basic Pokémon for the opponent's active spot
  let opponentActive = null
  for (let i = 0; i < opponentHand.length; i++) {
    if (opponentHand[i].type === CardType.POKEMON && opponentHand[i].stage === "Basic") {
      opponentActive = opponentHand.splice(i, 1)[0]
      break
    }
  }

  // Set up bench Pokémon for opponent (up to 3)
  const opponentBench = []
  for (let i = 0; i < opponentHand.length && opponentBench.length < 3; i++) {
    if (opponentHand[i].type === CardType.POKEMON && opponentHand[i].stage === "Basic") {
      opponentBench.push(opponentHand.splice(i, 1)[0])
      i--
    }
  }

  return {
    player: {
      active: null,
      bench: [],
      hand: playerHand,
      deck: shuffledPlayerDeck,
      discard: [],
      prizeCards: playerPrizeCards,
    },
    opponent: {
      active: opponentActive,
      bench: opponentBench,
      hand: opponentHand,
      deck: opponentDeck,
      discard: [],
      prizeCards: opponentPrizeCards,
    },
    turn: 1,
    currentTurn: "player",
    gameOver: false,
  }
}

// Shuffle a deck of cards
function shuffleDeck(deck: any[]): any[] {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}

// Draw a card from the deck
export function drawCard(gameState: GameState): GameState {
  const newState = { ...gameState }
  const currentPlayer = newState.currentTurn

  if (currentPlayer === "player") {
    if (newState.player.deck.length === 0) {
      // Player loses if they can't draw a card
      newState.gameOver = true
      newState.winner = "opponent"
      return newState
    }

    const drawnCard = newState.player.deck.shift()
    if (drawnCard) {
      newState.player.hand.push(drawnCard)
    }
  } else {
    if (newState.opponent.deck.length === 0) {
      // Opponent loses if they can't draw a card
      newState.gameOver = true
      newState.winner = "player"
      return newState
    }

    const drawnCard = newState.opponent.deck.shift()
    if (drawnCard) {
      newState.opponent.hand.push(drawnCard)
    }
  }

  return newState
}

// Play a card from hand
export function playCard(gameState: GameState, cardIndex: number, zone: { type: Zone; index?: number }): GameState {
  const newState = JSON.parse(JSON.stringify(gameState))
  const currentPlayer = newState.currentTurn

  if (currentPlayer !== "player") return newState // Only player can play cards manually

  const card = newState.player.hand[cardIndex]
  if (!card) return newState

  // Handle different card types
  if (card.type === CardType.POKEMON) {
    if (zone.type === Zone.ACTIVE && !newState.player.active && card.stage === "Basic") {
      // Play as active Pokémon
      newState.player.active = { ...card, attachedEnergy: [] }
      newState.player.hand.splice(cardIndex, 1)
    } else if (zone.type === Zone.BENCH && newState.player.bench.length < 5 && card.stage === "Basic") {
      // Play to bench
      newState.player.bench.push({ ...card, attachedEnergy: [] })
      newState.player.hand.splice(cardIndex, 1)
    } else if ((zone.type === Zone.ACTIVE || zone.type === Zone.BENCH) && card.stage !== "Basic") {
      // Handle evolution
      const targetPokemon = zone.type === Zone.ACTIVE ? newState.player.active : newState.player.bench[zone.index || 0]

      if (targetPokemon && targetPokemon.name === card.evolvesFrom) {
        // Evolve the Pokémon
        const evolvedPokemon = {
          ...card,
          attachedEnergy: targetPokemon.attachedEnergy,
          hp: card.hp, // Reset HP to the new evolution's max
        }

        if (zone.type === Zone.ACTIVE) {
          newState.player.active = evolvedPokemon
        } else {
          newState.player.bench[zone.index || 0] = evolvedPokemon
        }

        newState.player.hand.splice(cardIndex, 1)
      }
    }
  } else if (card.type === CardType.TRAINER) {
    // Play trainer card
    // This is simplified - in a real game, different trainer cards have different effects
    newState.player.discard.push(card)
    newState.player.hand.splice(cardIndex, 1)
  }

  return newState
}

// Attach energy to a Pokémon
export function attachEnergy(
  gameState: GameState,
  cardIndex: number,
  zone: { type: Zone; index?: number },
  pokemonIndex: number,
): GameState {
  const newState = JSON.parse(JSON.stringify(gameState))

  if (newState.currentTurn !== "player") return newState

  const card = newState.player.hand[cardIndex]
  if (!card || card.type !== CardType.ENERGY) return newState

  let targetPokemon
  if (zone.type === Zone.ACTIVE) {
    targetPokemon = newState.player.active
    if (!targetPokemon) return newState

    targetPokemon.attachedEnergy.push(card)
    newState.player.hand.splice(cardIndex, 1)
  } else if (zone.type === Zone.BENCH) {
    targetPokemon = newState.player.bench[pokemonIndex]
    if (!targetPokemon) return newState

    targetPokemon.attachedEnergy.push(card)
    newState.player.hand.splice(cardIndex, 1)
  }

  return newState
}

// Use an attack
export function useAttack(gameState: GameState, attackIndex: number): GameState {
  const newState = JSON.parse(JSON.stringify(gameState))

  if (newState.currentTurn !== "player" || !newState.player.active) return newState

  const attack = newState.player.active.attacks[attackIndex]
  if (!attack) return newState

  // Check if there's enough energy for the attack
  // This is simplified - in a real game, you'd need to check specific energy types
  const attachedEnergy = newState.player.active.attachedEnergy.length
  const requiredEnergy = attack.energyCost.length

  if (attachedEnergy < requiredEnergy) return newState

  // Apply damage to opponent's active Pokémon
  if (newState.opponent.active) {
    newState.opponent.active.hp -= attack.damage

    // Check if opponent's Pokémon is knocked out
    if (newState.opponent.active.hp <= 0) {
      // Move knocked out Pokémon to discard pile
      newState.opponent.discard.push(newState.opponent.active)
      newState.opponent.active = null

      // Take a prize card
      if (newState.player.prizeCards.length > 0) {
        const prizeCard = newState.player.prizeCards.pop()
        if (prizeCard) {
          newState.player.hand.push(prizeCard)
        }
      }

      // Check if player has taken all prize cards
      if (newState.player.prizeCards.length === 0) {
        newState.gameOver = true
        newState.winner = "player"
      }

      // Check if opponent has any bench Pokémon to promote
      if (newState.opponent.bench.length > 0) {
        // For simplicity, just promote the first bench Pokémon
        newState.opponent.active = newState.opponent.bench.shift()
      } else {
        // If no bench Pokémon, player wins
        newState.gameOver = true
        newState.winner = "player"
      }
    }
  }

  // End player's turn after attacking
  newState.currentTurn = "opponent"

  return newState
}

// End the current turn
export function endTurn(gameState: GameState): GameState {
  const newState = JSON.parse(JSON.stringify(gameState))

  if (newState.currentTurn === "player") {
    // End player's turn
    newState.currentTurn = "opponent"

    // Simulate opponent's turn
    simulateOpponentTurn(newState)
  } else {
    // End opponent's turn
    newState.currentTurn = "player"
    newState.turn += 1
  }

  return newState
}

// Simulate opponent's turn (basic AI)
function simulateOpponentTurn(gameState: GameState): void {
  // Draw a card
  if (gameState.opponent.deck.length > 0) {
    const drawnCard = gameState.opponent.deck.shift()
    if (drawnCard) {
      gameState.opponent.hand.push(drawnCard)
    }
  } else {
    // Opponent loses if they can't draw a card
    gameState.gameOver = true
    gameState.winner = "player"
    return
  }

  // Play a basic Pokémon if active spot is empty
  if (!gameState.opponent.active) {
    for (let i = 0; i < gameState.opponent.hand.length; i++) {
      const card = gameState.opponent.hand[i]
      if (card.type === CardType.POKEMON && card.stage === "Basic") {
        gameState.opponent.active = { ...card, attachedEnergy: [] }
        gameState.opponent.hand.splice(i, 1)
        break
      }
    }
  }

  // Play basic Pokémon to bench if space available
  if (gameState.opponent.bench.length < 5) {
    for (let i = 0; i < gameState.opponent.hand.length; i++) {
      const card = gameState.opponent.hand[i]
      if (card.type === CardType.POKEMON && card.stage === "Basic") {
        gameState.opponent.bench.push({ ...card, attachedEnergy: [] })
        gameState.opponent.hand.splice(i, 1)

        // Limit to adding one Pokémon per turn for simplicity
        break
      }
    }
  }

  // Attach energy if active Pokémon exists
  if (gameState.opponent.active) {
    for (let i = 0; i < gameState.opponent.hand.length; i++) {
      const card = gameState.opponent.hand[i]
      if (card.type === CardType.ENERGY) {
        gameState.opponent.active.attachedEnergy.push(card)
        gameState.opponent.hand.splice(i, 1)
        break
      }
    }
  }

  // Attack if possible
  if (gameState.opponent.active && gameState.player.active) {
    // Find an attack that has enough energy
    const attachedEnergy = gameState.opponent.active.attachedEnergy.length

    for (let i = 0; i < gameState.opponent.active.attacks.length; i++) {
      const attack = gameState.opponent.active.attacks[i]
      if (attachedEnergy >= attack.energyCost.length) {
        // Use the attack
        gameState.player.active.hp -= attack.damage

        // Check if player's Pokémon is knocked out
        if (gameState.player.active.hp <= 0) {
          // Move knocked out Pokémon to discard pile
          gameState.player.discard.push(gameState.player.active)
          gameState.player.active = null

          // Take a prize card
          if (gameState.opponent.prizeCards.length > 0) {
            gameState.opponent.prizeCards.pop()
          }

          // Check if opponent has taken all prize cards
          if (gameState.opponent.prizeCards.length === 0) {
            gameState.gameOver = true
            gameState.winner = "opponent"
          }
        }

        break
      }
    }
  }
}
