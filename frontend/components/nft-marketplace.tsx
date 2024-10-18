'use client'

import { useState, useEffect } from 'react'
import { Bell, Wallet, Moon, Sun, ArrowRight, Edit, TrendingUp, LogOut, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const colorfulLetters = [
  '#4e9af1', '#f1c232', '#6aa84f', '#cc0000', '#4e9af1', '#f1c232',
  '#6aa84f', '#cc0000', '#4e9af1', '#f1c232', '#6aa84f', '#cc0000',
  '#4e9af1', '#f1c232', '#6aa84f', '#cc0000', '#4e9af1'
]

const collections = [
  { 
    id: 1, 
    name: "Emilio Orden Mundial", 
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202024-09-10%20at%2011.46.59-pw0bFxje8hvkQdhBhu56352oEIUPsJ.png",
    available: true
  },
  { 
    id: 2, 
    name: "Lemon Nation", 
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202024-09-10%20at%2011.43.10-LEH2zzzDzpDi99KqlZd00vzcuva38F.png",
    available: false
  },
  { 
    id: 3, 
    name: "Bored Apes", 
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202024-09-10%20at%2011.42.48-bg0ZlgcZsjwJO5c45lvRJeEafvwmou.png",
    available: false
  },
  { 
    id: 4, 
    name: "Doodles", 
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202024-09-10%20at%2011.42.21-GRSuhtNMkXihZ49j3zg9cyrIY0KmMm.png",
    available: false
  },
]

const mockPlazaNFTs = [
  { id: 1, name: "Emilio #1", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202024-09-11%20at%2000.28.39-cWNKdcXL1ECjeDICdA8dxVPgrkgWYr.png", availableForTrade: true, owner: "0x1234...5678", trait: "Rare", attributes: { background: "Blue", clothing: "Suit", expression: "Happy" } },
  { id: 2, name: "Emilio #2", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202024-09-11%20at%2000.28.47-nI9xBMQID4rg66KIorma3idOTSToMB.png", availableForTrade: true, owner: "0xabcd...efgh", trait: "Common", attributes: { background: "Red", clothing: "T-shirt", expression: "Excited" } },
  { id: 3, name: "Emilio #3", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202024-09-11%20at%2000.28.53-PPSaZq3SkjxffInaOWqKIIlih4MzQm.png", availableForTrade: false, owner: "0x9876...5432", trait: "Legendary", attributes: { background: "Gold", clothing: "Cape", expression: "Determined" } },
  { id: 4, name: "Emilio #4", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202024-09-11%20at%2000.29.00-PoMRtmFJXtFTB5p7ixGrvu6pePuQ2D.png", availableForTrade: true, owner: "0xfeda...1234", trait: "Rare", attributes: { background: "Green", clothing: "Hoodie", expression: "Calm" } },
  { id: 5, name: "Emilio #5", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202024-09-11%20at%2000.29.07-uLeXikwmJcE0JlIbm9jhpHyzw4aWXV.png", availableForTrade: true, owner: "0x5678...9abc", trait: "Common", attributes: { background: "Purple", clothing: "Tank Top", expression: "Surprised" } },
]

const mockUserNFTs = [
  { id: 6, name: "My Emilio #1", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202024-09-11%20at%2000.28.39-cWNKdcXL1ECjeDICdA8dxVPgrkgWYr.png", availableForTrade: false, owner: "0xYOUR...WALLET", trait: "Rare", attributes: { background: "Yellow", clothing: "Jacket", expression: "Serious" } },
  { id: 7, name: "My Emilio #2", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202024-09-11%20at%2000.28.47-nI9xBMQID4rg66KIorma3idOTSToMB.png", availableForTrade: true, owner: "0xYOUR...WALLET", trait: "Common", attributes: { background: "Orange", clothing: "Scarf", expression: "Laughing" } },
]

const mockIncomingTrades = [
  { id: 1, offeredNft: mockPlazaNFTs[0], requestedNft: mockUserNFTs[0], from: "0x1234...5678" },
  { id: 2, offeredNft: mockPlazaNFTs[1], requestedNft: mockUserNFTs[1], from: "0xabcd...efgh" },
]

const mockTradeHistory = [
  { id: 1, nftFrom: mockPlazaNFTs[2], nftTo: mockUserNFTs[0], from: "0x9876...5432", to: "You", date: "2024-03-15" },
  { id: 2, nftFrom: mockUserNFTs[1], nftTo: mockPlazaNFTs[3], from: "You", to: "0xfeda...1234", date: "2024-03-14" },
]

const NFTDetailsCard = ({ nft, showDetails, onToggleDetails, darkMode }) => (
  <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} overflow-hidden`}>
    <CardContent className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img src={nft.image} alt={nft.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
          <div>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{nft.name}</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Owner: {nft.owner}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onToggleDetails}>
          {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      {showDetails && (
        <div className="space-y-4 mt-4">
          <div>
            <h4 className="text-lg font-semibold mb-2">Attributes</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(nft.attributes).map(([key, value]) => (
                <div key={key} className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-2 rounded`}>
                  <p className="text-sm font-medium">{key}</p>
                  <p className="text-lg">{value}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{Math.floor(Math.random() * 100)}% have this trait</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Details</h4>
            <div className="space-y-2">
              <p><strong>Trait:</strong> {nft.trait}</p>
              <p><strong>Available for Trade:</strong> {nft.availableForTrade ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>
      )}
    </CardContent>
  </Card>
)

export function NftMarketplace() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedCollection, setSelectedCollection] = useState(null)
  const [activeSection, setActiveSection] = useState('plaza')
  const [activePlazaTab, setActivePlazaTab] = useState('forTrade')
  const [activeTradeCenterTab, setActiveTradeCenterTab] = useState('initiate')
  const [searchQuery, setSearchQuery] = useState('')
  const [traitFilter, setTraitFilter] = useState('All Traits')
  const [darkMode, setDarkMode] = useState(false)
  const [selectedUserNft, setSelectedUserNft] = useState(null)
  const [selectedPlazaNft, setSelectedPlazaNft] = useState(null)
  const [userNFTs, setUserNFTs] = useState(mockUserNFTs)
  const [incomingTrades, setIncomingTrades] = useState(mockIncomingTrades)
  const [tradeHistory, setTradeHistory] = useState(mockTradeHistory)
  const [selectedNftForDetails, setSelectedNftForDetails] = useState(null)
  const [showUserNftDetails, setShowUserNftDetails] = useState(false)
  const [showPlazaNftDetails, setShowPlazaNftDetails] = useState(false)

  const userWalletAddress = "0xYOUR...WALLET" // Simulated user wallet address

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setSelectedCollection(null)
  }

  const handleCollectionSelect = (collection) => {
    if (collection.available) {
      setSelectedCollection(collection)
    }
  }

  const handleToggleTradeAvailability = (nftId) => {
    setUserNFTs(prevNfts => 
      prevNfts.map(nft => 
        nft.id === nftId ? { ...nft, availableForTrade: !nft.availableForTrade } : nft
      )
    )
  }

  const handleInitiateTrade = (nft) => {
    setSelectedPlazaNft(nft)
    setActiveSection('tradeCenter')
    setActiveTradeCenterTab('initiate')
  }

  const handleProposeTrade = () => {
    if (!selectedUserNft || !selectedPlazaNft) {
      alert("Please select both NFTs for the trade.")
      return
    }
    console.log("Proposing trade:", { selectedUserNft, selectedPlazaNft })
    alert(`Trade proposed: Your ${selectedUserNft.name} for ${selectedPlazaNft.name}`)
  }

  const handleIncomingTrade = (tradeId, action) => {
    if (action === 'accept') {
      const acceptedTrade = incomingTrades.find(trade => trade.id === tradeId)
      setTradeHistory(prevHistory => [
        {
          id: prevHistory.length + 1,
          nftFrom: acceptedTrade.offeredNft,
          nftTo: acceptedTrade.requestedNft,
          from: acceptedTrade.from,
          to: "You",
          date: new Date().toISOString().split('T')[0]
        },
        ...prevHistory
      ])
      alert("Trade accepted!")
    } else if (action === 'decline') {
      alert("Trade declined!")
    } else if (action === 'modify') {
      setSelectedPlazaNft(incomingTrades.find(trade => trade.id === tradeId).offeredNft)
      setActiveTradeCenterTab('initiate')
    }
    setIncomingTrades(prevTrades => prevTrades.filter(trade => trade.id !== tradeId))
  }

  const filteredPlazaNFTs = mockPlazaNFTs.filter(nft => 
    (searchQuery ? nft.name.toLowerCase().includes(searchQuery.toLowerCase()) || nft.owner.toLowerCase().includes(searchQuery.toLowerCase()) : true) &&
    (activePlazaTab === 'forTrade' ? nft.availableForTrade : true) &&
    (traitFilter === 'All Traits' || nft.trait === traitFilter)
  )

  const NFTDetailsDialog = ({ nft, onClose }) => (
    <Dialog open={!!nft} onOpenChange={() => onClose()}>
      <DialogContent className={`sm:max-w-[425px] ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <DialogHeader>
          <DialogTitle>{nft?.name}</DialogTitle>
          <DialogDescription>
            <img src={nft?.image} alt={nft?.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <div className="space-y-2">
              <p><strong>Owner:</strong> {nft?.owner}</p>
              <p><strong>Trait:</strong> {nft?.trait}</p>
              <p><strong>Available for Trade:</strong> {nft?.availableForTrade ? 'Yes' : 'No'}</p>
              <div>
                <strong>Attributes:</strong>
                <ul className="list-disc list-inside">
                  {Object.entries(nft?.attributes || {}).map(([key, value]) => (
                    <li key={key}>{key}: {value}</li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#4A8C7F] flex items-center justify-center">
        <Card className="w-[300px] bg-[#3a7c6f] border-[#ffd700] shadow-lg">
          <CardHeader className="flex flex-col items-center">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202024-09-10%20at%2011.52.04-T0ef7XeJ7HpT8aXOqnlMf5fgAmpzDD.png" 
              alt="Talos Plaza Logo" 
              className="w-24 h-24 rounded-full mb-4"
            />
            <CardTitle className="text-2xl font-bold text-[#ffd700] mb-2">Talos Plaza</CardTitle>
            <p className="text-[#ffe666] text-sm text-center font-medium">Reinventing Barter for the NFT Era</p>
          </CardHeader>
          <CardContent>
            <Button onClick={handleLogin} className="w-full bg-[#ffd700] hover:bg-[#ffe666] text-[#4A8C7F] font-bold transition-colors">
              <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!selectedCollection) {
    return (
      <div className="min-h-screen bg-[#4A8C7F] p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202024-09-10%20at%2011.52.04-T0ef7XeJ7HpT8aXOqnlMf5fgAmpzDD.png" 
                alt="Talos Plaza Logo" 
                className="w-12 h-12 rounded-full mr-4"
              />
              <h1 className="text-3xl font-bold text-[#ffd700]">Your NFT Collections</h1>
            </div>
            <Button onClick={handleLogout} className="bg-[#ffd700] hover:bg-[#ffe666] text-[#4A8C7F] font-bold transition-colors">
              <LogOut className="mr-2 h-4 w-4" /> Disconnect Wallet
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collections.map((collection) => (
              <Card 
                key={collection.id} 
                className={`bg-[#3a7c6f] border-[#ffd700] ${collection.available ? 'cursor-pointer hover:bg-[#2a6c5f]' : 'opacity-50'} transition-colors shadow-lg`}
                onClick={() => handleCollectionSelect(collection)}
              >
                <CardContent className="flex items-center p-6 relative">
                  <img src={collection.image} alt={collection.name} className="w-16 h-16 rounded-full mr-4 object-cover" />
                  <div>
                    <h2 className="text-xl font-semibold text-[#ffd700]">{collection.name}</h2>
                    <p className="text-[#ffe666] text-sm font-medium">
                      {collection.available ? 'Click to enter trading plaza' : 'Coming soon'}
                    </p>
                  </div>
                  {collection.available && (
                    <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                      Available
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <header className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            {"EMILIO ORDEN MUNDIAL".split('').map((letter, index) => (
              <span key={index} style={{color: colorfulLetters[index]}}>
                {letter}
              </span>
            ))}
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              className={`${darkMode ? 'bg-white text-gray-900 hover:bg-gray-200' : 'bg-gray-900 text-white hover:bg-gray-700'}`}
              onClick={handleLogout}
            >
              <Wallet className="mr-2 h-5 w-5" />
              Disconnect
            </Button>
          </div>
        </div>
      </header>

      <main className="p-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <Input
            className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
            placeholder="Search NFTs by name, wallet, or owner"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <Button
            className={`px-8 py-2 rounded-full ${activeSection === 'plaza' ? (darkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white') : (darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800')}`}
            onClick={() => setActiveSection('plaza')}
          >
            Plaza
          </Button>
          <Button
            className={`px-8 py-2 rounded-full ${activeSection === 'tradeCenter' ? (darkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white') : (darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800')}`}
            onClick={() => setActiveSection('tradeCenter')}
          >
            Trade Center
          </Button>
          <Button
            className={`px-8 py-2 rounded-full ${activeSection === 'myNFTs' ? (darkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white') : (darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800')}`}
            onClick={() => setActiveSection('myNFTs')}
          >
            My NFTs
          </Button>
        </div>

        {activeSection === 'plaza' && (
          <>
            <div className="flex justify-center gap-4 mb-8">
              <Select value={traitFilter} onValueChange={setTraitFilter}>
                <SelectTrigger className={`w-40 ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}>
                  <SelectValue placeholder="Select trait" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Traits">All Traits</SelectItem>
                  <SelectItem value="Rare">Rare</SelectItem>
                  <SelectItem value="Common">Common</SelectItem>
                  <SelectItem value="Legendary">Legendary</SelectItem>
                </SelectContent>
              </Select>
              <Button
                className={`px-6 py-2 rounded-full ${activePlazaTab === 'forTrade' ? (darkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white') : (darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800')}`}
                onClick={() => setActivePlazaTab('forTrade')}
              >
                For Trade
              </Button>
              <Button
                className={`px-6 py-2 rounded-full ${activePlazaTab === 'collection' ? (darkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white') : (darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800')}`}
                onClick={() => setActivePlazaTab('collection')}
              >
                Collection
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPlazaNFTs.map((nft) => (
                <Card key={nft.id} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} overflow-hidden`}>
                  <div className="relative">
                    <img src={nft.image} alt={nft.name} className="w-full h-48 object-cover" />
                    {nft.availableForTrade && (
                      <Badge className="absolute top-2 left-2 bg-blue-500 text-white text-sm px-2 py-1">1:1 Trade</Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{nft.name}</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>Owner: {nft.owner}</p>
                    <div className="flex justify-between">
                      <Button 
                        className={`w-1/2 mr-2 ${nft.availableForTrade ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-600'}`}
                        disabled={!nft.availableForTrade}
                        onClick={() => handleInitiateTrade(nft)}
                      >
                        {nft.availableForTrade ? 'Trade Now' : 'Not Available'}
                      </Button>
                      <Button
                        className="w-1/2 ml-2 bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => setSelectedNftForDetails(nft)}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {activeSection === 'tradeCenter' && (
          <div className="space-y-8">
            <div className="flex justify-center gap-4 mb-8">
              <Button
                className={`px-8 py-2 rounded-full ${activeTradeCenterTab === 'initiate' ? (darkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white') : (darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800')}`}
                onClick={() => setActiveTradeCenterTab('initiate')}
              >
                Initiate Trade
              </Button>
              <Button
                className={`px-8 py-2 rounded-full ${activeTradeCenterTab === 'incoming' ? (darkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white') : (darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800')}`}
                onClick={() => setActiveTradeCenterTab('incoming')}
              >
                Incoming Trades
              </Button>
              <Button
                className={`px-8 py-2 rounded-full ${activeTradeCenterTab === 'history' ? (darkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white') : (darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800')}`}
                onClick={() => setActiveTradeCenterTab('history')}
              >
                Trade History
              </Button>
            </div>

            {activeTradeCenterTab === 'initiate' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Your NFT</label>
                    <Select value={selectedUserNft?.id.toString()} onValueChange={(value) => setSelectedUserNft(userNFTs.find(nft => nft.id === parseInt(value)))}>
                      <SelectTrigger className={`w-full ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}>
                        <SelectValue placeholder="Select your NFT" />
                      </SelectTrigger>
                      <SelectContent>
                        {userNFTs.filter(nft => nft.availableForTrade).map((nft) => (
                          <SelectItem key={nft.id} value={nft.id.toString()}>
                            <div className="flex items-center">
                              <img src={nft.image} alt={nft.name} className="w-8 h-8 mr-2 rounded-full" />
                              {nft.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedUserNft && (
                      <NFTDetailsCard
                        nft={selectedUserNft}
                        showDetails={showUserNftDetails}
                        onToggleDetails={() => setShowUserNftDetails(!showUserNftDetails)}
                        darkMode={darkMode}
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Desired NFT</label>
                    <Select value={selectedPlazaNft?.id.toString()} onValueChange={(value) => setSelectedPlazaNft(mockPlazaNFTs.find(nft => nft.id === parseInt(value)))}>
                      <SelectTrigger className={`w-full ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}>
                        <SelectValue placeholder="Select desired NFT" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockPlazaNFTs.filter(nft => nft.availableForTrade && nft.owner !== userWalletAddress).map((nft) => (
                          <SelectItem key={nft.id} value={nft.id.toString()}>
                            <div className="flex items-center">
                              <img src={nft.image} alt={nft.name} className="w-8 h-8 mr-2 rounded-full" />
                              {nft.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedPlazaNft && (
                      <NFTDetailsCard
                        nft={selectedPlazaNft}
                        showDetails={showPlazaNftDetails}
                        onToggleDetails={() => setShowPlazaNftDetails(!showPlazaNftDetails)}
                        darkMode={darkMode}
                      />
                    )}
                  </div>
                </div>
                <Button 
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 text-xl font-semibold py-4 mt-4"
                  onClick={handleProposeTrade}
                >
                  Propose Trade
                </Button>
              </div>
            )}

            {activeTradeCenterTab === 'incoming' && (
              <div className="space-y-4">
                {incomingTrades.map((trade) => (
                  <Card key={trade.id} className={darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <img src={trade.offeredNft.image} alt={trade.offeredNft.name} className="w-12 h-12 rounded-full mr-2" />
                          <div>
                            <p className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>{trade.offeredNft.name}</p>
                            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>From: {trade.from}</p>
                          </div>
                        </div>
                        <ArrowRight className={`h-8 w-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                        <div className="flex items-center">
                          <div className="text-right mr-2">
                            <p className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>{trade.requestedNft.name}</p>
                            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Your NFT</p>
                          </div>
                          <img src={trade.requestedNft.image} alt={trade.requestedNft.name} className="w-12 h-12 rounded-full" />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-4">
                        <Button 
                          className="bg-yellow-500 hover:bg-yellow-600 text-white"
                          onClick={() => handleIncomingTrade(trade.id, 'modify')}
                        >
                          <Edit className="mr-2 h-5 w-5" />
                          Modify
                        </Button>
                        <Button 
                          className="bg-green-500 hover:bg-green-600 text-white"
                          onClick={() => handleIncomingTrade(trade.id, 'accept')}
                        >
                          Accept
                        </Button>
                        <Button 
                          className="bg-red-500 hover:bg-red-600 text-white"
                          onClick={() => handleIncomingTrade(trade.id, 'decline')}
                        >
                          Decline
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTradeCenterTab === 'history' && (
              <div className="space-y-8">
                <Card className={darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
                  <CardContent className="p-6">
                    <Table>
                      <TableHeader>
                        <TableRow className={darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}>
                          <TableHead className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Date</TableHead>
                          <TableHead className={darkMode ? 'text-gray-300' : 'text-gray-700'}>From</TableHead>
                          <TableHead className={darkMode ?'text-gray-300' : 'text-gray-700'}>To</TableHead>
                          <TableHead className={darkMode ? 'text-gray-300' : 'text-gray-700'}>NFT Traded</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tradeHistory.map((trade) => (
                          <TableRow key={trade.id} className={darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}>
                            <TableCell className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{trade.date}</TableCell>
                            <TableCell className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{trade.from}</TableCell>
                            <TableCell className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{trade.to}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <img src={trade.nftFrom.image} alt={trade.nftFrom.name} className="w-8 h-8 rounded-full" />
                                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{trade.nftFrom.name}</span>
                                <ArrowRight className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                                <img src={trade.nftTo.image} alt={trade.nftTo.name} className="w-8 h-8 rounded-full" />
                                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{trade.nftTo.name}</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <Card className={darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
                    <CardContent className="p-4">
                      <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Total Trades</h3>
                      <p className="text-3xl font-bold text-blue-600">{tradeHistory.length}</p>
                    </CardContent>
                  </Card>
                  <Card className={darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
                    <CardContent className="p-4">
                      <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Unique Trading Partners</h3>
                      <p className="text-3xl font-bold text-blue-600">
                        {new Set([...tradeHistory.map(t => t.from), ...tradeHistory.map(t => t.to)]).size}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className={darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
                    <CardContent className="p-4">
                      <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Trade Trend</h3>
                      <TrendingUp className="h-8 w-8 text-green-500" />
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        )}

        {activeSection === 'myNFTs' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {userNFTs.map((nft) => (
              <Card key={nft.id} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} overflow-hidden`}>
                <div className="relative">
                  <img src={nft.image} alt={nft.name} className="w-full h-48 object-cover" />
                  {nft.availableForTrade && (
                    <Badge className="absolute top-2 left-2 bg-blue-500 text-white text-sm px-2 py-1">1:1 Trade</Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{nft.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Available for Trade:</span>
                    <Switch
                      checked={nft.availableForTrade}
                      onCheckedChange={() => handleToggleTradeAvailability(nft.id)}
                    />
                  </div>
                  <div className="flex justify-between">
                    <Button 
                      className={`w-1/2 mr-2 ${nft.availableForTrade ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-600'}`}
                      onClick={() => {
                        setSelectedUserNft(nft)
                        setActiveSection('tradeCenter')
                        setActiveTradeCenterTab('initiate')
                      }}
                      disabled={!nft.availableForTrade}
                    >
                      Initiate Trade
                    </Button>
                    <Button
                      className="w-1/2 ml-2 bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => setSelectedNftForDetails(nft)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <NFTDetailsDialog nft={selectedNftForDetails} onClose={() => setSelectedNftForDetails(null)} />
    </div>
  )
}