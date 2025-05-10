"use client"

import { cn } from "@/lib/utils"

interface PokemonCardProps {
  card: any
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  className?: string
}

export function PokemonCard({ card, size = "md", onClick, className }: PokemonCardProps) {
  const sizeClasses = {
    sm: "w-16 h-24",
    md: "w-24 h-36",
    lg: "w-32 h-48",
  }

  return (
    <div
      className={cn(
        "relative rounded overflow-hidden cursor-pointer transition-transform hover:-translate-y-1",
        sizeClasses[size],
        className,
      )}
      onClick={onClick}
    >
      <div className="bg-yellow-100 h-full w-full p-1 flex flex-col">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-bold text-gray-800 truncate max-w-[70%]">{card.name}</span>
          <span className="text-xs font-bold text-gray-800">HP {card.hp}</span>
        </div>

        <div className="bg-white rounded-sm flex-grow mb-1">
          <img
            src={`/placeholder.svg?height=100&width=80&text=${card.name}`}
            alt={card.name}
            className="w-full h-full object-cover"
          />
        </div>

        {size !== "sm" && (
          <div className="flex justify-between text-xs text-gray-700">
            <span>{card.pokemonType}</span>
            <span>{card.stage || "Basic"}</span>
          </div>
        )}
      </div>
    </div>
  )
}

interface EnergyCardProps {
  card: any
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  className?: string
}

export function EnergyCard({ card, size = "md", onClick, className }: EnergyCardProps) {
  const sizeClasses = {
    sm: "w-16 h-24",
    md: "w-24 h-36",
    lg: "w-32 h-48",
  }

  const energyColors: Record<string, string> = {
    Fire: "bg-red-100",
    Water: "bg-blue-100",
    Grass: "bg-green-100",
    Lightning: "bg-yellow-100",
    Psychic: "bg-purple-100",
    Fighting: "bg-amber-100",
    Darkness: "bg-gray-700",
    Metal: "bg-gray-300",
    Fairy: "bg-pink-100",
    Dragon: "bg-orange-100",
    Colorless: "bg-gray-100",
  }

  const bgColor = energyColors[card.energyType] || "bg-gray-100"

  return (
    <div
      className={cn(
        "relative rounded overflow-hidden cursor-pointer transition-transform hover:-translate-y-1",
        sizeClasses[size],
        className,
      )}
      onClick={onClick}
    >
      <div className={cn("h-full w-full p-1 flex flex-col", bgColor)}>
        <div className="text-center font-bold text-xs text-gray-800 mb-1">{card.energyType}</div>

        <div className="bg-white rounded-sm flex-grow flex items-center justify-center">
          <div
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center",
              card.energyType === "Fire" && "bg-red-500",
              card.energyType === "Water" && "bg-blue-500",
              card.energyType === "Grass" && "bg-green-500",
              card.energyType === "Lightning" && "bg-yellow-500",
              card.energyType === "Psychic" && "bg-purple-500",
              card.energyType === "Fighting" && "bg-amber-500",
              card.energyType === "Darkness" && "bg-gray-800",
              card.energyType === "Metal" && "bg-gray-400",
              card.energyType === "Fairy" && "bg-pink-500",
              card.energyType === "Dragon" && "bg-orange-500",
              card.energyType === "Colorless" && "bg-gray-300",
            )}
          >
            <span className="text-white font-bold text-xs">E</span>
          </div>
        </div>

        {size !== "sm" && <div className="text-center text-xs text-gray-700 mt-1">Energy</div>}
      </div>
    </div>
  )
}

interface TrainerCardProps {
  card: any
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  className?: string
}

export function TrainerCard({ card, size = "md", onClick, className }: TrainerCardProps) {
  const sizeClasses = {
    sm: "w-16 h-24",
    md: "w-24 h-36",
    lg: "w-32 h-48",
  }

  return (
    <div
      className={cn(
        "relative rounded overflow-hidden cursor-pointer transition-transform hover:-translate-y-1",
        sizeClasses[size],
        className,
      )}
      onClick={onClick}
    >
      <div className="bg-purple-100 h-full w-full p-1 flex flex-col">
        <div className="text-xs font-bold text-gray-800 truncate mb-1">{card.name}</div>

        <div className="bg-white rounded-sm flex-grow mb-1">
          <img
            src={`/placeholder.svg?height=100&width=80&text=${card.name}`}
            alt={card.name}
            className="w-full h-full object-cover"
          />
        </div>

        {size !== "sm" && <div className="text-center text-xs text-gray-700">{card.subtype || "Trainer"}</div>}
      </div>
    </div>
  )
}
