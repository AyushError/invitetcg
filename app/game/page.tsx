"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Home, Info, Settings, Disc } from "lucide-react"
import { cn } from "@/lib/utils"
import useMobile from "@/hooks/use-mobile"
import { GameBoard } from "@/components/game-board"
import { Hand } from "@/components/hand"
import { startGame, drawCard, playCard, attachEnergy, useAttack, endTurn } from "@/lib/game-logic"
import { type GameState, CardType, Zone } from "@/lib/types"

export default function GamePage() {
  const isMobile = useMobile()
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null)
  const [showTurnDialog, setShowTurnDialog] = useState(false)
  const [showAttackDialog, setShowAttackDialog] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [selectedDeck, setSelectedDeck] = useState("starter")
  const [attackIndex, setAttackIndex] = useState<number | null>(null)

  // Initialize game
  useEffect(() => {
    if (gameStarted) {
      const initialGameState = startGame(selectedDeck)
      setGameState(initialGameState)
    }
  }, [gameStarted, selectedDeck])

  // Handle card selection from hand
  const handleCardSelect = (index: number) => {
    setSelectedCard(index)
  }

  // Handle zone selection on board
  const handleZoneSelect = (zone: Zone) => {
    if (selectedCard === null || !gameState) return

    const card = gameState.player.hand[selectedCard]

    // Handle different card types
    if (card.type === CardType.POKEMON) {
      if (zone === Zone.ACTIVE && !gameState.player.active) {
        // Play as active Pokémon
        const newState = playCard(gameState, selectedCard, zone)
        setGameState(newState)
        setSelectedCard(null)
      } else if (zone === Zone.BENCH && gameState.player.bench.length < 5) {
        // Play to bench
        const newState = playCard(gameState, selectedCard, zone)
        setGameState(newState)
        setSelectedCard(null)
      }
    } else if (card.type === CardType.ENERGY) {
      if (
        (zone === Zone.ACTIVE && gameState.player.active) ||
        (zone === Zone.BENCH && gameState.player.bench.length > 0)
      ) {
        // Attach energy
        const newState = attachEnergy(gameState, selectedCard, zone, selectedZone?.index || 0)
        setGameState(newState)
        setSelectedCard(null)
        setSelectedZone(null)
      }
    } else if (card.type === CardType.TRAINER) {
      // Play trainer card
      const newState = playCard(gameState, selectedCard, zone)
      setGameState(newState)
      setSelectedCard(null)
    }
  }

  // Handle attack
  const handleAttack = useCallback(
    (attackIndex: number) => {
      if (!gameState || !gameState.player.active) return

      const newState = useAttack(gameState, attackIndex)
      setGameState(newState)
      setShowAttackDialog(false)
      setAttackIndex(null)

      // Check if attack ends turn
      if (newState.currentTurn === "opponent") {
        setShowTurnDialog(true)

        // Simulate opponent turn after a delay
        setTimeout(() => {
          const afterOpponentTurn = endTurn(newState)
          setGameState(afterOpponentTurn)
          setShowTurnDialog(false)
        }, 2000)
      }
    },
    [gameState],
  )

  // Handle end turn
  const handleEndTurn = () => {
    if (!gameState) return

    setShowTurnDialog(true)

    // End player's turn and start opponent's turn
    const newState = endTurn(gameState)
    setGameState(newState)

    // Simulate opponent turn after a delay
    setTimeout(() => {
      const afterOpponentTurn = endTurn(newState)
      setGameState(afterOpponentTurn)
      setShowTurnDialog(false)
    }, 2000)
  }

  // Handle draw card
  const handleDrawCard = () => {
    if (!gameState) return

    const newState = drawCard(gameState)
    setGameState(newState)
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white text-blue-900 p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">Choose Your Deck</h1>

          <div className="grid grid-cols-1 gap-4 mb-6">
            <Button
              className={cn(
                "h-20 text-lg",
                selectedDeck === "starter"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800",
              )}
              onClick={() => setSelectedDeck("starter")}
            >
              Pikachu & Friends
              <span className="text-xs block mt-1">Starter Deck</span>
            </Button>

            <Button
              className={cn(
                "h-20 text-lg",
                selectedDeck === "water"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800",
              )}
              onClick={() => setSelectedDeck("water")}
            >
              Blastoise Tsunami
              <span className="text-xs block mt-1">Water Deck</span>
            </Button>

            <Button
              className={cn(
                "h-20 text-lg",
                selectedDeck === "fire"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800",
              )}
              onClick={() => setSelectedDeck("fire")}
            >
              Charizard Inferno
              <span className="text-xs block mt-1">Fire Deck</span>
            </Button>
          </div>

          <div className="flex justify-between">
            <Link href="/">
              <Button variant="outline">Back</Button>
            </Link>
            <Button onClick={() => setGameStarted(true)}>Start Game</Button>
          </div>
        </Card>
      </div>
    )
  }

  if (!gameState) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Loading game...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-900 text-white overflow-hidden">
      {/* Game Header */}
      <div className="bg-gray-900 p-2 flex justify-between items-center">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-white">
            <Home className="h-5 w-5" />
          </Button>
        </Link>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold">Turn: {gameState.turn}</span>
          <span className="px-2 py-1 rounded bg-blue-600 text-xs font-bold">
            {gameState.currentTurn === "player" ? "Your Turn" : "Opponent's Turn"}
          </span>
        </div>

        <div className="flex space-x-1">
          <Button variant="ghost" size="sm" className="text-white">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white">
            <Info className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Game Board */}
      <div className="container mx-auto px-2 py-4 flex flex-col h-[calc(100vh-48px)]">
        {/* Opponent's side */}
        <div className="mb-4">
          <GameBoard
            player="opponent"
            gameState={gameState}
            onZoneSelect={() => {}}
            selectedZone={null}
            isMobile={isMobile}
          />
        </div>

        {/* Middle area - Prize cards */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <div className="bg-blue-900/50 rounded p-2">
              <div className="text-xs text-center mb-1">Your Prizes</div>
              <div className="flex space-x-1">
                {Array.from({ length: gameState.player.prizeCards.length }).map((_, i) => (
                  <div key={i} className="w-8 h-12 bg-red-500 rounded-sm border border-yellow-500"></div>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <div className="bg-blue-900/50 rounded p-2 text-center">
                <div className="text-xs mb-1">Deck</div>
                <div className="w-8 h-12 bg-red-500 rounded-sm border border-yellow-500 relative">
                  <div className="absolute bottom-0 right-0 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {gameState.player.deck.length}
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/50 rounded p-2 text-center">
                <div className="text-xs mb-1">Discard</div>
                <div className="w-8 h-12 bg-gray-300 rounded-sm border border-gray-400 flex items-center justify-center">
                  <Disc className="h-6 w-6 text-gray-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-900"
              onClick={handleDrawCard}
              disabled={gameState.currentTurn !== "player"}
            >
              Draw Card
            </Button>

            <Button
              size="sm"
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
              onClick={() => setShowAttackDialog(true)}
              disabled={gameState.currentTurn !== "player" || !gameState.player.active}
            >
              Attack
            </Button>

            <Button
              size="sm"
              variant="destructive"
              onClick={handleEndTurn}
              disabled={gameState.currentTurn !== "player"}
            >
              End Turn
            </Button>
          </div>
        </div>

        {/* Player's side */}
        <div className="mb-4">
          <GameBoard
            player="player"
            gameState={gameState}
            onZoneSelect={handleZoneSelect}
            selectedZone={selectedZone}
            isMobile={isMobile}
          />
        </div>

        {/* Player's hand */}
        <div className="mt-auto">
          <Hand
            cards={gameState.player.hand}
            onCardSelect={handleCardSelect}
            selectedCard={selectedCard}
            isMobile={isMobile}
          />
        </div>
      </div>

      {/* Attack Dialog */}
      <Dialog open={showAttackDialog} onOpenChange={setShowAttackDialog}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Choose Attack</DialogTitle>
            <DialogDescription className="text-gray-400">
              Select an attack to use against your opponent
            </DialogDescription>
          </DialogHeader>

          {gameState.player.active && (
            <div className="space-y-4 mt-4">
              {gameState.player.active.attacks.map((attack, index) => (
                <Button key={index} className="w-full justify-between h-auto py-3" onClick={() => handleAttack(index)}>
                  <span>{attack.name}</span>
                  <span className="bg-red-500 px-2 py-1 rounded text-xs">{attack.damage} DMG</span>
                </Button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Turn Change Dialog */}
      <Dialog open={showTurnDialog} onOpenChange={setShowTurnDialog}>
        <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-sm">
          <div className="text-center py-6">
            <h2 className="text-2xl font-bold mb-2">
              {gameState.currentTurn === "player" ? "Your Turn" : "Opponent's Turn"}
            </h2>
            <div className="animate-pulse">
              <div className="w-16 h-16 rounded-full bg-blue-500 mx-auto flex items-center justify-center">
                {gameState.currentTurn === "player" ? (
                  <span className="text-2xl">👤</span>
                ) : (
                  <span className="text-2xl">🤖</span>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
