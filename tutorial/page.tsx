import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, ArrowRight } from "lucide-react"

export default function TutorialPage() {
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
          <h1 className="text-3xl font-bold text-center text-yellow-300 drop-shadow-lg">How To Play</h1>
          <div className="w-24"></div> {/* Spacer for alignment */}
        </header>

        <Tabs defaultValue="basics" className="space-y-6">
          <TabsList className="bg-gray-800 border border-gray-700 w-full max-w-3xl mx-auto">
            <TabsTrigger value="basics" className="flex-1 data-[state=active]:bg-gray-700">
              Basics
            </TabsTrigger>
            <TabsTrigger value="gameplay" className="flex-1 data-[state=active]:bg-gray-700">
              Gameplay
            </TabsTrigger>
            <TabsTrigger value="deckbuilding" className="flex-1 data-[state=active]:bg-gray-700">
              Deck Building
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex-1 data-[state=active]:bg-gray-700">
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basics" className="max-w-3xl mx-auto">
            <Card className="bg-gray-900/50 border-0">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-yellow-300">Pokémon TCG Basics</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Card Types</h3>
                    <p className="mb-4">There are three main types of cards in the Pokémon Trading Card Game:</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-yellow-500/20 p-4 rounded">
                        <h4 className="font-bold mb-2">Pokémon Cards</h4>
                        <p className="text-sm">
                          These are your main cards that battle against your opponent's Pokémon.
                        </p>
                      </div>
                      <div className="bg-purple-500/20 p-4 rounded">
                        <h4 className="font-bold mb-2">Trainer Cards</h4>
                        <p className="text-sm">
                          These cards represent items, supporters, and stadiums that help you during battle.
                        </p>
                      </div>
                      <div className="bg-gray-500/20 p-4 rounded">
                        <h4 className="font-bold mb-2">Energy Cards</h4>
                        <p className="text-sm">
                          These cards power your Pokémon's attacks and are attached to your Pokémon.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2">Game Objective</h3>
                    <p>
                      The goal of the game is to take all of your Prize cards by knocking out your opponent's Pokémon.
                      You can also win if your opponent has no Pokémon left in play or cannot draw a card at the start
                      of their turn.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2">Game Setup</h3>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>Shuffle your deck of 60 cards.</li>
                      <li>Draw 7 cards to form your starting hand.</li>
                      <li>Place a Basic Pokémon in your Active spot.</li>
                      <li>Place up to 5 Basic Pokémon on your Bench.</li>
                      <li>Place 6 cards face down as your Prize cards.</li>
                      <li>Decide who goes first (the player going first cannot attack on their first turn).</li>
                    </ol>
                  </div>

                  <div className="text-center">
                    <img
                      src="/placeholder.svg?height=200&width=400&text=Game+Board+Layout"
                      alt="Game Board Layout"
                      className="mx-auto rounded-lg mb-4"
                    />
                    <p className="text-sm text-gray-400">The Pokémon TCG game board layout</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gameplay" className="max-w-3xl mx-auto">
            <Card className="bg-gray-900/50 border-0">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-yellow-300">Gameplay</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Turn Structure</h3>
                    <p className="mb-4">Each turn consists of the following steps:</p>

                    <ol className="list-decimal list-inside space-y-3">
                      <li className="bg-gray-800 p-3 rounded">
                        <span className="font-bold">Draw a card</span> - Start your turn by drawing a card from your
                        deck.
                      </li>
                      <li className="bg-gray-800 p-3 rounded">
                        <span className="font-bold">Take any of these actions in any order:</span>
                        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                          <li>
                            Put Basic Pokémon from your hand onto your Bench (up to 5 total Pokémon on your Bench).
                          </li>
                          <li>Evolve your Pokémon (but not on your first turn or the turn you play that Pokémon).</li>
                          <li>Attach 1 Energy card from your hand to one of your Pokémon (once per turn).</li>
                          <li>
                            Play Trainer cards (as many as you want, but only one Supporter and one Stadium per turn).
                          </li>
                          <li>
                            Retreat your Active Pokémon (once per turn, if you have the Energy to pay the retreat cost).
                          </li>
                          <li>Use Abilities (as many as you want).</li>
                        </ul>
                      </li>
                      <li className="bg-gray-800 p-3 rounded">
                        <span className="font-bold">Attack and end your turn</span> - When you attack, your turn ends.
                        Check weakness, resistance, and effects of attacks.
                      </li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2">Attacking</h3>
                    <p className="mb-4">To attack with your Active Pokémon:</p>

                    <ol className="list-decimal list-inside space-y-2">
                      <li>
                        Check if you have the required Energy attached to your Pokémon for the attack you want to use.
                      </li>
                      <li>Announce which attack you're using.</li>
                      <li>Apply any effects mentioned in the attack text.</li>
                      <li>Place damage counters on your opponent's Pokémon (10 damage = 1 counter).</li>
                      <li>If the damage equals or exceeds the defending Pokémon's HP, it is Knocked Out.</li>
                      <li>If you Knock Out a Pokémon, take one of your Prize cards.</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2">Winning the Game</h3>
                    <p>You win the game if any of these conditions are met:</p>

                    <ul className="list-disc list-inside space-y-2 bg-gray-800 p-4 rounded">
                      <li>You take all of your Prize cards.</li>
                      <li>You Knock Out all of your opponent's Pokémon in play.</li>
                      <li>Your opponent has no cards left in their deck at the beginning of their turn.</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deckbuilding" className="max-w-3xl mx-auto">
            <Card className="bg-gray-900/50 border-0">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-yellow-300">Deck Building</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Deck Building Rules</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Your deck must contain exactly 60 cards.</li>
                      <li>
                        You can have up to 4 copies of a card with the same name in your deck (except for basic Energy
                        cards).
                      </li>
                      <li>Your deck must contain at least one Basic Pokémon.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2">Deck Building Tips</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-800 p-4 rounded">
                        <h4 className="font-bold mb-2">Pokémon Balance</h4>
                        <p className="text-sm">
                          A good starting point is to include 15-20 Pokémon cards in your deck. Make sure you have
                          enough Basic Pokémon to start the game with.
                        </p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded">
                        <h4 className="font-bold mb-2">Energy Balance</h4>
                        <p className="text-sm">
                          Include around 12-15 Energy cards. Match the Energy types to your Pokémon's attack
                          requirements.
                        </p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded">
                        <h4 className="font-bold mb-2">Trainer Cards</h4>
                        <p className="text-sm">
                          Fill the rest of your deck with Trainer cards (25-30). Include cards that let you draw more
                          cards, search for specific cards, and disrupt your opponent.
                        </p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded">
                        <h4 className="font-bold mb-2">Strategy Focus</h4>
                        <p className="text-sm">
                          Build your deck around a specific strategy or type of Pokémon. This creates synergy between
                          your cards.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2">Popular Deck Archetypes</h3>

                    <div className="space-y-3">
                      <div className="bg-yellow-500/20 p-3 rounded">
                        <h4 className="font-bold">Aggro Decks</h4>
                        <p className="text-sm">
                          Focus on dealing damage quickly and taking Prize cards as fast as possible.
                        </p>
                      </div>
                      <div className="bg-blue-500/20 p-3 rounded">
                        <h4 className="font-bold">Control Decks</h4>
                        <p className="text-sm">
                          Focus on disrupting your opponent's strategy while slowly building up your own board.
                        </p>
                      </div>
                      <div className="bg-green-500/20 p-3 rounded">
                        <h4 className="font-bold">Tank Decks</h4>
                        <p className="text-sm">
                          Focus on Pokémon with high HP and healing abilities to outlast your opponent.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="max-w-3xl mx-auto">
            <Card className="bg-gray-900/50 border-0">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-yellow-300">Advanced Concepts</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Special Conditions</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-red-500/20 p-3 rounded">
                        <h4 className="font-bold">Burned</h4>
                        <p className="text-sm">
                          Place 2 damage counters between turns. Flip a coin - if heads, the condition ends.
                        </p>
                      </div>
                      <div className="bg-yellow-500/20 p-3 rounded">
                        <h4 className="font-bold">Confused</h4>
                        <p className="text-sm">
                          Flip a coin when attacking. If tails, place 3 damage counters on the confused Pokémon.
                        </p>
                      </div>
                      <div className="bg-purple-500/20 p-3 rounded">
                        <h4 className="font-bold">Asleep</h4>
                        <p className="text-sm">
                          Pokémon can't attack or retreat. Flip a coin between turns - if heads, the condition ends.
                        </p>
                      </div>
                      <div className="bg-green-500/20 p-3 rounded">
                        <h4 className="font-bold">Poisoned</h4>
                        <p className="text-sm">Place 1 damage counter on the Pokémon between turns.</p>
                      </div>
                      <div className="bg-gray-500/20 p-3 rounded">
                        <h4 className="font-bold">Paralyzed</h4>
                        <p className="text-sm">
                          Pokémon can't attack or retreat. The condition ends after your opponent's next turn.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2">Advanced Strategies</h3>

                    <div className="space-y-3">
                      <div className="bg-gray-800 p-3 rounded">
                        <h4 className="font-bold">Energy Acceleration</h4>
                        <p className="text-sm">
                          Using cards and abilities that let you attach extra Energy cards during your turn.
                        </p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded">
                        <h4 className="font-bold">Hand Disruption</h4>
                        <p className="text-sm">
                          Forcing your opponent to discard or shuffle cards from their hand to disrupt their strategy.
                        </p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded">
                        <h4 className="font-bold">Deck Thinning</h4>
                        <p className="text-sm">
                          Removing cards from your deck to increase the chances of drawing the cards you need.
                        </p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded">
                        <h4 className="font-bold">Tech Cards</h4>
                        <p className="text-sm">
                          Including specific cards to counter popular strategies or Pokémon in the current meta.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2">Tournament Play</h3>
                    <p className="mb-4">In official tournaments, additional rules apply:</p>

                    <ul className="list-disc list-inside space-y-2">
                      <li>Matches are typically best-of-three games.</li>
                      <li>Time limits are enforced for each round.</li>
                      <li>Only cards from specific sets are legal (Standard format).</li>
                      <li>Some cards may be banned or restricted.</li>
                      <li>Players must use opaque card sleeves of the same design.</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-8">
          <Link href="/game">
            <Button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold">
              Start Playing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
