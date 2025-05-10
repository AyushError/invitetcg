import { PokemonCard, EnergyCard, TrainerCard } from "@/components/pokemon-card"
import { cn } from "@/lib/utils"
import { CardType } from "@/lib/types"

interface HandProps {
  cards: any[]
  onCardSelect: (index: number) => void
  selectedCard: number | null
  isMobile: boolean
}

export function Hand({ cards, onCardSelect, selectedCard, isMobile }: HandProps) {
  // Render a card based on its type
  const renderCard = (card: any, index: number) => {
    const isSelected = selectedCard === index
    const cardSize = isMobile ? "sm" : "md"

    const handleClick = () => {
      onCardSelect(index)
    }

    const cardProps = {
      card,
      size: cardSize,
      onClick: handleClick,
      className: cn("transition-all duration-200", isSelected && "transform -translate-y-4 ring-2 ring-yellow-400"),
    }

    switch (card.type) {
      case CardType.POKEMON:
        return <PokemonCard {...cardProps} />
      case CardType.ENERGY:
        return <EnergyCard {...cardProps} />
      case CardType.TRAINER:
        return <TrainerCard {...cardProps} />
      default:
        return null
    }
  }

  return (
    <div className="bg-gray-900/80 rounded-lg p-4 border border-gray-800">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-bold">Your Hand ({cards.length})</h3>
        <span className="text-xs text-gray-400">
          {selectedCard !== null ? "Selected card: " + cards[selectedCard]?.name : "Select a card to play"}
        </span>
      </div>

      <div className="flex justify-center">
        <div className={cn("flex space-x-1 overflow-x-auto pb-2", isMobile ? "max-w-full" : "max-w-3xl")}>
          {cards.map((card, index) => (
            <div key={index} className="transform hover:-translate-y-2 transition-transform duration-200">
              {renderCard(card, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
