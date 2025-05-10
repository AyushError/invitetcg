"use client"
import { PokemonCard, EnergyCard, TrainerCard } from "@/components/pokemon-card"
import { cn } from "@/lib/utils"
import { type GameState, CardType, Zone } from "@/lib/types"

interface GameBoardProps {
  player: "player" | "opponent"
  gameState: GameState
  onZoneSelect: (zone: Zone) => void
  selectedZone: Zone | null
  isMobile: boolean
}

export function GameBoard({ player, gameState, onZoneSelect, selectedZone, isMobile }: GameBoardProps) {
  const isPlayer = player === "player"
  const playerState = isPlayer ? gameState.player : gameState.opponent
  const isPlayerTurn = gameState.currentTurn === "player"
  const canInteract = isPlayer && isPlayerTurn

  // Handle selecting the active Pokémon zone
  const handleActiveZoneClick = () => {
    if (!canInteract) return
    onZoneSelect({ type: Zone.ACTIVE })
  }

  // Handle selecting a bench Pokémon zone
  const handleBenchZoneClick = (index: number) => {
    if (!canInteract) return
    onZoneSelect({ type: Zone.BENCH, index })
  }

  // Render a card based on its type
  const renderCard = (card: any, size: "sm" | "md" | "lg" = "md") => {
    if (!card) return null

    switch (card.type) {
      case CardType.POKEMON:
        return <PokemonCard card={card} size={size} />
      case CardType.ENERGY:
        return <EnergyCard card={card} size={size} />
      case CardType.TRAINER:
        return <TrainerCard card={card} size={size} />
      default:
        return null
    }
  }

  // Render attached energy cards
  const renderAttachedEnergy = (energyCards: any[], position: "top" | "bottom" | "left" | "right" = "bottom") => {
    if (!energyCards || energyCards.length === 0) return null

    const positionClasses = {
      top: "absolute -top-2 left-1/2 transform -translate-x-1/2 flex space-x-1",
      bottom: "absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1",
      left: "absolute top-1/2 -left-2 transform -translate-y-1/2 flex flex-col space-y-1",
      right: "absolute top-1/2 -right-2 transform -translate-y-1/2 flex flex-col space-y-1",
    }

    return (
      <div className={positionClasses[position]}>
        {energyCards.map((energy, i) => (
          <div key={i} className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
            {energy.energyType.charAt(0)}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn("relative", isPlayer ? "mb-4" : "mb-8")}>
      {/* Player/Opponent Label */}
      <div className="absolute -top-6 left-0 text-sm font-bold">{isPlayer ? "Your Board" : "Opponent's Board"}</div>

      <div className="bg-green-900/50 rounded-lg p-4 border border-green-800">
        <div className="flex flex-col items-center">
          {/* Active Pokémon Zone */}
          <div
            className={cn(
              "w-32 h-48 border-2 border-dashed rounded-lg flex items-center justify-center mb-4",
              !playerState.active && "bg-gray-800/30",
              playerState.active && "border-solid border-green-500",
              canInteract && "cursor-pointer hover:bg-green-800/30",
              selectedZone?.type === Zone.ACTIVE && "ring-2 ring-yellow-400",
            )}
            onClick={handleActiveZoneClick}
          >
            {playerState.active ? (
              <div className="relative">
                {renderCard(playerState.active, "lg")}
                {renderAttachedEnergy(playerState.active.attachedEnergy)}

                {/* HP indicator */}
                <div className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {playerState.active.hp}
                </div>
              </div>
            ) : (
              <span className="text-gray-400 text-sm">Active</span>
            )}
          </div>

          {/* Bench Zone */}
          <div className="flex space-x-2 overflow-x-auto pb-2 w-full justify-center">
            {Array.from({ length: 5 }).map((_, index) => {
              const benchPokemon = playerState.bench[index]

              return (
                <div
                  key={index}
                  className={cn(
                    "w-24 h-36 border-2 border-dashed rounded-lg flex items-center justify-center",
                    !benchPokemon && "bg-gray-800/30",
                    benchPokemon && "border-solid border-blue-500",
                    canInteract && "cursor-pointer hover:bg-blue-800/30",
                    selectedZone?.type === Zone.BENCH && selectedZone.index === index && "ring-2 ring-yellow-400",
                  )}
                  onClick={() => handleBenchZoneClick(index)}
                >
                  {benchPokemon ? (
                    <div className="relative">
                      {renderCard(benchPokemon, "md")}
                      {renderAttachedEnergy(benchPokemon.attachedEnergy)}

                      {/* HP indicator */}
                      <div className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {benchPokemon.hp}
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs">Bench {index + 1}</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
