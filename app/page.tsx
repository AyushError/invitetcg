import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-yellow-300 drop-shadow-lg">Pokémon Trading Card Game</h1>
          <p className="text-xl text-blue-100">Battle, collect, and become a Pokémon Master!</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-gradient-to-br from-red-500 to-red-700 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-4 text-white">Play Game</h2>
              <div className="mb-4 relative">
                <img
                  src="/placeholder.svg?height=200&width=300&text=Battle"
                  alt="Play Game"
                  className="mx-auto rounded-lg shadow-lg"
                />
              </div>
              <p className="mb-4 text-red-100">Challenge the AI or play against friends in a full Pokemon TCG match!</p>
              <Link href="/game">
                <Button className="w-full bg-yellow-400 hover:bg-yellow-300 text-red-900 font-bold">
                  Start Battle
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-700 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-4 text-white">Deck Builder</h2>
              <div className="mb-4 relative">
                <img
                  src="/placeholder.svg?height=200&width=300&text=Build+Deck"
                  alt="Deck Builder"
                  className="mx-auto rounded-lg shadow-lg"
                />
                <div className="absolute top-2 right-2">
                  <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
                </div>
              </div>
              <p className="mb-4 text-green-100">Create and customize your own deck with your collection of cards!</p>
              <Link href="/deck-builder">
                <Button className="w-full bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold">
                  Build Deck
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-700 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-4 text-white">Open Packs</h2>
              <div className="mb-4 relative">
                <img
                  src="/placeholder.svg?height=200&width=300&text=Booster+Packs"
                  alt="Open Packs"
                  className="mx-auto rounded-lg shadow-lg"
                />
              </div>
              <p className="mb-4 text-purple-100">Open booster packs to expand your collection with new cards!</p>
              <Link href="/open-packs">
                <Button className="w-full bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-bold">
                  Open Packs
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center gap-6">
          <Link href="/collection">
            <Button
              variant="outline"
              className="bg-transparent border-2 border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-blue-900 font-bold px-8 py-6 text-lg"
            >
              View Collection
            </Button>
          </Link>
          <Link href="/tutorial">
            <Button className="bg-white hover:bg-gray-100 text-blue-900 font-bold px-8 py-6 text-lg">
              How To Play
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
