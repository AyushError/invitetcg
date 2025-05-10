"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Home, Search, Filter, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { getCollection } from "@/lib/card-utils"

export default function CollectionPage() {
  const [collection, setCollection] = useState<any[]>([])
  const [filteredCards, setFilteredCards] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentTab, setCurrentTab] = useState("all")
  const [selectedCard, setSelectedCard] = useState<any | null>(null)
  const [showCardDialog, setShowCardDialog] = useState(false)

  useEffect(() => {
    // Get the user's collection
    const userCollection = getCollection()
    setCollection(userCollection)
    setFilteredCards(userCollection)
  }, [])

  useEffect(() => {
    let filtered = collection

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (card) =>
          card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (card.type === "Pokémon" && card.pokemonType?.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by tab/type
    if (currentTab === "pokemon") {
      filtered = filtered.filter((card) => card.type === "Pokémon")
    } else if (currentTab === "trainer") {
      filtered = filtered.filter((card) => card.type === "Trainer")
    } else if (currentTab === "energy") {
      filtered = filtered.filter((card) => card.type === "Energy")
    }

    setFilteredCards(filtered)
  }, [searchTerm, currentTab, collection])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleTabChange = (value: string) => {
    setCurrentTab(value)
  }

  const handleCardClick = (card: any) => {
    setSelectedCard(card)
    setShowCardDialog(true)
  }

  const getTypeCount = (type: string) => {
    return collection.filter((card) => card.type === type).length
  }

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
          <h1 className="text-3xl font-bold text-center text-yellow-300 drop-shadow-lg">Your Collection</h1>
          <div className="w-24"></div> {/* Spacer for alignment */}
        </header>

        <div className="mb-8">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search cards..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <Button variant="outline" className="border-gray-700 text-white">
              <Filter className="mr-2 h-4 w-4" />
              Sort
            </Button>
          </div>

          <Tabs defaultValue="all" onValueChange={handleTabChange}>
            <TabsList className="bg-gray-800 border border-gray-700">
              <TabsTrigger value="all" className="data-[state=active]:bg-gray-700">
                All ({collection.length})
              </TabsTrigger>
              <TabsTrigger value="pokemon" className="data-[state=active]:bg-gray-700">
                Pokémon ({getTypeCount("Pokémon")})
              </TabsTrigger>
              <TabsTrigger value="trainer" className="data-[state=active]:bg-gray-700">
                Trainer ({getTypeCount("Trainer")})
              </TabsTrigger>
              <TabsTrigger value="energy" className="data-[state=active]:bg-gray-700">
                Energy ({getTypeCount("Energy")})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              {filteredCards.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <p className="text-xl mb-4">No cards found</p>
                  <Link href="/open-packs">
                    <Button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900">Open Some Packs</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {filteredCards.map((card, index) => (
                    <Card
                      key={index}
                      className={cn(
                        "h-64 relative overflow-hidden hover:-translate-y-1 transition-transform duration-200 cursor-pointer",
                        card.type === "Pokémon" && "bg-gradient-to-b from-yellow-100 to-yellow-300",
                        card.type === "Trainer" && "bg-gradient-to-b from-purple-100 to-purple-300",
                        card.type === "Energy" && "bg-gradient-to-b from-gray-100 to-gray-300",
                        card.rarity === "Rare Holo" && "ring-2 ring-yellow-500",
                      )}
                      onClick={() => handleCardClick(card)}
                    >
                      <div className="p-2 h-full flex flex-col">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-gray-800 truncate max-w-[80%]">{card.name}</span>
                          {card.type === "Pokémon" && (
                            <span className="text-xs font-bold text-gray-800">HP {card.hp}</span>
                          )}
                        </div>

                        <div className="bg-white rounded-sm flex-grow mb-2 relative">
                          <img
                            src={`/placeholder.svg?height=140&width=120&text=${card.name}`}
                            alt={card.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex justify-between text-xs text-gray-700">
                          <span>{card.type}</span>
                          {card.type === "Pokémon" && <span>{card.pokemonType}</span>}
                          {card.type === "Energy" && <span>{card.energyType}</span>}
                          {card.type === "Trainer" && <span>{card.subtype}</span>}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {["pokemon", "trainer", "energy"].map((tabValue) => (
              <TabsContent key={tabValue} value={tabValue} className="mt-6">
                {filteredCards.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <p className="text-xl mb-4">No {tabValue} cards found</p>
                    <Link href="/open-packs">
                      <Button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900">Open Some Packs</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {filteredCards.map((card, index) => (
                      <Card
                        key={index}
                        className={cn(
                          "h-64 relative overflow-hidden hover:-translate-y-1 transition-transform duration-200 cursor-pointer",
                          card.type === "Pokémon" && "bg-gradient-to-b from-yellow-100 to-yellow-300",
                          card.type === "Trainer" && "bg-gradient-to-b from-purple-100 to-purple-300",
                          card.type === "Energy" && "bg-gradient-to-b from-gray-100 to-gray-300",
                          card.rarity === "Rare Holo" && "ring-2 ring-yellow-500",
                        )}
                        onClick={() => handleCardClick(card)}
                      >
                        <div className="p-2 h-full flex flex-col">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-gray-800 truncate max-w-[80%]">{card.name}</span>
                            {card.type === "Pokémon" && (
                              <span className="text-xs font-bold text-gray-800">HP {card.hp}</span>
                            )}
                          </div>

                          <div className="bg-white rounded-sm flex-grow mb-2 relative">
                            <img
                              src={`/placeholder.svg?height=140&width=120&text=${card.name}`}
                              alt={card.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex justify-between text-xs text-gray-700">
                            <span>{card.type}</span>
                            {card.type === "Pokémon" && <span>{card.pokemonType}</span>}
                            {card.type === "Energy" && <span>{card.energyType}</span>}
                            {card.type === "Trainer" && <span>{card.subtype}</span>}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="text-center">
          <Link href="/open-packs">
            <Button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold">Open More Packs</Button>
          </Link>
        </div>
      </div>

      {/* Card Detail Dialog */}
      <Dialog open={showCardDialog} onOpenChange={setShowCardDialog}>
        <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-md">
          {selectedCard && (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 text-gray-400 hover:text-white"
                onClick={() => setShowCardDialog(false)}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-64 h-80 rounded-lg overflow-hidden mb-4",
                    selectedCard.type === "Pokémon" && "bg-gradient-to-b from-yellow-100 to-yellow-300",
                    selectedCard.type === "Trainer" && "bg-gradient-to-b from-purple-100 to-purple-300",
                    selectedCard.type === "Energy" && "bg-gradient-to-b from-gray-100 to-gray-300",
                    selectedCard.rarity === "Rare Holo" && "ring-2 ring-yellow-500",
                  )}
                >
                  <div className="p-2 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-bold text-gray-800">{selectedCard.name}</span>
                      {selectedCard.type === "Pokémon" && (
                        <span className="text-sm font-bold text-gray-800">HP {selectedCard.hp}</span>
                      )}
                    </div>

                    <div className="bg-white rounded-sm flex-grow mb-2">
                      <img
                        src={`/placeholder.svg?height=200&width=180&text=${selectedCard.name}`}
                        alt={selectedCard.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {selectedCard.type === "Pokémon" && (
                      <div className="space-y-1">
                        <div className="text-xs text-gray-700 bg-gray-200 p-1 rounded">
                          <span className="font-bold">Type:</span> {selectedCard.pokemonType}
                        </div>
                        {selectedCard.attacks &&
                          selectedCard.attacks.map((attack: any, i: number) => (
                            <div key={i} className="text-xs text-gray-700 bg-gray-200 p-1 rounded">
                              <span className="font-bold">{attack.name}:</span> {attack.damage} damage
                              {attack.description && <div className="text-xs">{attack.description}</div>}
                            </div>
                          ))}
                      </div>
                    )}

                    {selectedCard.type === "Trainer" && (
                      <div className="text-xs text-gray-700 bg-gray-200 p-1 rounded">
                        <span className="font-bold">{selectedCard.subtype}</span>
                        <div>{selectedCard.description}</div>
                      </div>
                    )}

                    {selectedCard.type === "Energy" && (
                      <div className="text-xs text-gray-700 bg-gray-200 p-1 rounded text-center">
                        <span className="font-bold">{selectedCard.energyType} Energy</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Card Type:</span>
                    <span>{selectedCard.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Rarity:</span>
                    <span>{selectedCard.rarity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Set:</span>
                    <span>{selectedCard.set || "Unknown"}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
