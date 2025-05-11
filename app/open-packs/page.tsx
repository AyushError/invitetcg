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
  description?: string
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
      name: "Invite Deck",
      image: "/PACK.png",
      color: "from-red-500 to-yellow-600",
    },
  ]

  const handleSelectSet = (setId: string) => {
    setSelectedSet(setId)
  }

  const startOpeningPack = () => {
    setOpeningState("opening")
    setTimeout(() => {
      const newCards = openBoosterPack()
      setCards(newCards)
      setOpeningState("revealed")
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

  const selectedSetData = boosterSets.find((set) => set.id === selectedSet)

  if (!selectedSet) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <header className="mb-8 flex justify-between items-center">
            <Link href="/">
              <Button variant="ghost" className="text-white">
                <Home className="mr-2 h-5 w-5" />
                Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-center text-yellow-300 drop-shadow-lg">Open Your Invite Pack</h1>
            <div className="w-24" />
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boosterSets.map((set) => (
              <Card
                key={set.id}
                className={cn("bg-gradient-to-br border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer", set.color)}
                onClick={() => handleSelectSet(set.id)}
              >
                <CardContent className="p-6 text-center">
                  <h2 className="text-2xl font-bold mb-4 text-white">{set.name}</h2>
                  <div className="mb-4 relative">
                    <img
                      src={set.image}
                      alt={set.name}
                      className="mx-auto rounded-lg shadow-lg transform hover:rotate-3 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 rounded-full px-2 py-1 text-xs font-bold">Invite Only</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-8 flex justify-between items-center">
          <Button variant="ghost" className="text-white" onClick={resetPackOpening}>
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-center text-yellow-300 drop-shadow-lg">
            {selectedSetData?.name}
          </h1>
          <div className="w-24" />
        </header>

        <div className="flex flex-col items-center justify-center">
          {openingState === "initial" && (
            <div className="text-center">
              <motion.img
                src={selectedSetData?.image}
                alt="Pack"
                className="rounded-lg shadow-xl mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: [0, -10, 0], opacity: 1 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              />
              <Button
                onClick={startOpeningPack}
                className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold text-xl px-8 py-6"
              >
                Open Invite Pack
              </Button>
            </div>
          )}

          {openingState === "opening" && (
            <div className="text-center">
              <motion.div
                className="mb-8"
                initial={{ scale: 1, rotateY: 0 }}
                animate={{ scale: [1, 1.2, 0.8], rotateY: [0, 180, 360], opacity: [1, 0.8, 0] }}
                transition={{ duration: 2 }}
              >
                <img src={selectedSetData?.image} alt="Opening" className="rounded-lg shadow-xl" />
              </motion.div>
              <p className="text-2xl font-bold text-yellow-300 animate-pulse">Opening your Invite Pack...</p>
            </div>
          )}

          {openingState === "revealed" && (
            <div className="w-full text-center">
              <h2 className="text-2xl font-bold mb-6 text-yellow-300">Your Invite Cards</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {cards.map((card, index) => (
                  <motion.div
                    key={index}
                    onClick={() => handleCardClick(index)}
                    className="cursor-pointer"
                    initial={{ opacity: 0, rotateY: 180, y: 20 }}
                    animate={{ opacity: 1, rotateY: 0, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    whileHover={{ y: -10 }}
                  >
                    <Card className="bg-gradient-to-t from-slate-900 to-slate-800 p-3 h-64 shadow-xl border border-yellow-300">
                      <div className="text-white font-bold mb-1">{card.name}</div>
                      <div className="bg-white rounded h-40 overflow-hidden mb-2">
                        <img
                          src={`/placeholder.svg?text=${card.name}`}
                          alt={card.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-xs text-yellow-400">{card.rarity}</div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex justify-center gap-4">
                <Button variant="outline" onClick={resetPackOpening}>
                  Choose Again
                </Button>
                <Button className="bg-yellow-400 text-blue-900 font-bold" onClick={startOpeningPack}>
                  Open Another Pack
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

  
