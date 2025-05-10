"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Home, Search, Filter, Save, Plus, Trash2, Edit, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { getCollection, saveDeck, getDecks, deleteDeck } from "@/lib/card-utils"

export default function DeckBuilderPage() {
  const [collection, setCollection] = useState<any[]>([])
  const [filteredCards, setFilteredCards] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentTab, setCurrentTab] = useState("all")
  const [currentDeck, setCurrentDeck] = useState<any[]>([])
  const [deckName, setDeckName] = useState("New Deck")
  const [savedDecks, setSavedDecks] = useState<any[]>([])
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [showLoadDialog, setShowLoadDialog] = useState(false)
  const [editingDeckName, setEditingDeckName] = useState(false)

  useEffect(() => {
    // Get the user's collection and saved decks
    const userCollection = getCollection()
    setCollection(userCollection)
    setFilteredCards(userCollection)

    const userDecks = getDecks()
    setSavedDecks(userDecks)
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

  const addCardToDeck = (card: any) => {
    // Check deck size limit (60 cards)
    if (currentDeck.length >= 60) {
      alert("Your deck is already at the maximum size of 60 cards.")
      return
    }

    // Check card count limits (4 of same card except basic energy)
    if (card.type !== "Energy" || card.subtype !== "Basic") {
      const sameCardCount = currentDeck.filter((c) => c.id === card.id).length
      if (sameCardCount >= 4) {
        alert("You can only have 4 copies of the same card in your deck.")
        return
      }
    }

    setCurrentDeck([...currentDeck, card])
  }

  const removeCardFromDeck = (index: number) => {
    const newDeck = [...currentDeck]
    newDeck.splice(index, 1)
    setCurrentDeck(newDeck)
  }

  const handleSaveDeck = () => {
    // Validate deck
    if (currentDeck.length < 60) {
      alert("Your deck must contain exactly 60 cards.")
      return
    }

    // Check if deck has at least one basic Pokémon
    const hasBasicPokemon = currentDeck.some((card) => card.type === "Pokémon" && card.stage === "Basic")
    if (!hasBasicPokemon) {
      alert("Your deck must contain at least one Basic Pokémon.")
      return
    }

    // Save the deck
    saveDeck({
      id: Date.now().toString(),
      name: deckName,
      cards: currentDeck,
      createdAt: new Date().toISOString(),
    })

    // Update saved decks list
    setSavedDecks(getDecks())
    setShowSaveDialog(false)
  }

  const handleLoadDeck = (deck: any) => {
    setCurrentDeck(deck.cards)
    setDeckName(deck.name)
    setShowLoadDialog(false)
  }

  const handleDeleteDeck = (deckId: string) => {
    if (confirm("Are you sure you want to delete this deck?")) {
      deleteDeck(deckId)
      setSavedDecks(getDecks())
    }
  }

  const countCardsByType = () => {
    const counts = {
      pokemon: currentDeck.filter((card) => card.type === "Pokémon").length,
      trainer: currentDeck.filter((card) => card.type === "Trainer").length,
      energy: currentDeck.filter((card) => card.type === "Energy").length,
    }
    return counts
  }

  const cardCounts = countCardsByType()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-6 flex justify-between items-center">
          <Link href="/">
            <Button variant="ghost" className="text-white">
              <Home className="mr-2 h-5 w-5" />
              Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-center text-yellow-300 drop-shadow-lg">Deck Builder</h1>
          <div className="flex space-x-2">
            <Button variant="outline" className="border-white text-white" onClick={() => setShowLoadDialog(true)}>
              Load Deck
            </Button>
            <Button className="bg-green-500 hover:bg-green-600" onClick={() => setShowSaveDialog(true)}>
              <Save className="mr-2 h-4 w-4" />
              Save Deck
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card Collection */}
          <div className="lg:col-span-2 bg-gray-900/50 rounded-lg p-4">
            <div className="flex gap-4 mb-4">
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

            <Tabs defaultValue="all" onValueChange={handleTabChange} className="mb-4">
              <TabsList className="bg-gray-800 border border-gray-700">
                <TabsTrigger value="all" className="data-[state=active]:bg-gray-700">
                  All Cards
                </TabsTrigger>
                <TabsTrigger value="pokemon" className="data-[state=active]:bg-gray-700">
                  Pokémon
                </TabsTrigger>
                <TabsTrigger value="trainer" className="data-[state=active]:bg-gray-700">
                  Trainer
                </TabsTrigger>
                <TabsTrigger value="energy" className="data-[state=active]:bg-gray-700">
                  Energy
                </TabsTrigger>
              </TabsList>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[60vh] overflow-y-auto p-2">
                {filteredCards.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-gray-400">
                    <p className="text-xl mb-4">No cards found</p>
                    <Link href="/open-packs">
                      <Button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900">Open Some Packs</Button>
                    </Link>
                  </div>
                ) : (
                  filteredCards.map((card, index) => (
                    <Card
                      key={`collection-${index}`}
                      className={cn(
                        "h-48 relative overflow-hidden hover:-translate-y-1 transition-transform duration-200 cursor-pointer",
                        card.type === "Pokémon" && "bg-gradient-to-b from-yellow-100 to-yellow-300",
                        card.type === "Trainer" && "bg-gradient-to-b from-purple-100 to-purple-300",
                        card.type === "Energy" && "bg-gradient-to-b from-gray-100 to-gray-300",
                      )}
                      onClick={() => addCardToDeck(card)}
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
                            src={`/placeholder.svg?height=100&width=80&text=${card.name}`}
                            alt={card.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex justify-between text-xs text-gray-700">
                          <span>{card.type}</span>
                          {card.type === "Pokémon" && <span>{card.pokemonType}</span>}
                        </div>
                      </div>

                      <div className="absolute bottom-0 right-0 bg-green-500 rounded-tl-md p-1">
                        <Plus className="h-4 w-4 text-white" />
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </Tabs>
          </div>

          {/* Current Deck */}
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              {editingDeckName ? (
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    value={deckName}
                    onChange={(e) => setDeckName(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    autoFocus
                  />
                  <Button size="sm" onClick={() => setEditingDeckName(false)}>
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center">
                  <h2 className="text-xl font-bold">{deckName}</h2>
                  <Button variant="ghost" size="sm" onClick={() => setEditingDeckName(true)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="text-sm bg-gray-800 px-3 py-1 rounded-full">{currentDeck.length}/60 cards</div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4 text-center text-sm">
              <div className="bg-yellow-500/20 rounded p-2">
                <div className="font-bold">Pokémon</div>
                <div>{cardCounts.pokemon}</div>
              </div>
              <div className="bg-purple-500/20 rounded p-2">
                <div className="font-bold">Trainer</div>
                <div>{cardCounts.trainer}</div>
              </div>
              <div className="bg-gray-500/20 rounded p-2">
                <div className="font-bold">Energy</div>
                <div>{cardCounts.energy}</div>
              </div>
            </div>

            {currentDeck.length === 0 ? (
              <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-700 rounded-lg">
                <p className="mb-2">Your deck is empty</p>
                <p className="text-sm">Click on cards from your collection to add them to your deck</p>
              </div>
            ) : (
              <div className="max-h-[50vh] overflow-y-auto">
                <Tabs defaultValue="all">
                  <TabsList className="bg-gray-800 border border-gray-700 w-full">
                    <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-gray-700">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="pokemon" className="flex-1 data-[state=active]:bg-gray-700">
                      Pokémon
                    </TabsTrigger>
                    <TabsTrigger value="trainer" className="flex-1 data-[state=active]:bg-gray-700">
                      Trainer
                    </TabsTrigger>
                    <TabsTrigger value="energy" className="flex-1 data-[state=active]:bg-gray-700">
                      Energy
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="mt-4">
                    <div className="space-y-2">
                      {currentDeck.map((card, index) => (
                        <div
                          key={`deck-${index}`}
                          className={cn(
                            "flex items-center justify-between p-2 rounded",
                            card.type === "Pokémon" && "bg-yellow-500/20",
                            card.type === "Trainer" && "bg-purple-500/20",
                            card.type === "Energy" && "bg-gray-500/20",
                          )}
                        >
                          <div className="flex items-center">
                            <div
                              className={cn(
                                "w-8 h-8 rounded mr-2",
                                card.type === "Pokémon" && "bg-yellow-200",
                                card.type === "Trainer" && "bg-purple-200",
                                card.type === "Energy" && "bg-gray-200",
                              )}
                            ></div>
                            <div>
                              <div className="text-sm font-bold">{card.name}</div>
                              <div className="text-xs text-gray-300">
                                {card.type === "Pokémon" && `${card.pokemonType} - HP ${card.hp}`}
                                {card.type === "Trainer" && card.subtype}
                                {card.type === "Energy" && `${card.energyType} Energy`}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                            onClick={() => removeCardFromDeck(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="pokemon" className="mt-4">
                    <div className="space-y-2">
                      {currentDeck
                        .filter((card) => card.type === "Pokémon")
                        .map((card, index) => (
                          <div
                            key={`deck-pokemon-${index}`}
                            className="flex items-center justify-between p-2 rounded bg-yellow-500/20"
                          >
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded mr-2 bg-yellow-200"></div>
                              <div>
                                <div className="text-sm font-bold">{card.name}</div>
                                <div className="text-xs text-gray-300">
                                  {card.pokemonType} - HP {card.hp}
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                              onClick={() => removeCardFromDeck(currentDeck.indexOf(card))}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="trainer" className="mt-4">
                    <div className="space-y-2">
                      {currentDeck
                        .filter((card) => card.type === "Trainer")
                        .map((card, index) => (
                          <div
                            key={`deck-trainer-${index}`}
                            className="flex items-center justify-between p-2 rounded bg-purple-500/20"
                          >
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded mr-2 bg-purple-200"></div>
                              <div>
                                <div className="text-sm font-bold">{card.name}</div>
                                <div className="text-xs text-gray-300">{card.subtype}</div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                              onClick={() => removeCardFromDeck(currentDeck.indexOf(card))}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="energy" className="mt-4">
                    <div className="space-y-2">
                      {currentDeck
                        .filter((card) => card.type === "Energy")
                        .map((card, index) => (
                          <div
                            key={`deck-energy-${index}`}
                            className="flex items-center justify-between p-2 rounded bg-gray-500/20"
                          >
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded mr-2 bg-gray-200"></div>
                              <div>
                                <div className="text-sm font-bold">{card.name}</div>
                                <div className="text-xs text-gray-300">{card.energyType} Energy</div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                              onClick={() => removeCardFromDeck(currentDeck.indexOf(card))}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            <div className="mt-4">
              <Button
                className="w-full bg-green-500 hover:bg-green-600"
                disabled={currentDeck.length !== 60}
                onClick={() => setShowSaveDialog(true)}
              >
                {currentDeck.length === 60 ? "Save Deck" : `Add ${60 - currentDeck.length} more card(s)`}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Deck Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Save Deck</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="deckName" className="text-sm font-medium">
                Deck Name
              </label>
              <Input
                id="deckName"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
                className="bg-gray-700 border-gray-600"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Deck Summary</h3>
              <div className="bg-gray-900 p-3 rounded text-sm">
                <div className="flex justify-between mb-2">
                  <span>Total Cards:</span>
                  <span>{currentDeck.length}/60</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Pokémon:</span>
                  <span>{cardCounts.pokemon}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Trainer Cards:</span>
                  <span>{cardCounts.trainer}</span>
                </div>
                <div className="flex justify-between">
                  <span>Energy Cards:</span>
                  <span>{cardCounts.energy}</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveDeck}>Save Deck</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Load Deck Dialog */}
      <Dialog open={showLoadDialog} onOpenChange={setShowLoadDialog}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Load Deck</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            {savedDecks.length === 0 ? (
              <div className="text-center py-6 text-gray-400">
                <p>You don't have any saved decks yet.</p>
              </div>
            ) : (
              savedDecks.map((deck) => (
                <div key={deck.id} className="bg-gray-900 p-3 rounded mb-3 hover:bg-gray-800 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold">{deck.name}</h3>
                    <div className="text-xs text-gray-400">{new Date(deck.createdAt).toLocaleDateString()}</div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-3 text-center text-xs">
                    <div className="bg-yellow-500/20 rounded p-1">
                      <div>Pokémon</div>
                      <div>{deck.cards.filter((c: any) => c.type === "Pokémon").length}</div>
                    </div>
                    <div className="bg-purple-500/20 rounded p-1">
                      <div>Trainer</div>
                      <div>{deck.cards.filter((c: any) => c.type === "Trainer").length}</div>
                    </div>
                    <div className="bg-gray-500/20 rounded p-1">
                      <div>Energy</div>
                      <div>{deck.cards.filter((c: any) => c.type === "Energy").length}</div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      onClick={() => handleDeleteDeck(deck.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                    <Button size="sm" onClick={() => handleLoadDeck(deck)}>
                      Load Deck
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
