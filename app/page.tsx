"use client";
import { useState, useRef, useEffect } from "react";
import { 
  demoTracks, 
  accompanimentTracks, 
  partsTracks, 
  type Track, 
  type PartTrack, 
  type PartLink, 
  type CategoryKey 
} from "../data/tracks";

export default function Home() {
  const [activeTab, setActiveTab] = useState<CategoryKey>("demo");
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const [isProtected, setIsProtected] = useState(false);

  useEffect(() => {
    setPlayingUrl(null);
  }, [activeTab]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsProtected(true);
      } else {
        setIsProtected(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "PrintScreen" ||
        (e.ctrlKey && e.shiftKey && (e.key === "S" || e.key === "s" || e.key === "I" || e.key === "i" || e.key === "C" || e.key === "c")) ||
        (e.ctrlKey && (e.key === "p" || e.key === "P" || e.key === "s" || e.key === "S"))
      ) {
        e.preventDefault();
        setIsProtected(true);
        setTimeout(() => setIsProtected(false), 2500);
      }
    };

    const handleContextClick = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextClick);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextClick);
    };
  }, []);

  const categories: { key: CategoryKey; label: string; icon: string }[] = [
    { key: "demo", label: "Demo Tracks", icon: "🎵" },
    { key: "accompaniment", label: "Accompaniment", icon: "🎹" },
    { key: "parts", label: "Choral Parts", icon: "🎼" },
    { key: "pdf", label: "Music Sheet", icon: "📄" },
  ];

  return (
    <>
      <main style={{ ...styles.main, filter: isProtected ? "blur(20px)" : "none", transition: "filter 0.2s ease" }}>
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Great+Vibes&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

          html, body {
            height: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
            -webkit-user-select: none;
            user-select: none;
            background-color: #030712;
          }

          .poster-title-top {
            font-family: 'Cinzel', serif;
            letter-spacing: 0.12em;
            font-weight: 600;
          }

          .poster-title-script {
            font-family: 'Great Vibes', cursive;
            text-transform: none !important;
            font-weight: 400;
            color: #fef08a;
            font-size: 1.35em;
            margin-left: 6px;
            text-shadow: 0 0 25px rgba(250, 204, 21, 0.4);
          }

          .celestial-scroll::-webkit-scrollbar {
            width: 5px;
          }
          .celestial-scroll::-webkit-scrollbar-track {
            background: rgba(15, 23, 42, 0.4);
            border-radius: 10px;
          }
          .celestial-scroll::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #38bdf8, #818cf8);
            border-radius: 10px;
          }
          .celestial-scroll::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #7dd3fc, #a5b4fc);
          }

          @keyframes celestialFade {
            0% { opacity: 0; transform: translateY(12px) scale(0.99); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }

          .celestial-anim {
            opacity: 0;
            animation: celestialFade 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          @keyframes beamGlow {
            0%, 100% { opacity: 0.7; transform: translateX(-50%) scale(1); }
            50% { opacity: 1; transform: translateX(-50%) scale(1.05); }
          }

          .divine-beam {
            animation: beamGlow 6s ease-in-out infinite;
          }

          @media screen and (max-width: 640px) {
            .header-card-mobile {
              flex-direction: column !important;
              align-items: center !important;
              text-align: center !important;
              padding: 14px !important;
              gap: 12px !important;
            }
            .header-info-mobile {
              align-items: center !important;
              text-align: center !important;
            }
            .description-mobile {
              text-align: justify !important;
              text-justify: inter-word !important;
            }
          }
        `}} />

        <div style={styles.divineBeam} />
        <div style={styles.glowNebula} />
        <div style={styles.glowBase} />

        <div style={styles.container}>
          <header className="header-card-mobile" style={styles.headerCard}>
            <div style={styles.coverWrapper}>
              <div style={styles.badge}>CANTATA</div>
              <img
                src="/cover.jpg"
                alt="Invitation to a Miracle"
                style={styles.coverImage}
                draggable="false"
              />
            </div>

            <div className="header-info-mobile" style={styles.headerInfo}>
              <span style={styles.subtitle}>JOSEPH M. MARTIN</span>
              <h1 style={styles.title}>
                <span className="poster-title-top">Invitation To A</span>
                <span className="poster-title-script">Miracle</span>
              </h1>
              <p className="description-mobile" style={styles.description}>
                Experience the wonder, hope, and joy of the Advent season. Featuring Celtic-inspired melodies and deeply moving choral harmonies, this musical celebration is a passionate call to reflect on the divine mystery and miraculous birth of Christ.
              </p>
            </div>
          </header>

          <nav style={styles.tabContainer}>
            {categories.map((cat) => {
              const isActive = activeTab === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key)}
                  style={{
                    ...styles.tabButton,
                    ...(isActive ? styles.tabActive : {}),
                  }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </nav>

          <section className="celestial-scroll" style={styles.contentSection}>
            {activeTab === "demo" && (
              <TrackList tracks={demoTracks} playingUrl={playingUrl} setPlayingUrl={setPlayingUrl} />
            )}
            {activeTab === "accompaniment" && (
              <TrackList tracks={accompanimentTracks} playingUrl={playingUrl} setPlayingUrl={setPlayingUrl} />
            )}
            {activeTab === "parts" && (
              <PartsList tracks={partsTracks} playingUrl={playingUrl} setPlayingUrl={setPlayingUrl} />
            )}
            {activeTab === "pdf" && (
              <div className="celestial-anim" style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={styles.iframeWrapper}>
                  <iframe
                    src="https://drive.google.com/file/d/1lJ-flEO12RYjixztK1LWbSTRb9UVcjGl/preview?usp=drivesdk"
                    style={styles.iframeStyle}
                    title="Invitation To A Miracle Sheet Music"
                    allow="autoplay"
                  />
                </div>
                <div style={styles.pdfProtectionNotice}>
                  <span>🔒 Embedded View: Official sheet music score loaded securely.</span>
                </div>
              </div>
            )}
          </section>

          <footer style={styles.footer}>
            <p style={styles.footerText}>
              Rose of Sharon FBC
            </p>
          </footer>
        </div>
      </main>

      {isProtected && (
        <div style={styles.screenshotShieldModal}>
          <div style={styles.shieldBox}>
            <span style={{ fontSize: "2rem", display: "block", marginBottom: "8px" }}>🛡️</span>
            <h3 style={{ margin: "0 0 6px 0", color: "#f8fafc", fontSize: "1.2rem" }}>Protected Content</h3>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.88rem" }}>
              Screenshots and screen capturing are restricted to protect copyrighted ministry materials.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function TrackList({ 
  tracks, 
  playingUrl, 
  setPlayingUrl 
}: { 
  tracks: Track[]; 
  playingUrl: string | null; 
  setPlayingUrl: (url: string | null) => void;
}) {
  return (
    <div style={styles.listContainer}>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {tracks.map((track, index) => (
          <div 
            key={track.id} 
            className="celestial-anim"
            style={{ ...styles.trackRow, animationDelay: `${index * 0.05}s` }}
          >
            <div style={styles.trackHeader}>
              <div style={styles.trackIcon}>🎧</div>
              <div style={styles.trackTitle}>{track.title}</div>
            </div>
            <AudioPlayer 
              url={track.url} 
              playingUrl={playingUrl} 
              setPlayingUrl={setPlayingUrl} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function PartsList({ 
  tracks, 
  playingUrl, 
  setPlayingUrl 
}: { 
  tracks: PartTrack[]; 
  playingUrl: string | null; 
  setPlayingUrl: (url: string | null) => void;
}) {
  return (
    <div style={styles.listContainer}>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {tracks.map((track, index) => (
          <PartRow 
            key={track.id} 
            track={track} 
            index={index}
            playingUrl={playingUrl} 
            setPlayingUrl={setPlayingUrl} 
          />
        ))}
      </div>
    </div>
  );
}

function PartRow({ 
  track, 
  index,
  playingUrl, 
  setPlayingUrl 
}: { 
  track: PartTrack; 
  index: number;
  playingUrl: string | null; 
  setPlayingUrl: (url: string | null) => void;
}) {
  const [activePart, setActivePart] = useState<PartLink | null>(null);

  const togglePart = (link: PartLink) => {
    if (activePart?.url === link.url) {
      setActivePart(null);
    } else {
      setActivePart(link);
    }
  };

  const hasParts = track.links && track.links.length > 0;

  return (
    <div className="celestial-anim" style={{ ...styles.partRow, animationDelay: `${index * 0.05}s` }}>
      <div style={styles.trackHeader}>
        <div style={styles.trackIcon}>🎼</div>
        <div style={styles.trackTitle}>{track.title}</div>
      </div>
      
      {hasParts ? (
        <>
          <div style={styles.partsGrid}>
            {track.links.map((link, linkIndex) => {
              const isActive = activePart?.url === link.url;
              return (
                <button
                  key={linkIndex}
                  onClick={() => togglePart(link)}
                  style={{
                    ...styles.partButton,
                    ...(isActive ? styles.partButtonActive : {}),
                  }}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {activePart && (
            <div className="celestial-anim" style={{ ...styles.activePartContainer, animationDelay: "0s" }}>
              <div style={styles.activePartLabel}>
                <span style={{ color: "#38bdf8" }}>▶</span> Playing: {activePart.label}
              </div>
              <AudioPlayer 
                url={activePart.url} 
                autoPlay={true} 
                playingUrl={playingUrl} 
                setPlayingUrl={setPlayingUrl} 
              />
            </div>
          )}
        </>
      ) : (
        <div style={{ ...styles.customPlayer, justifyContent: "center", marginTop: "6px" }}>
          <span style={{ color: "#f87171", fontSize: "0.85rem", fontWeight: 500, textAlign: "center" }}>
            ⚠️ The audio file is not yet available. It will be updated once released.
          </span>
        </div>
      )}
    </div>
  );
}

function AudioPlayer({ 
  url, 
  autoPlay = false, 
  playingUrl, 
  setPlayingUrl 
}: { 
  url: string; 
  autoPlay?: boolean;
  playingUrl: string | null;
  setPlayingUrl: (url: string | null) => void;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (playingUrl && playingUrl !== url && isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    }
  }, [playingUrl, url, isPlaying]);

  useEffect(() => {
    setHasError(false);
    if (!url) {
      setHasError(true);
      return;
    }
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      if (autoPlay) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setPlayingUrl(url);
          })
          .catch(() => setIsPlaying(false));
      } else {
        setIsPlaying(false);
      }
    }
  }, [url, autoPlay, setPlayingUrl]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  const togglePlay = () => {
    if (audioRef.current && !hasError) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        setPlayingUrl(null);
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setPlayingUrl(url);
          })
          .catch(() => setHasError(true));
      }
    }
  };

  const handleSkip = (seconds: number) => {
    if (audioRef.current && !hasError) {
      audioRef.current.currentTime += seconds;
    }
  };

  if (hasError) {
    return (
      <div style={{ ...styles.customPlayer, justifyContent: "center" }}>
        <span style={{ color: "#f87171", fontSize: "0.85rem", fontWeight: 500, textAlign: "center" }}>
          ⚠️ The audio file is not yet available. It will be updated once released.
        </span>
      </div>
    );
  }

  return (
    <div style={styles.customPlayer}>
      <audio
        ref={audioRef}
        src={url}
        controlsList="nodownload"
        {...({ disablePictureInPicture: true } as any)}
        onContextMenu={(e) => e.preventDefault()}
        onError={() => setHasError(true)}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={() => {
          setIsPlaying(false);
          if (playingUrl === url) setPlayingUrl(null);
        }}
      />
      <div style={styles.playerControls}>
        <button onClick={() => handleSkip(-5)} style={styles.controlBtn}>↺ 5s</button>
        <button onClick={togglePlay} style={styles.playBtn}>{isPlaying ? "⏸" : "▶"}</button>
        <button onClick={() => handleSkip(5)} style={styles.controlBtn}>↻ 5s</button>
      </div>
      <div style={styles.progressContainer}>
        <span style={styles.timeText}>{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={(e) => {
            const newTime = Number(e.target.value);
            setCurrentTime(newTime);
            if (audioRef.current) audioRef.current.currentTime = newTime;
          }}
          style={styles.progressBar}
        />
        <span style={styles.timeText}>{formatTime(duration)}</span>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    height: "100dvh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#030712",
    backgroundImage: "radial-gradient(circle at 50% 15%, #0f172a 0%, #030712 75%)",
    color: "#f8fafc",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    padding: "clamp(12px, 2vh, 20px) clamp(16px, 4vw, 24px)",
    boxSizing: "border-box",
  },
  divineBeam: {
    position: "absolute",
    top: "-30px",
    left: "50%",
    width: "700px",
    height: "350px",
    background: "radial-gradient(ellipse at top, rgba(253, 224, 71, 0.14) 0%, rgba(56, 189, 248, 0.08) 40%, transparent 75%)",
    pointerEvents: "none",
    filter: "blur(20px)",
  },
  glowNebula: {
    position: "absolute",
    top: "25%",
    left: "15%",
    width: "450px",
    height: "450px",
    background: "radial-gradient(circle, rgba(30, 58, 138, 0.25) 0%, transparent 70%)",
    pointerEvents: "none",
    filter: "blur(50px)",
  },
  glowBase: {
    position: "absolute",
    bottom: "-100px",
    right: "10%",
    width: "500px",
    height: "500px",
    background: "radial-gradient(circle, rgba(88, 28, 135, 0.18) 0%, transparent 70%)",
    pointerEvents: "none",
    filter: "blur(60px)",
  },
  container: {
    maxWidth: "1100px",
    width: "100%",
    height: "100%",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  headerCard: {
    display: "flex",
    flexShrink: 0,
    gap: "clamp(16px, 4vw, 36px)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15, 23, 42, 0.75)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgba(56, 189, 248, 0.2)",
    borderRadius: "20px",
    padding: "clamp(10px, 2vh, 20px) clamp(16px, 4vw, 28px)",
    marginBottom: "10px",
    flexWrap: "wrap",
    boxSizing: "border-box",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.1)",
  },
  coverWrapper: {
    position: "relative",
    flexShrink: 0,
    width: "clamp(75px, 14vh, 120px)",
  },
  badge: {
    position: "absolute",
    top: "6px",
    left: "6px",
    backgroundColor: "rgba(99, 102, 241, 0.9)",
    backdropFilter: "blur(6px)",
    color: "#e0e7ff",
    fontSize: "0.6rem",
    fontWeight: 700,
    padding: "2px 6px",
    borderRadius: "20px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    zIndex: 2,
    boxShadow: "0 4px 12px rgba(99, 102, 241, 0.4)",
  },
  coverImage: {
    width: "100%",
    height: "auto",
    display: "block",
    borderRadius: "10px",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)",
  },
  headerInfo: {
    flex: "1 1 280px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  subtitle: {
    color: "#38bdf8",
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    display: "block",
    marginBottom: "2px",
  },
  title: {
    fontSize: "clamp(1.2rem, 3vh, 2.2rem)",
    margin: "0 0 4px 0",
    fontWeight: 700,
    color: "#ffffff",
    lineHeight: 1.15,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
  },
  description: {
    margin: 0,
    color: "#94a3b8",
    fontSize: "clamp(0.8rem, 1.6vh, 0.9rem)",
    lineHeight: 1.4,
    width: "100%",
    textAlign: "justify",
    textJustify: "inter-word",
  },
  tabContainer: {
    display: "flex",
    flexShrink: 0,
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "10px",
  },
  tabButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "7px 14px",
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: "30px",
    color: "#94a3b8",
    fontSize: "0.85rem",
    fontWeight: 500,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  },
  tabActive: {
    backgroundColor: "#0284c7",
    borderColor: "#38bdf8",
    color: "#ffffff",
    boxShadow: "0 0 25px rgba(56, 189, 248, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.3)",
    transform: "translateY(-1px)",
  },
  contentSection: {
    flex: 1,
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgba(56, 189, 248, 0.15)",
    borderRadius: "20px",
    padding: "16px 24px",
    boxSizing: "border-box",
    boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.05)",
  },
  iframeWrapper: {
    position: "relative",
    width: "100%",
    flex: 1,
    minHeight: "100%",
    borderRadius: "14px",
    overflow: "hidden",
    border: "1px solid rgba(56, 189, 248, 0.2)",
    backgroundColor: "#0b0f19",
  },
  iframeStyle: {
    width: "100%",
    height: "100%",
    minHeight: "100%",
    border: "none",
  },
  pdfProtectionNotice: {
    marginTop: "8px",
    textAlign: "center",
    color: "#94a3b8",
    fontSize: "0.8rem",
    letterSpacing: "0.03em",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "4px",
    paddingBottom: "4px",
  },
  trackRow: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "12px 16px",
    backgroundColor: "rgba(30, 41, 59, 0.55)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: "14px",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  trackHeader: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    width: "100%",
    flex: 1,
  },
  trackIcon: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    backgroundColor: "rgba(56, 189, 248, 0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    flexShrink: 0,
    boxShadow: "0 0 10px rgba(56, 189, 248, 0.2)",
  },
  trackTitle: {
    fontSize: "1rem",
    fontWeight: 500,
    color: "#f8fafc",
    lineHeight: 1.4,
    flex: 1,
  },
  partRow: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "12px 16px",
    backgroundColor: "rgba(30, 41, 59, 0.55)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: "14px",
    boxSizing: "border-box",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  partsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(105px, 1fr))",
    gap: "8px",
    width: "100%",
  },
  partButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#94a3b8",
    fontSize: "0.82rem",
    fontWeight: 500,
    padding: "7px 8px",
    borderRadius: "8px",
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.08)",
    transition: "all 0.2s ease",
    textAlign: "center",
    boxSizing: "border-box",
    cursor: "pointer",
  },
  partButtonActive: {
    backgroundColor: "#0284c7",
    borderColor: "#38bdf8",
    color: "#ffffff",
    boxShadow: "0 0 15px rgba(56, 189, 248, 0.35)",
  },
  activePartContainer: {
    marginTop: "2px",
    paddingTop: "10px",
    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  activePartLabel: {
    fontSize: "0.85rem",
    color: "#e2e8f0",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  customPlayer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "14px",
    width: "100%",
    backgroundColor: "rgba(15, 23, 42, 0.7)",
    padding: "8px 14px",
    borderRadius: "12px",
    boxSizing: "border-box",
    border: "1px solid rgba(255, 255, 255, 0.04)",
  },
  playerControls: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  controlBtn: {
    background: "none",
    border: "none",
    color: "#94a3b8",
    fontSize: "0.85rem",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "color 0.2s ease",
  },
  playBtn: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    backgroundColor: "#0284c7",
    color: "#fff",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0 0 15px rgba(2, 132, 199, 0.5)",
    transition: "transform 0.15s ease",
  },
  progressContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flex: "1 1 180px",
  },
  progressBar: {
    flex: 1,
    minWidth: "70px",
    cursor: "pointer",
    accentColor: "#38bdf8",
    height: "4px",
  },
  timeText: {
    fontSize: "0.78rem",
    color: "#94a3b8",
    minWidth: "32px",
    textAlign: "center",
    fontVariantNumeric: "tabular-nums",
  },
  emptyState: {
    textAlign: "center",
    padding: "40px 20px",
  },
  footer: {
    flexShrink: 0,
    marginTop: "8px",
    paddingTop: "4px",
    paddingBottom: "2px",
    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
    textAlign: "center",
  },
  footerText: {
    color: "#64748b",
    fontSize: "0.8rem",
    margin: 0,
    fontWeight: 400,
    letterSpacing: "0.05em",
  },
  screenshotShieldModal: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(3, 7, 18, 0.95)",
    backdropFilter: "blur(25px)",
    WebkitBackdropFilter: "blur(25px)",
    zIndex: 99999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  shieldBox: {
    backgroundColor: "rgba(15, 23, 42, 0.9)",
    border: "1px solid rgba(56, 189, 248, 0.3)",
    borderRadius: "20px",
    padding: "28px",
    textAlign: "center",
    maxWidth: "360px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
  },
};