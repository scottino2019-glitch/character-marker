import React, { useState } from 'react';
import { Sparkles, Download, RefreshCw, PawPrint, Ghost, User, Zap, LayoutGrid, Palette, Circle, Square, Smile, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Character Part Options
const HEAD_SHAPES = ['circle', 'baozi', 'square', 'oval'];
const EARS = ['none', 'rabbit', 'bear', 'cat', 'floppy'];
const EYES = ['normal', 'happy', 'cool', 'surprised', 'closed', 'cross', 'heart', 'wink', 'cross-pop', 'star'];
const MOUTHS = ['smile', 'w', 'cat', 'flat', 'surprised', 'tongue', 'big-smile', 'pout'];
const ACCESSORIES = ['none', 'glasses', 'stella', 'halo', 'mustache', 'bow', 'glasses-round'];
const COLORS = ['#FFD93D', '#FF6B6B', '#4ECDC4', '#ffffff', '#FF9F43', '#A29BFE', '#74b9ff', '#55efc4'];
const BG_COLORS = ['#FFE66D', '#FFB6B6', '#A29BFE', '#4ECDC4', '#ffffff', '#fab1a0', '#81ecec'];

export default function App() {
  const [character, setCharacter] = useState({
    head: 'baozi',
    ears: 'rabbit',
    eyes: 'normal',
    mouth: 'cat',
    color: '#ffffff',
    eyeColor: '#2b2b2b',
    blush: true,
    accessory: 'none',
    cardBg: '#FFE66D'
  });

  const [showCode, setShowCode] = useState(false);
  const [codeText, setCodeText] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    if (showCode) {
      setCodeText(JSON.stringify(character, null, 2));
      setJsonError(null);
    }
  }, [showCode, character]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCodeText(e.target.value);
  };

  const applyCode = () => {
    try {
      const parsed = JSON.parse(codeText);
      setCharacter(parsed);
      setJsonError(null);
    } catch (e) {
      setJsonError('Errore: JSON non valido');
    }
  };

  const randomize = () => {
    setCharacter({
      head: HEAD_SHAPES[Math.floor(Math.random() * HEAD_SHAPES.length)],
      ears: EARS[Math.floor(Math.random() * EARS.length)],
      eyes: EYES[Math.floor(Math.random() * EYES.length)],
      mouth: MOUTHS[Math.floor(Math.random() * MOUTHS.length)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      eyeColor: '#2b2b2b',
      blush: Math.random() > 0.3,
      accessory: ACCESSORIES[Math.floor(Math.random() * ACCESSORIES.length)],
      cardBg: BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)]
    });
  };

  // SVG Character Renderer
  const CharacterPreview = () => {
    const { head, ears, eyes, mouth, color, blush, accessory } = character;

    return (
      <svg ref={svgRef} viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
        {/* Ears */}
        {ears === 'rabbit' && (
          <>
            <motion.path d="M60,80 Q50,0 80,70" fill={color} stroke="black" strokeWidth="4" initial={{ y: 20 }} animate={{ y: 0 }} />
            <motion.path d="M140,80 Q150,0 120,70" fill={color} stroke="black" strokeWidth="4" initial={{ y: 20 }} animate={{ y: 0 }} />
          </>
        )}
        {ears === 'bear' && (
          <>
            <circle cx="65" cy="75" r="15" fill={color} stroke="black" strokeWidth="4" />
            <circle cx="135" cy="75" r="15" fill={color} stroke="black" strokeWidth="4" />
          </>
        )}
        {ears === 'cat' && (
          <>
            <path d="M50,85 L65,55 L85,85" fill={color} stroke="black" strokeWidth="4" />
            <path d="M150,85 L135,55 L115,85" fill={color} stroke="black" strokeWidth="4" />
          </>
        )}
        {ears === 'floppy' && (
          <>
            <rect x="40" y="80" width="15" height="40" rx="7" fill={color} stroke="black" strokeWidth="4" transform="rotate(15 47 80)" />
            <rect x="145" y="80" width="15" height="40" rx="7" fill={color} stroke="black" strokeWidth="4" transform="rotate(-15 152 80)" />
          </>
        )}

        {/* Head */}
        {head === 'circle' && <circle cx="100" cy="115" r="50" fill={color} stroke="black" strokeWidth="4" />}
        {head === 'square' && <rect x="55" y="70" width="90" height="90" rx="15" fill={color} stroke="black" strokeWidth="4" />}
        {head === 'oval' && <ellipse cx="100" cy="115" rx="60" ry="50" fill={color} stroke="black" strokeWidth="4" />}
        {head === 'baozi' && (
          <path 
            d="M50,140 Q50,70 100,70 Q150,70 150,140 Q150,155 100,155 Q50,155 50,140" 
            fill={color} stroke="black" strokeWidth="4" 
          />
        )}

        {/* Eyes */}
        <g transform="translate(100, 115)">
          {eyes === 'normal' && (
            <>
              <circle cx="-25" cy="-5" r="5" fill="black" />
              <circle cx="25" cy="-5" r="5" fill="black" />
            </>
          )}
          {eyes === 'happy' && (
            <>
              <path d="M-30,-5 Q-25,-15 -20,-5" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />
              <path d="M20,-5 Q25,-15 30,-5" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />
            </>
          )}
          {eyes === 'cool' && (
            <>
              <rect x="-35" y="-10" width="15" height="4" fill="black" />
              <rect x="20" y="-10" width="15" height="4" fill="black" />
            </>
          )}
          {eyes === 'surprised' && (
            <>
              <circle cx="-25" cy="-5" r="6" fill="none" stroke="black" strokeWidth="2" />
              <circle cx="25" cy="-5" r="6" fill="none" stroke="black" strokeWidth="2" />
            </>
          )}
          {eyes === 'closed' && (
            <>
              <path d="M-30,-5 L-20,-5" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />
              <path d="M20,-5 L30,-5" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />
            </>
          )}
          {eyes === 'cross' && (
            <>
              <path d="M-30,-10 L-20,0 M-30,0 L-20,-10" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />
              <path d="M20,-10 L30,0 M20,0 L30,-10" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />
            </>
          )}
          {eyes === 'heart' && (
            <>
              <path d="M-32,-8 Q-32,-15 -25,-15 Q-18,-15 -18,-8 Q-18,-2 -25,5 Q-32,-2 -32,-8" fill="#FF6B6B" stroke="black" strokeWidth="1" />
              <path d="M18,-8 Q18,-15 25,-15 Q32,-15 32,-8 Q32,-2 25,5 Q18,-2 18,-8" fill="#FF6B6B" stroke="black" strokeWidth="1" />
            </>
          )}
          {eyes === 'wink' && (
            <>
              <circle cx="-25" cy="-5" r="5" fill="black" />
              <path d="M20,0 Q25,-8 30,0" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />
            </>
          )}
          {eyes === 'cross-pop' && (
            <>
              <path d="M-30,-10 L-20,0 M-30,0 L-20,-10" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" />
              <path d="M20,-10 L30,0 M20,0 L30,-10" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" />
            </>
          )}
          {eyes === 'star' && (
            <>
               <path d="M-25,-15 L-22,-8 L-15,-7 L-20,0 L-18,7 L-25,2 L-32,7 L-30,0 L-35,-7 L-28,-8 Z" fill="#FFD93D" stroke="black" strokeWidth="1" />
               <path d="M25,-15 L28,-8 L35,-7 L30,0 L32,7 L25,2 L18,7 L20,0 L15,-7 L22,-8 Z" fill="#FFD93D" stroke="black" strokeWidth="1" />
            </>
          )}
        </g>

        {/* Blush */}
        {blush && (
          <>
            <circle cx="65" cy="125" r="6" fill="#FFB6B6" opacity="0.6" />
            <circle cx="135" cy="125" r="6" fill="#FFB6B6" opacity="0.6" />
          </>
        )}

        {/* Mouth */}
        <g transform="translate(100, 130)">
          {mouth === 'smile' && <path d="M-10,0 Q0,10 10,0" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />}
          {mouth === 'w' && <path d="M-10,0 Q-5,8 0,0 Q5,8 10,0" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />}
          {mouth === 'cat' && (
            <>
              <path d="M-8,0 Q-4,5 0,0" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
              <path d="M0,0 Q4,5 8,0" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
            </>
          )}
          {mouth === 'flat' && <line x1="-10" y1="5" x2="10" y2="5" stroke="black" strokeWidth="3" strokeLinecap="round" />}
          {mouth === 'surprised' && <circle cx="0" cy="5" r="4" fill="none" stroke="black" strokeWidth="2" />}
          {mouth === 'tongue' && (
            <>
              <path d="M-10,0 Q0,10 10,0" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />
              <path d="M-5,5 Q0,12 5,5" fill="#FF6B6B" stroke="black" strokeWidth="2" />
            </>
          )}
          {mouth === 'big-smile' && (
            <path d="M-15,0 Q0,20 15,0 Z" fill="white" stroke="black" strokeWidth="2" />
          )}
          {mouth === 'pout' && <path d="M-10,8 Q0,0 10,8" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />}
        </g>

        {/* Accessories */}
        {accessory === 'glasses' && (
          <g transform="translate(100, 110)">
            <circle cx="-25" cy="0" r="12" fill="none" stroke="black" strokeWidth="3" />
            <circle cx="25" cy="0" r="12" fill="none" stroke="black" strokeWidth="3" />
            <line x1="-13" y1="0" x2="13" y2="0" stroke="black" strokeWidth="3" />
            <line x1="-50" y1="0" x2="-37" y2="0" stroke="black" strokeWidth="3" />
            <line x1="37" y1="0" x2="50" y2="0" stroke="black" strokeWidth="3" />
          </g>
        )}
        {accessory === 'stella' && (
          <path d="M100,40 L108,55 L125,58 L112,70 L115,87 L100,78 L85,87 L88,70 L75,58 L92,55 Z" fill="#FFD93D" stroke="black" strokeWidth="2" />
        )}
        {accessory === 'halo' && (
          <ellipse cx="100" cy="50" rx="30" ry="10" fill="none" stroke="#FFD93D" strokeWidth="4" opacity="0.8" />
        )}
        {accessory === 'mustache' && (
          <path d="M85,135 Q100,125 115,135 Q100,145 85,135" fill="black" />
        )}
        {accessory === 'bow' && (
          <g transform="translate(140, 80) rotate(-20)">
            <path d="M-10,-5 L10,5 L10,-5 L-10,5 Z" fill="#FF6B6B" stroke="black" strokeWidth="2" />
            <circle cx="0" cy="0" r="4" fill="#FF6B6B" stroke="black" strokeWidth="2" />
          </g>
        )}
        {accessory === 'glasses-round' && (
          <g transform="translate(100, 110)">
            <circle cx="-25" cy="0" r="15" fill="rgba(255,255,255,0.2)" stroke="black" strokeWidth="2" />
            <circle cx="25" cy="0" r="15" fill="rgba(255,255,255,0.2)" stroke="black" strokeWidth="2" />
            <path d="M-10,0 L10,0" fill="none" stroke="black" strokeWidth="2" />
          </g>
        )}
      </svg>
    );
  };

  const downloadSvg = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'character.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(JSON.stringify(character, null, 2));
  };

  return (
    <div className="min-h-screen bg-[#FFF9E6] text-black font-sans selection:bg-[#FFD93D] p-0">
      <header className="h-20 bg-white border-b-4 border-black flex items-center justify-between px-8 z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FF6B6B] border-2 border-black rounded-xl rotate-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
            <Sparkles className="text-white" size={20} />
          </div>
          <h1 className="text-3xl font-black italic tracking-tight uppercase">Character.Maker</h1>
        </div>
        <div className="hidden md:flex gap-6 font-bold uppercase text-sm tracking-wider">
          <span className="text-[#FF6B6B] underline decoration-4 underline-offset-4 cursor-pointer">Editor</span>
          <span className="hover:text-[#4ECDC4] transition-colors cursor-pointer">Collezione</span>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        {/* Controls Sidebar */}
        <aside className="w-full lg:w-80 bg-white border-b-4 lg:border-b-0 lg:border-r-4 border-black p-6 flex flex-col gap-8 shrink-0 overflow-y-auto">
          {/* Head & Color */}
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3 block">Base & Colore</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {COLORS.map(c => (
                <button 
                  key={c}
                  onClick={() => setCharacter(prev => ({ ...prev, color: c }))}
                  className={`w-8 h-8 rounded-full border-2 border-black ${character.color === c ? 'ring-2 ring-black ring-offset-2' : ''}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {HEAD_SHAPES.map(h => (
                <button 
                  key={h}
                  onClick={() => setCharacter(prev => ({ ...prev, head: h }))}
                  className={`py-2 px-3 border-2 border-black rounded-xl font-bold text-xs uppercase tracking-tighter ${character.head === h ? 'bg-[#FFD93D] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-white'}`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          {/* Ears */}
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3 block">Orecchie</label>
            <div className="grid grid-cols-2 gap-2">
              {EARS.map(e => (
                <button 
                  key={e}
                  onClick={() => setCharacter(prev => ({ ...prev, ears: e }))}
                  className={`py-2 px-3 border-2 border-black rounded-xl font-bold text-xs uppercase tracking-tighter ${character.ears === e ? 'bg-[#4ECDC4] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-white'}`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Face Props */}
          <div className="space-y-6">
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3 block">Occhi</label>
              <div className="flex flex-wrap gap-2">
                {EYES.map(ey => (
                  <button 
                    key={ey}
                    onClick={() => setCharacter(prev => ({ ...prev, eyes: ey }))}
                    className={`p-2 border-2 border-black rounded-lg flex flex-col items-center gap-1 min-w-[50px] ${character.eyes === ey ? 'bg-[#FF6B6B] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-white'}`}
                  >
                    <Eye size={18} />
                    <span className="text-[8px] uppercase font-bold">{ey}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3 block">Bocca</label>
              <div className="flex flex-wrap gap-2">
                {MOUTHS.map(m => (
                  <button 
                    key={m}
                    onClick={() => setCharacter(prev => ({ ...prev, mouth: m }))}
                    className={`p-2 border-2 border-black rounded-lg flex flex-col items-center gap-1 min-w-[50px] ${character.mouth === m ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-white'}`}
                  >
                    <Smile size={18} />
                    <span className="text-[8px] uppercase font-bold">{m}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Background Card */}
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3 block">Sfondo Card</label>
            <div className="flex flex-wrap gap-2">
              {BG_COLORS.map(c => (
                <button 
                  key={c}
                  onClick={() => setCharacter(prev => ({ ...prev, cardBg: c }))}
                  className={`w-8 h-8 rounded-lg border-2 border-black ${character.cardBg === c ? 'ring-2 ring-black ring-offset-2' : ''}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Accessories */}
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3 block">Accessori</label>
            <div className="grid grid-cols-2 gap-2">
              {ACCESSORIES.map(acc => (
                <button 
                  key={acc}
                  onClick={() => setCharacter(prev => ({ ...prev, accessory: acc }))}
                  className={`py-2 px-3 border-2 border-black rounded-xl font-bold text-xs uppercase tracking-tighter ${character.accessory === acc ? 'bg-[#FFD93D] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-white'}`}
                >
                  {acc}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={randomize}
            className="w-full mt-auto py-4 bg-[#FF6B6B] border-4 border-black rounded-2xl text-white font-black text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw size={20} />
            CASUALE
          </button>
        </aside>

        {/* Viewport Area */}
        <section className="flex-1 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px] p-6 lg:p-12 flex flex-col items-center justify-center relative">
          
          {/* Badge */}
          <div className="absolute top-10 left-10 bg-[#FFD93D] border-4 border-black px-6 py-2 rotate-[-4deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10 hidden sm:block">
            <span className="text-2xl font-black italic uppercase">Bello!</span>
          </div>

          {/* Character Card */}
          <motion.div 
            layout
            className="w-full max-w-[450px] bg-white border-4 border-black rounded-[40px] shadow-[12px_12px_0px_0px_rgba(78,205,196,1)] flex flex-col items-center p-8 relative"
          >
            <div 
              style={{ backgroundColor: character.cardBg }}
              className="w-full aspect-square rounded-[30px] border-4 border-black mb-8 flex items-center justify-center p-4 transition-colors"
            >
              <CharacterPreview />
            </div>

            <div className="text-center w-full">
              <h2 className="text-3xl font-black uppercase mb-2">Mio Personaggio</h2>
              <div className="flex gap-2 justify-center mt-6">
                <button 
                  onClick={downloadSvg}
                  className="w-14 h-14 bg-white border-4 border-black rounded-2xl flex items-center justify-center hover:bg-[#FF6B6B] hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                  title="Scarica SVG"
                >
                  <Download size={24} />
                </button>
                <button 
                  onClick={() => setCharacter(prev => ({ ...prev, blush: !prev.blush }))}
                  className={`w-14 h-14 border-4 border-black rounded-2xl flex items-center justify-center transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 ${character.blush ? 'bg-[#FFB6B6]' : 'bg-white'}`}
                  title="Toggle Blush"
                >
                  <Palette size={24} />
                </button>
                <button 
                  onClick={() => setShowCode(!showCode)}
                  className={`w-14 h-14 border-4 border-black rounded-2xl flex items-center justify-center transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 ${showCode ? 'bg-[#4ECDC4]' : 'bg-white'}`}
                  title="Visualizza Codice"
                >
                  <LayoutGrid size={24} />
                </button>
              </div>

              <AnimatePresence>
                {showCode && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-6 w-full overflow-hidden"
                  >
                    <div className="bg-gray-900 text-green-400 p-4 rounded-2xl text-left text-xs font-mono relative border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Editor JSON</span>
                        <div className="flex gap-2">
                          <button 
                            onClick={copyCode}
                            className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-[10px] uppercase font-bold"
                          >
                            Copy
                          </button>
                          <button 
                            onClick={applyCode}
                            className="bg-[#4ECDC4] hover:bg-[#3dbbb2] text-black px-2 py-1 rounded text-[10px] uppercase font-bold"
                          >
                            Applica
                          </button>
                        </div>
                      </div>
                      <textarea 
                        value={codeText}
                        onChange={handleCodeChange}
                        className="w-full h-40 bg-transparent border-none outline-none resize-none text-green-400 font-mono"
                        spellCheck={false}
                      />
                      {jsonError && (
                        <div className="text-red-400 mt-2 text-[10px] font-bold">{jsonError}</div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Footer Hints */}
          <div className="mt-12 flex gap-4 opacity-50">
            <PawPrint />
            <Ghost />
            <Zap />
            <User />
          </div>
        </section>
      </div>
    </div>
  );
}
