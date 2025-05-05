
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import './index.css';

function App() {
  const [account, setAccount] = useState("");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const connectWallet = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    setAccount(address);
  };

  const launchDate = new Date("2025-06-05T18:00:00-05:00"); // Nueva fecha de lanzamiento

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = launchDate - now;
      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-yellow-100 text-gray-900 font-sans">
      <header className="flex justify-between items-center p-4 bg-yellow-300 shadow">
        <h1 className="text-xl font-bold">BrokeToRich</h1>
        <button
          onClick={connectWallet}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {account ? `Connected: ${account.slice(0, 6)}...` : 'Connect Wallet'}
        </button>
      </header>

      <main className="text-center mt-10 px-4">
        <img
          src="/De Broke a Rico_ ¡El Juego Comienza!.png"
          alt="Launch Banner"
          className="mx-auto mb-6 w-full max-w-4xl rounded-lg shadow-xl"
        />
        <h2 className="text-4xl font-bold mb-2">From BROKE... to RICH 🚀</h2>
        <p className="mb-6 text-lg font-medium">The meme coin with a serious mission.</p>
        <div className="space-x-4 mb-10">
          <a
            href="https://pancakeswap.finance"
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
            target="_blank"
          >
            Buy on PancakeSwap
          </a>
          <a
            href="/whitepaper.pdf"
            className="bg-gray-800 text-white px-5 py-2 rounded hover:bg-gray-900"
            target="_blank"
          >
            Read Whitepaper
          </a>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-2">⏳ Launch Countdown</h3>
          <p className="text-xl">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </p>
          <p className="text-sm mt-1">Launch: June 5, 2025 – 6:00 PM CST</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 max-w-md mx-auto mb-20">
          <h3 className="text-2xl font-semibold mb-4">📊 Tokenomics</h3>
          <ul className="text-left text-lg space-y-2">
            <li><strong>Total Supply:</strong> 50,000,000 BTR</li>
            <li><strong>Liquidity:</strong> 40%</li>
            <li><strong>Marketing:</strong> 20%</li>
            <li><strong>Team:</strong> 15%</li>
            <li><strong>Staking Rewards:</strong> 15%</li>
            <li><strong>Reserve:</strong> 10%</li>
          </ul>
        </div>

        <div className="bg-yellow-200 rounded-xl shadow p-6 max-w-3xl mx-auto mb-16 text-left">
          <h3 className="text-2xl font-semibold mb-4">📅 Roadmap & Vision</h3>
          <ul className="list-disc ml-5 space-y-2 text-lg">
            <li>Q2 2025 – Token Launch & Community Growth</li>
            <li>Q3 2025 – Listing on PancakeSwap, first Meme Campaigns</li>
            <li>Q4 2025 – Design and planning of the Paradigma Blockchain</li>
            <li>2026 – Migration of BTR tokens to Paradigma chain with lower fees and advanced scalability</li>
          </ul>
          <p className="mt-4 font-medium">
            BrokeToRich is more than a meme coin – it is the financial spark behind Paradigma, a next-generation blockchain built to outperform Ethereum and Solana in both cost and speed. Every BTR holder will be part of this migration and ecosystem.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
