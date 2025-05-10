"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, ArrowLeft, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { openBoosterPack } from "@/lib/card-utils"

type BoosterSet = {
  id: string
  name: string
  image: string
  description: string
  color: string
}

export default function OpenPacksPage() {
  const [selectedSet, setSelectedSet] = useState<string | null>(null)
  const [openingState, setOpeningState] = useState<"initial" | "opening" | "revealed">("initial")
  const [cards, setCards] = useState<any[]>([])
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null)

  const boosterSets: BoosterSet[] = [
    {
      id: "base",
      name: "Base Set",
      image: "/placeholder.svg?height=200&width=150&text=Base+Set",
      color: "from-red-500 to-red-700",
    },
  ]

  const handleSelectSet = (setId: string) => {
    setSelectedSet(setId)
  }

  const startOpeningPack = () => {
    setOpeningState("opening")

    // Simulate pack opening animation timing
    setTimeout(() => {
      if (selectedSet) {
        const newCards = openBoosterPack(selectedSet)
        setCards(newCards)
        setOpeningState("revealed")
      }
    }, 2000)
  }

  const handleCardClick = (index: number) => {
    if (openingState === "revealed") {
      setSelectedCardIndex(index)
    }
  }

  const closeCardDetail = () => {
    setSelectedCardIndex(null)
  }

  const resetPackOpening = () => {
    setSelectedSet(null)
    setOpeningState("initial")
    setCards([])
    setSelectedCardIndex(null)
  }

  if (!selectedSet) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <header className="mb-8 flex justify-between items-center">
            <Link href="/">
              <Button variant="ghost" className="text-white">
                <Home className="mr-2 h-5 w-5" />
                Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-center text-yellow-300 drop-shadow-lg">Booster Packs</h1>
            <div className="w-24"></div> {/* Spacer for alignment */}
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boosterSets.map((set) => (
              <Card
                key={set.id}
                className={cn(
                  "bg-gradient-to-br border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer",
                  set.color,
                )}
                onClick={() => handleSelectSet(set.id)}
              >
                <CardContent className="p-6 text-center">
                  <h2 className="text-2xl font-bold mb-4 text-white">{set.name}</h2>
                  <div className="mb-4 relative">
                    <img
                      src={set.image || "/placeholder.svg"}
                      alt={set.name}
                      className="mx-auto rounded-lg shadow-lg transform hover:rotate-3 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 rounded-full px-2 py-1 text-xs font-bold">
                      10 Cards
                    </div>
                  </div>
                  <p className="mb-4 text-white/90">{set.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const selectedSetData = boosterSets.find((set) => set.id === selectedSet)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-8 flex justify-between items-center">
          <Button variant="ghost" className="text-white" onClick={resetPackOpening}>
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Sets
          </Button>
          <h1 className="text-3xl font-bold text-center text-yellow-300 drop-shadow-lg">
            {selectedSetData?.name} Pack
          </h1>
          <div className="w-24"></div> {/* Spacer for alignment */}
        </header>

        <div className="flex flex-col items-center justify-center">
          {openingState === "initial" && (
            <div className="text-center">
              <div className="mb-8 relative inline-block">
                <motion.img
                  src={selectedSetData?.image || ""}
                  alt={`${selectedSetData?.name} Pack`}
                  className="rounded-lg shadow-xl"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: 1,
                    rotateY: [0, 10, 0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
                <motion.div
                  className="absolute -top-4 -right-4"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Sparkles className="h-12 w-12 text-yellow-300" />
                </motion.div>
              </div>
              <Button
                onClick={startOpeningPack}
                className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold text-xl px-8 py-6"
                size="lg"
              >
                Open Pack
              </Button>
            </div>
          )}

          {openingState === "opening" && (
            <div className="text-center">
              <motion.div
                initial={{ scale: 1, rotateY: 0 }}
                animate={{
                  scale: [1, 1.2, 0.8],
                  rotateY: [0, 180, 360],
                  opacity: [1, 0.8, 0],
                }}
                transition={{ duration: 2 }}
                className="mb-8"
              >
                <img
                  src={selectedSetData?.image || ""}
                  alt={`${selectedSetData?.name} Pack Opening`}
                  className="rounded-lg shadow-xl"
                />
              </motion.div>
              <p className="text-2xl font-bold text-yellow-300 animate-pulse">Opening your pack...</p>
            </div>
          )}

          {openingState === "revealed" && (
            <div className="w-full">
              <AnimatePresence>
                {selectedCardIndex !== null && cards[selectedCardIndex] && (
                  <motion.div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="relative max-w-md w-full"
                      initial={{ scale: 0.8, y: 50 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.8, y: 50 }}
                    >
                      <Button variant="ghost" className="absolute -top-12 left-0 text-white" onClick={closeCardDetail}>
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Back to cards
                      </Button>

                      <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl p-6 shadow-2xl">
                        <div className="rounded-lg overflow-hidden mb-4 mx-auto w-64 h-80 relative">
                          <img
                            src={`/placeholder.svg?height=320&width=256&text=${cards[selectedCardIndex].name}`}
                            alt={cards[selectedCardIndex].name}
                            className="w-full h-full object-cover"
                          />
                          {cards[selectedCardIndex].rarity === "Rare Holo" && (
                            <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/20 to-transparent pointer-events-none" />
                          )}
                        </div>

                        <h3 className="text-xl font-bold mb-2 text-white">{cards[selectedCardIndex].name}</h3>

                        <div className="flex justify-between mb-4">
                          <span className="px-2 py-1 rounded bg-blue-500 text-white text-xs font-bold">
                            {cards[selectedCardIndex].rarity}
                          </span>
                          <span className="px-2 py-1 rounded bg-red-500 text-white text-xs font-bold">
                            HP: {cards[selectedCardIndex].hp}
                          </span>
                        </div>

                        {cards[selectedCardIndex].type === "Pokémon" && (
                          <>
                            <div className="mb-4">
                              <h4 className="text-sm font-bold text-gray-400 mb-1">Attacks</h4>
                              {cards[selectedCardIndex].attacks.map((attack: any, i: number) => (
                                <div key={i} className="bg-slate-700 p-2 rounded mb-2">
                                  <div className="flex justify-between">
                                    <span className="font-bold">{attack.name}</span>
                                    <span className="text-red-400">{attack.damage} damage</span>
                                  </div>
                                  <p className="text-xs text-gray-300 mt-1">{attack.description}</p>
                                </div>
                              ))}
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-center">
                              <div className="bg-slate-700 p-2 rounded">
                                <div className="text-xs text-gray-400">Type</div>
                                <div className="font-bold text-white">{cards[selectedCardIndex].pokemonType}</div>
                              </div>
                              <div className="bg-slate-700 p-2 rounded">
                                <div className="text-xs text-gray-400">Weakness</div>
                                <div className="font-bold text-white">
                                  {cards[selectedCardIndex].weakness || "None"}
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {cards[selectedCardIndex].type === "Trainer" && (
                          <div className="bg-slate-700 p-3 rounded">
                            <p className="text-gray-300">{cards[selectedCardIndex].description}</p>
                          </div>
                        )}

                        {cards[selectedCardIndex].type === "Energy" && (
                          <div className="bg-slate-700 p-3 rounded text-center">
                            <p className="text-gray-300">Basic {cards[selectedCardIndex].energyType} Energy</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-6 text-yellow-300">Your new cards!</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {cards.map((card, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, rotateY: 180, y: 20 }}
                      animate={{ opacity: 1, rotateY: 0, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.2,
                        type: "spring",
                      }}
                      whileHover={{
                        y: -10,
                        transition: { duration: 0.2 },
                      }}
                      onClick={() => handleCardClick(index)}
                      className="cursor-pointer"
                    >
                      <Card
                        className={cn(
                          "h-60 relative overflow-hidden",
                          card.type === "REWARDS" && "bg-gradient-to-b from-yellow-100 to-yellow-300",
                          card.type === "GOOD" && "bg-gradient-to-b from-purple-100 to-purple-300",
                          card.type === "EPIC" && "bg-gradient-to-b from-gray-100 to-gray-300",
                          card.rarity === "Rare Holo" && "ring-2 ring-yellow-500",
                        )}
                      >
                        <div className="p-2 h-full flex flex-col">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold">{card.name}</span>
                            {card.type === "REWARDS" && <span className="text-xs font-bold">HP {card.hp}</span>}
                          </div>

                          <div className="bg-white rounded-sm flex-grow mb-2 relative">
                            <img
                              src={`/placeholder.svg?height=120&width=100&text=${card.name}`}
                              alt={card.name}
                              className="w-full h-full object-cover"
                            />
                            {card.rarity === "Rare Holo" && (
                              <div className="absolute top-1 right-1">
                                <Sparkles className="h-4 w-4 text-yellow-500" />
                              </div>
                            )}
                          </div>

                          <div className="flex justify-between text-xs text-gray-700">
                            <span>{card.type}</span>
                            <span>{card.rarity}</span>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-900"
                  onClick={resetPackOpening}
                >
                  Choose Another Pack
                </Button>
                <Button
                  className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold"
                  onClick={startOpeningPack}
                >
                  Open Another {selectedSetData?.name} Pack
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
