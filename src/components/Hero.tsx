import { Button } from "@/components/ui/button"
import { Sparkles, Camera } from "lucide-react"

interface HeroProps {
  onTryNowClick: () => void
}

export const Hero = ({ onTryNowClick }: HeroProps) => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 opacity-95"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

      <div className="relative container mx-auto max-w-6xl px-4 py-24 md:py-32">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-5 py-2.5 shadow-lg border border-white/30">
            <Sparkles className="w-4 h-4 text-yellow-200" />
            <span className="text-sm font-semibold text-white">AI-Powered Virtual Try-On</span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight text-white drop-shadow-2xl">
            Try On
            <br />
            <span className="bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200 bg-clip-text text-transparent">
              Any Outfit
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/95 max-w-2xl mx-auto font-light leading-relaxed">
            Upload your photo and see yourself in different styles instantly
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              size="lg"
              onClick={onTryNowClick}
              className="bg-white text-purple-600 hover:bg-white/90 hover:scale-105 transition-all duration-200 text-lg px-10 py-7 rounded-2xl shadow-2xl font-semibold"
            >
              <Camera className="w-5 h-5 mr-2" />
              Start Try-On
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
