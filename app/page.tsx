import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-yellow-300 drop-shadow-lg">Welcome To Ayush's Birthday Invite</h1>
          <p className="text-xl text-blue-100">Party on 12th of May @8:00 pm</p>
        </header>


         <div> <Card className="bg-gradient-to-br from-purple-500 to-purple-700 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-4 text-white">Open Packs</h2>
              <div className="mb-4 relative">
                <img
                  src="/1.png?height=200&width=300&text=Booster+Packs"
                  alt="Open Packs"
                  className="mx-auto rounded-lg shadow-lg"
                />
              </div>
              <p className="mb-4 text-purple-100">Get lucky and win rare items</p>
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
              View Your gifts
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
