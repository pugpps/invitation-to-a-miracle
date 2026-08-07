"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

import {
  demoTracks,
  accompanimentTracks,
  partsTracks,
  type Track,
  type PartTrack,
  type PartLink,
  type CategoryKey,
} from "../data/tracks";

export default function Home() {
  const [activeTab, setActiveTab] =
    useState<CategoryKey>("demo");

  const [playingUrl, setPlayingUrl] =
    useState<string | null>(null);

  const [isProtected, setIsProtected] =
    useState(false);

  const [isMobile, setIsMobile] =
    useState(false);

  /*
   * IMPORTANT:
   * Keep this function stable between renders.
   *
   * Previously, setPlayingUrl was passed directly to every
   * AudioPlayer. Every Home render created a new function,
   * which could cause the AudioPlayer effects to run again.
   */
  const handleSetPlayingUrl = useCallback(
    (url: string | null) => {
      setPlayingUrl(url);
    },
    []
  );

  /*
   * Detect mobile / touch devices.
   */
  useEffect(() => {
    const widthMql =
      window.matchMedia("(max-width: 768px)");

    const pointerMql =
      window.matchMedia("(pointer: coarse)");

    const update = () => {
      setIsMobile(
        widthMql.matches || pointerMql.matches
      );
    };

    update();

    widthMql.addEventListener(
      "change",
      update
    );

    pointerMql.addEventListener(
      "change",
      update
    );

    return () => {
      widthMql.removeEventListener(
        "change",
        update
      );

      pointerMql.removeEventListener(
        "change",
        update
      );
    };
  }, []);

  /*
   * Stop audio whenever the user changes category.
   */
  useEffect(() => {
    setPlayingUrl(null);
  }, [activeTab]);

  /*
   * Protection / screenshot detection.
   */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsProtected(true);
      } else {
        setIsProtected(false);
      }
    };

    const handleKeyDown = (
      e: KeyboardEvent
    ) => {
      if (
        e.key === "PrintScreen" ||
        (e.ctrlKey &&
          e.shiftKey &&
          ["S", "s", "I", "i", "C", "c"].includes(
            e.key
          )) ||
        (e.ctrlKey &&
          ["p", "P", "s", "S"].includes(e.key))
      ) {
        e.preventDefault();

        setIsProtected(true);

        setTimeout(() => {
          setIsProtected(false);
        }, 2500);
      }
    };

    const handleContextClick = (
      e: MouseEvent
    ) => {
      e.preventDefault();
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    document.addEventListener(
      "contextmenu",
      handleContextClick
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.removeEventListener(
        "contextmenu",
        handleContextClick
      );
    };
  }, []);

  const categories: {
    key: CategoryKey;
    label: string;
    icon: string;
  }[] = [
    {
      key: "demo",
      label: "Demo Tracks",
      icon: "🎵",
    },
    {
      key: "accompaniment",
      label: "Accompaniment",
      icon: "🎹",
    },
    {
      key: "parts",
      label: "Choral Parts",
      icon: "🎼",
    },
    {
      key: "pdf",
      label: "Music Sheet",
      icon: "📄",
    },
  ];

  return (
    <>
      <main
        style={{
          ...styles.main,
          filter: isProtected
            ? "blur(20px)"
            : "none",
          transition: "filter 0.2s ease",
        }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Great+Vibes&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

              html,
              body {
                height: 100%;
                margin: 0;
                padding: 0;
                overflow: hidden;
                -webkit-user-select: none;
                user-select: none;
                background-color: #030712;
                -webkit-tap-highlight-color: transparent !important;
              }

              *,
              *:before,
              *:after {
                -webkit-tap-highlight-color: transparent !important;
                -webkit-touch-callout: none;
                box-sizing: border-box;
              }

              button,
              input,
              a,
              div {
                -webkit-tap-highlight-color: transparent !important;
              }

              button:focus,
              button:active,
              button:hover,
              input:focus,
              input:active {
                outline: none !important;
              }

              button {
                touch-action: manipulation;
              }

              /*
               * IMPORTANT FOR MOBILE SEEKING
               */
              input[type="range"] {
                touch-action: pan-x;
                -webkit-user-select: none;
                user-select: none;
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

              @keyframes celestialFade {
                0% {
                  opacity: 0;
                  transform: translateY(12px) scale(0.99);
                }

                100% {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }

              .celestial-anim {
                opacity: 0;
                animation: celestialFade 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              }

              @keyframes beamGlow {
                0%,
                100% {
                  opacity: 0.7;
                  transform: translateX(-50%) scale(1);
                }

                50% {
                  opacity: 1;
                  transform: translateX(-50%) scale(1.05);
                }
              }

              .divine-beam {
                animation: beamGlow 6s ease-in-out infinite;
              }

              @media screen and (max-width: 768px) {
                html,
                body {
                  height: auto !important;
                  min-height: 0 !important;
                  overflow-x: hidden !important;
                  overflow-y: auto !important;
                  -webkit-overflow-scrolling: touch;
                }

                main {
                  position: relative !important;
                  top: auto !important;
                  left: auto !important;
                  right: auto !important;
                  bottom: auto !important;
                  height: auto !important;
                  min-height: 0 !important;
                  max-height: none !important;
                  overflow: visible !important;
                  padding: 8px 10px !important;
                }

                .mobile-container-override {
                  height: auto !important;
                  min-height: 0 !important;
                  max-height: none !important;
                  overflow: visible !important;
                  flex: none !important;
                }

                .mobile-content-override {
                  height: auto !important;
                  min-height: 0 !important;
                  max-height: none !important;
                  overflow: visible !important;
                  flex: none !important;
                }

                .header-card-mobile {
                  flex-direction: row !important;
                  align-items: center !important;
                  text-align: left !important;
                  padding: 10px 12px !important;
                  gap: 12px !important;
                  margin-bottom: 8px !important;
                }

                .header-info-mobile {
                  align-items: flex-start !important;
                  text-align: left !important;
                }

                .header-cover-img {
                  width: 75px !important;
                }

                .description-mobile {
                  display: block !important;
                  font-size: 0.72rem !important;
                  line-height: 1.25 !important;
                }

                .poster-title-top {
                  letter-spacing: 0.02em !important;
                }

                .poster-title-script {
                  font-size: 1.15em !important;
                  margin-left: 3px !important;
                }

                .celestial-scroll {
                  overflow: visible !important;
                }

                .footer-mobile {
                  margin-bottom: 0 !important;
                  padding-bottom: 0 !important;
                }

                .mobile-player-controls {
                  gap: 22px !important;
                }

                .mobile-control-button {
                  min-width: 56px !important;
                  min-height: 44px !important;
                  padding: 8px 10px !important;
                }

                .mobile-play-button {
                  width: 52px !important;
                  height: 52px !important;
                  min-width: 52px !important;
                  min-height: 52px !important;
                }

                .mobile-progress {
                  height: 8px !important;
                  touch-action: pan-x !important;
                }

                .mobile-progress::-webkit-slider-thumb {
                  width: 20px !important;
                  height: 20px !important;
                }

                .mobile-progress::-moz-range-thumb {
                  width: 20px !important;
                  height: 20px !important;
                }
              }
            `,
          }}
        />

        <div style={styles.divineBeam} />
        <div style={styles.glowNebula} />
        <div style={styles.glowBase} />

        <div
          className="mobile-container-override"
          style={{
            ...styles.container,
            ...(isMobile
              ? {
                  height: "auto",
                  minHeight: 0,
                  overflow: "visible",
                }
              : {}),
          }}
        >
          <header
            className="header-card-mobile"
            style={styles.headerCard}
          >
            <div style={styles.coverWrapper}>
              <div style={styles.badge}>
                CANTATA
              </div>

              <img
                src="/cover.jpg"
                alt="Invitation to a Miracle"
                className="header-cover-img"
                style={styles.coverImage}
                draggable="false"
              />
            </div>

            <div
              className="header-info-mobile"
              style={styles.headerInfo}
            >
              <span style={styles.subtitle}>
                JOSEPH M. MARTIN
              </span>

              <h1 style={styles.title}>
                <span className="poster-title-top">
                  Invitation To A
                </span>

                <span className="poster-title-script">
                  Miracle
                </span>
              </h1>

              <p
                className="description-mobile"
                style={styles.description}
              >
                Experience the wonder, hope, and joy
                of the Advent season. Featuring
                Celtic-inspired melodies and deeply
                moving choral harmonies, this musical
                celebration is a passionate call to
                reflect on the divine mystery and
                miraculous birth of Christ.
              </p>
            </div>
          </header>

          <nav style={styles.tabContainer}>
            {categories.map((cat) => {
              const isActive =
                activeTab === cat.key;

              return (
                <button
                  type="button"
                  key={cat.key}
                  onClick={() =>
                    setActiveTab(cat.key)
                  }
                  style={{
                    ...styles.tabButton,
                    ...(isActive
                      ? styles.tabActive
                      : {}),
                  }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </nav>

          <section
            className="celestial-scroll mobile-content-override"
            style={{
              ...styles.contentSection,
              ...(isMobile
                ? {
                    flex: "none",
                    height: "auto",
                    minHeight: 0,
                    maxHeight: "none",
                    overflow: "visible",
                  }
                : {}),
            }}
          >
            {activeTab === "demo" && (
              <TrackList
                tracks={demoTracks}
                playingUrl={playingUrl}
                setPlayingUrl={
                  handleSetPlayingUrl
                }
                isMobile={isMobile}
              />
            )}

            {activeTab === "accompaniment" && (
              <TrackList
                tracks={accompanimentTracks}
                playingUrl={playingUrl}
                setPlayingUrl={
                  handleSetPlayingUrl
                }
                isMobile={isMobile}
              />
            )}

            {activeTab === "parts" && (
              <PartsList
                tracks={partsTracks}
                playingUrl={playingUrl}
                setPlayingUrl={
                  handleSetPlayingUrl
                }
                isMobile={isMobile}
              />
            )}

            {activeTab === "pdf" && (
              <div
                className="celestial-anim"
                style={{
                  width: "100%",
                  height: isMobile
                    ? "70vh"
                    : "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={styles.iframeWrapper}
                >
                  <iframe
                    src="https://drive.google.com/file/d/1lJ-flEO12RYjixztK1LWbSTRb9UVcjGl/preview?usp=drivesdk"
                    style={styles.iframeStyle}
                    title="Invitation To A Miracle Sheet Music"
                    allow="autoplay"
                  />
                </div>

                <div
                  style={
                    styles.pdfProtectionNotice
                  }
                >
                  <span>
                    🔒 Embedded View: Official sheet
                    music score loaded securely.
                  </span>
                </div>
              </div>
            )}
          </section>

          <footer
            className="footer-mobile"
            style={styles.footer}
          >
            <p style={styles.footerText}>
              Rose of Sharon FBC
            </p>
          </footer>
        </div>
      </main>

      {isProtected && (
        <div
          style={
            styles.screenshotShieldModal
          }
        >
          <div style={styles.shieldBox}>
            <span
              style={{
                fontSize: "2rem",
                display: "block",
                marginBottom: "8px",
              }}
            >
              🛡️
            </span>

            <h3
              style={{
                margin: "0 0 6px 0",
                color: "#f8fafc",
                fontSize: "1.2rem",
              }}
            >
              Protected Content
            </h3>

            <p
              style={{
                margin: 0,
                color: "#94a3b8",
                fontSize: "0.88rem",
              }}
            >
              Screenshots and screen capturing are
              restricted to protect copyrighted
              ministry materials.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

/* =========================================================
   TRACK LIST
========================================================= */

function TrackList({
  tracks,
  playingUrl,
  setPlayingUrl,
  isMobile,
}: {
  tracks: Track[];
  playingUrl: string | null;
  setPlayingUrl: (url: string | null) => void;
  isMobile: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {tracks.map((track, index) => (
        <div
          key={track.id}
          className="celestial-anim"
          style={{
            ...styles.trackRow,
            animationDelay: `${index * 0.05}s`,
          }}
        >
          <div style={styles.trackHeader}>
            <div style={styles.trackIcon}>
              🎧
            </div>

            <div style={styles.trackTitle}>
              {track.title}
            </div>
          </div>

          <AudioPlayer
            url={track.url}
            playingUrl={playingUrl}
            setPlayingUrl={setPlayingUrl}
            isMobile={isMobile}
          />
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   CHORAL PARTS LIST
========================================================= */

function PartsList({
  tracks,
  playingUrl,
  setPlayingUrl,
  isMobile,
}: {
  tracks: PartTrack[];
  playingUrl: string | null;
  setPlayingUrl: (url: string | null) => void;
  isMobile: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {tracks.map((track, index) => (
        <PartRow
          key={track.id}
          track={track}
          index={index}
          playingUrl={playingUrl}
          setPlayingUrl={setPlayingUrl}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
}

/* =========================================================
   INDIVIDUAL CHORAL PART
========================================================= */

function PartRow({
  track,
  index,
  playingUrl,
  setPlayingUrl,
  isMobile,
}: {
  track: PartTrack;
  index: number;
  playingUrl: string | null;
  setPlayingUrl: (url: string | null) => void;
  isMobile: boolean;
}) {
  const [activePart, setActivePart] =
    useState<PartLink | null>(null);

  const togglePart = (
    link: PartLink
  ) => {
    if (activePart?.url === link.url) {
      setActivePart(null);

      if (playingUrl === link.url) {
        setPlayingUrl(null);
      }

      return;
    }

    setActivePart(link);
  };

  const hasParts =
    track.links &&
    track.links.length > 0;

  return (
    <div
      className="celestial-anim"
      style={{
        ...styles.partRow,
        animationDelay: `${index * 0.05}s`,
      }}
    >
      <div style={styles.trackHeader}>
        <div style={styles.trackIcon}>
          🎼
        </div>

        <div style={styles.trackTitle}>
          {track.title}
        </div>
      </div>

      {hasParts ? (
        <>
          <div style={styles.partsGrid}>
            {track.links.map(
              (
                link,
                linkIndex
              ) => {
                const isActive =
                  activePart?.url ===
                  link.url;

                return (
                  <button
                    type="button"
                    key={linkIndex}
                    onClick={() =>
                      togglePart(link)
                    }
                    style={{
                      ...styles.partButton,
                      ...(isActive
                        ? styles.partButtonActive
                        : {}),
                    }}
                  >
                    {link.label}
                  </button>
                );
              }
            )}
          </div>

          {activePart && (
            <div
              className="celestial-anim"
              style={{
                ...styles.activePartContainer,
                animationDelay: "0s",
              }}
            >
              <div
                style={
                  styles.activePartLabel
                }
              >
                <span
                  style={{
                    color: "#38bdf8",
                  }}
                >
                  ▶
                </span>

                Playing:{" "}
                {activePart.label}
              </div>

              <AudioPlayer
                key={activePart.url}
                url={activePart.url}
                autoPlay={true}
                playingUrl={playingUrl}
                setPlayingUrl={
                  setPlayingUrl
                }
                isMobile={isMobile}
              />
            </div>
          )}
        </>
      ) : (
        <div
          style={{
            ...styles.customPlayer,
            justifyContent: "center",
            marginTop: "6px",
          }}
        >
          <span
            style={{
              color: "#f87171",
              fontSize: "0.85rem",
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            ⚠️ The audio file is not yet
            available. It will be updated
            once released.
          </span>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   AUDIO PLAYER
========================================================= */

function AudioPlayer({
  url,
  autoPlay = false,
  playingUrl,
  setPlayingUrl,
  isMobile,
}: {
  url: string;
  autoPlay?: boolean;
  playingUrl: string | null;
  setPlayingUrl: (url: string | null) => void;
  isMobile: boolean;
}) {
  const audioRef =
    useRef<HTMLAudioElement | null>(
      null
    );

  const seekRafRef =
    useRef<number | null>(null);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [currentTime, setCurrentTime] =
    useState(0);

  const [duration, setDuration] =
    useState(0);

  const [hasError, setHasError] =
    useState(false);

  /*
   * Keep latest global player value
   * accessible without causing effects
   * to constantly re-run.
   */
  const playingUrlRef =
    useRef<string | null>(
      playingUrl
    );

  useEffect(() => {
    playingUrlRef.current =
      playingUrl;
  }, [playingUrl]);

  /*
   * =====================================================
   * SOURCE INITIALIZATION
   *
   * This effect ONLY runs when the URL changes.
   *
   * VERY IMPORTANT:
   * Do not put playingUrl or setPlayingUrl here.
   *
   * The old code could cause audio.load() to happen
   * during unrelated React renders.
   * =====================================================
   */
  useEffect(() => {
    const audio =
      audioRef.current;

    if (!audio) {
      return;
    }

    setHasError(false);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);

    audio.pause();

    /*
     * Only load when the actual source changes.
     */
    audio.load();

    if (autoPlay) {
      setPlayingUrl(url);
    }

    return () => {
      audio.pause();

      if (
        seekRafRef.current !== null
      ) {
        cancelAnimationFrame(
          seekRafRef.current
        );
      }
    };
  }, [
    url,
    autoPlay,
    setPlayingUrl,
  ]);

  /*
   * =====================================================
   * GLOBAL PLAYBACK SYNCHRONIZATION
   *
   * This effect does NOT load the audio.
   *
   * It only pauses/plays the existing audio element.
   * =====================================================
   */
  useEffect(() => {
    const audio =
      audioRef.current;

    if (!audio || hasError) {
      return;
    }

    if (playingUrl !== url) {
      if (!audio.paused) {
        audio.pause();
      }

      return;
    }

    /*
     * The selected player should play.
     *
     * Do not call load().
     */
    if (audio.paused) {
      audio
        .play()
        .catch(() => {
          /*
           * Autoplay can be rejected by
           * mobile browsers.
           */
        });
    }
  }, [
    playingUrl,
    url,
    hasError,
  ]);

  /*
   * =====================================================
   * FORMAT TIME
   * =====================================================
   */
  const formatTime = (
    time: number
  ) => {
    if (!Number.isFinite(time)) {
      return "0:00";
    }

    const m = Math.floor(
      time / 60
    );

    const s = Math.floor(
      time % 60
    );

    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  /*
   * =====================================================
   * PLAY / PAUSE
   * =====================================================
   */
  const togglePlay = async () => {
    const audio =
      audioRef.current;

    if (!audio || hasError) {
      return;
    }

    if (!audio.paused) {
      audio.pause();

      setIsPlaying(false);

      if (
        playingUrlRef.current ===
        url
      ) {
        setPlayingUrl(null);
      }

      return;
    }

    /*
     * Select this player globally.
     */
    setPlayingUrl(url);

    try {
      await audio.play();

      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  /*
   * =====================================================
   * SKIP
   * =====================================================
   */
  const handleSkip = (
    seconds: number
  ) => {
    const audio =
      audioRef.current;

    if (!audio || hasError) {
      return;
    }

    const durationValue =
      Number.isFinite(
        audio.duration
      )
        ? audio.duration
        : 0;

    const newTime = Math.max(
      0,
      Math.min(
        durationValue,
        audio.currentTime +
          seconds
      )
    );

    audio.currentTime =
      newTime;

    setCurrentTime(
      newTime
    );
  };

  /*
   * =====================================================
   * MOBILE-SMOOTH SEEKING
   *
   * Instead of forcing React to render for every single
   * slider event, update the audio immediately and
   * visually update React at most once per animation frame.
   * =====================================================
   */
  const handleSeek = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const audio =
      audioRef.current;

    if (!audio || hasError) {
      return;
    }

    const newTime =
      Number(e.target.value);

    if (
      !Number.isFinite(newTime)
    ) {
      return;
    }

    /*
     * Change the REAL audio position immediately.
     */
    audio.currentTime =
      newTime;

    /*
     * Cancel previous visual update.
     */
    if (
      seekRafRef.current !== null
    ) {
      cancelAnimationFrame(
        seekRafRef.current
      );
    }

    /*
     * Update React state only once
     * per browser animation frame.
     */
    seekRafRef.current =
      requestAnimationFrame(() => {
        setCurrentTime(
          newTime
        );

        seekRafRef.current =
          null;
      });
  };

  if (hasError) {
    return (
      <div
        style={{
          ...styles.customPlayer,
          justifyContent:
            "center",
        }}
      >
        <span
          style={{
            color: "#f87171",
            fontSize: "0.85rem",
            textAlign: "center",
          }}
        >
          ⚠️ The audio file is not
          yet available. It will be
          updated once released.
        </span>
      </div>
    );
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={url}
        preload="metadata"
        controlsList="nodownload"
        {...({
          disablePictureInPicture:
            true,
        } as any)}
        onContextMenu={(e) =>
          e.preventDefault()
        }
        onError={() => {
          setHasError(true);
          setIsPlaying(false);

          if (
            playingUrlRef.current ===
            url
          ) {
            setPlayingUrl(null);
          }
        }}
        onLoadedMetadata={() => {
          const audio =
            audioRef.current;

          if (
            audio &&
            Number.isFinite(
              audio.duration
            )
          ) {
            setDuration(
              audio.duration
            );
          }
        }}
        onDurationChange={() => {
          const audio =
            audioRef.current;

          if (
            audio &&
            Number.isFinite(
              audio.duration
            )
          ) {
            setDuration(
              audio.duration
            );
          }
        }}
        onTimeUpdate={() => {
          const audio =
            audioRef.current;

          if (audio) {
            /*
             * Don't update state while user is
             * actively dragging the slider.
             */
            setCurrentTime(
              audio.currentTime
            );
          }
        }}
        onPlay={() => {
          setIsPlaying(true);

          if (
            playingUrlRef.current !==
            url
          ) {
            setPlayingUrl(url);
          }
        }}
        onPause={() => {
          setIsPlaying(false);
        }}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);

          if (
            playingUrlRef.current ===
            url
          ) {
            setPlayingUrl(null);
          }

          if (audioRef.current) {
            audioRef.current.currentTime =
              0;
          }
        }}
        style={{
          display: "none",
        }}
      />

      <div style={styles.customPlayer}>
        {/* =================================================
            PROGRESS / SEEK BAR
        ================================================== */}

        <div
          style={
            styles.progressContainer
          }
        >
          <span
            style={styles.timeText}
          >
            {formatTime(
              currentTime
            )}
          </span>

          <input
            type="range"
            min="0"
            max={
              duration > 0
                ? duration
                : 100
            }
            step="0.01"
            value={Math.min(
              currentTime,
              duration > 0
                ? duration
                : 100
            )}
            /*
             * onChange works well on most browsers,
             * while the actual audio position is changed
             * immediately inside handleSeek.
             */
            onChange={handleSeek}
            className={
              isMobile
                ? "mobile-progress"
                : undefined
            }
            style={{
              ...styles.progressBar,
              ...(isMobile
                ? styles.mobileProgressBar
                : {}),
            }}
            aria-label="Audio progress"
          />

          <span
            style={styles.timeText}
          >
            {formatTime(
              duration
            )}
          </span>
        </div>

        {/* =================================================
            PLAYER CONTROLS
        ================================================== */}

        <div
          className={
            isMobile
              ? "mobile-player-controls"
              : undefined
          }
          style={{
            ...styles.playerControls,
            ...(isMobile
              ? styles.mobilePlayerControls
              : {}),
          }}
        >
          {/* BACK 5 SECONDS */}

          <button
            type="button"
            onClick={() =>
              handleSkip(-5)
            }
            className={
              isMobile
                ? "mobile-control-button"
                : undefined
            }
            style={{
              ...styles.controlBtn,
              ...(isMobile
                ? styles.mobileControlBtn
                : {}),
            }}
            aria-label="Rewind 5 seconds"
          >
            ↺ 5s
          </button>

          {/* PLAY / PAUSE */}

          <button
            type="button"
            onClick={togglePlay}
            className={
              isMobile
                ? "mobile-play-button"
                : undefined
            }
            style={{
              ...styles.playBtn,
              ...(isMobile
                ? styles.mobilePlayBtn
                : {}),
            }}
            aria-label={
              isPlaying
                ? "Pause"
                : "Play"
            }
          >
            {isPlaying ? (
              <span
                style={
                  styles.pauseIcon
                }
              >
                <span
                  style={
                    styles.pauseIconBar
                  }
                />

                <span
                  style={
                    styles.pauseIconBar
                  }
                />
              </span>
            ) : (
              <span
                style={
                  styles.playIcon
                }
              />
            )}
          </button>

          {/* FORWARD 5 SECONDS */}

          <button
            type="button"
            onClick={() =>
              handleSkip(5)
            }
            className={
              isMobile
                ? "mobile-control-button"
                : undefined
            }
            style={{
              ...styles.controlBtn,
              ...(isMobile
                ? styles.mobileControlBtn
                : {}),
            }}
            aria-label="Forward 5 seconds"
          >
            ↻ 5s
          </button>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   STYLES
========================================================= */

const styles: Record<
  string,
  React.CSSProperties
> = {
  main: {
    height: "100dvh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#030712",
    backgroundImage:
      "radial-gradient(circle at 50% 15%, #0f172a 0%, #030712 75%)",
    color: "#f8fafc",
    fontFamily:
      "'Plus Jakarta Sans', sans-serif",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    padding:
      "clamp(12px, 2vh, 20px) clamp(16px, 4vw, 24px)",
    boxSizing: "border-box",
  },

  divineBeam: {
    position: "absolute",
    top: "-30px",
    left: "50%",
    width: "700px",
    height: "350px",
    background:
      "radial-gradient(ellipse at top, rgba(253, 224, 71, 0.14) 0%, rgba(56, 189, 248, 0.08) 40%, transparent 75%)",
    pointerEvents: "none",
    filter: "blur(20px)",
  },

  glowNebula: {
    position: "absolute",
    top: "25%",
    left: "15%",
    width: "450px",
    height: "450px",
    background:
      "radial-gradient(circle, rgba(30, 58, 138, 0.25) 0%, transparent 70%)",
    pointerEvents: "none",
    filter: "blur(50px)",
  },

  glowBase: {
    position: "absolute",
    bottom: "-100px",
    right: "10%",
    width: "500px",
    height: "500px",
    background:
      "radial-gradient(circle, rgba(88, 28, 135, 0.18) 0%, transparent 70%)",
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
    gap: "clamp(12px, 3vw, 36px)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:
      "rgba(15, 23, 42, 0.75)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter:
      "blur(20px)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor:
      "rgba(56, 189, 248, 0.2)",
    borderRadius: "20px",
    padding:
      "clamp(10px, 2vh, 20px) clamp(14px, 4vw, 28px)",
    marginBottom: "10px",
    flexWrap: "nowrap",
    boxSizing: "border-box",
    boxShadow:
      "0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.1)",
  },

  coverWrapper: {
    position: "relative",
    flexShrink: 0,
    width: "clamp(65px, 12vw, 120px)",
  },

  badge: {
    position: "absolute",
    top: "6px",
    left: "6px",
    backgroundColor:
      "rgba(99, 102, 241, 0.9)",
    backdropFilter: "blur(6px)",
    color: "#e0e7ff",
    fontSize: "0.55rem",
    fontWeight: 700,
    padding: "2px 5px",
    borderRadius: "20px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    zIndex: 2,
    boxShadow:
      "0 4px 12px rgba(99, 102, 241, 0.4)",
  },

  coverImage: {
    width: "100%",
    height: "auto",
    display: "block",
    borderRadius: "10px",
    boxShadow:
      "0 15px 35px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)",
  },

  headerInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    minWidth: 0,
  },

  subtitle: {
    color: "#38bdf8",
    fontSize:
      "clamp(0.65rem, 1.2vw, 0.75rem)",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    display: "block",
    marginBottom: "2px",
  },

  title: {
    fontSize:
      "clamp(0.95rem, 4.6vw, 2.2rem)",
    margin: "6px 0 4px 0",
    fontWeight: 700,
    color: "#ffffff",
    lineHeight: 1.5,
    display: "flex",
    flexWrap: "nowrap",
    whiteSpace: "nowrap",
    alignItems: "center",
    width: "100%",
    overflow: "visible",
  },

  description: {
    margin: 0,
    color: "#94a3b8",
    fontSize:
      "clamp(0.7rem, 1.4vw, 0.9rem)",
    lineHeight: 1.35,
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
    backgroundColor:
      "rgba(15, 23, 42, 0.6)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor:
      "rgba(255, 255, 255, 0.08)",
    borderRadius: "30px",
    color: "#94a3b8",
    fontSize: "0.85rem",
    fontWeight: 500,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition:
      "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
    boxShadow:
      "0 4px 12px rgba(0, 0, 0, 0.2)",
  },

  tabActive: {
    backgroundColor: "#0284c7",
    borderColor: "#38bdf8",
    color: "#ffffff",
    boxShadow:
      "0 0 25px rgba(56, 189, 248, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.3)",
    transform: "translateY(-1px)",
  },

  contentSection: {
    flex: 1,
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    backgroundColor:
      "rgba(15, 23, 42, 0.45)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter:
      "blur(16px)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor:
      "rgba(56, 189, 248, 0.15)",
    borderRadius: "20px",
    padding: "16px 24px",
    boxSizing: "border-box",
    boxShadow:
      "inset 0 1px 1px rgba(255, 255, 255, 0.05)",
  },

  iframeWrapper: {
    position: "relative",
    width: "100%",
    flex: 1,
    minHeight: "100%",
    borderRadius: "14px",
    overflow: "hidden",
    border:
      "1px solid rgba(56, 189, 248, 0.2)",
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

  trackRow: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "12px 16px",
    backgroundColor:
      "rgba(30, 41, 59, 0.55)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor:
      "rgba(255, 255, 255, 0.06)",
    borderRadius: "14px",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
    boxShadow:
      "0 4px 12px rgba(0, 0, 0, 0.15)",
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
    backgroundColor:
      "rgba(56, 189, 248, 0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    flexShrink: 0,
    boxShadow:
      "0 0 10px rgba(56, 189, 248, 0.2)",
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
    backgroundColor:
      "rgba(30, 41, 59, 0.55)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor:
      "rgba(255, 255, 255, 0.06)",
    borderRadius: "14px",
    boxSizing: "border-box",
    boxShadow:
      "0 4px 12px rgba(0, 0, 0, 0.15)",
  },

  partsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(105px, 1fr))",
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
    backgroundColor:
      "rgba(15, 23, 42, 0.6)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor:
      "rgba(255, 255, 255, 0.08)",
    transition: "all 0.2s ease",
    textAlign: "center",
    boxSizing: "border-box",
    cursor: "pointer",
    minHeight: "38px",
  },

  partButtonActive: {
    backgroundColor: "#0284c7",
    borderColor: "#38bdf8",
    color: "#ffffff",
    boxShadow:
      "0 0 15px rgba(56, 189, 248, 0.35)",
  },

  activePartContainer: {
    marginTop: "2px",
    paddingTop: "10px",
    borderTop:
      "1px solid rgba(255, 255, 255, 0.06)",
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    width: "100%",
    backgroundColor:
      "rgba(15, 23, 42, 0.7)",
    padding: "10px 14px",
    borderRadius: "12px",
    boxSizing: "border-box",
    border:
      "1px solid rgba(255, 255, 255, 0.04)",
  },

  progressContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    width: "100%",
    maxWidth: "480px",
  },

  progressBar: {
    flex: 1,
    minWidth: "70px",
    cursor: "pointer",
    accentColor: "#38bdf8",
    height: "4px",
    touchAction: "pan-x",
  },

  mobileProgressBar: {
    height: "8px",
    touchAction: "pan-x",
  },

  timeText: {
    fontSize: "0.78rem",
    color: "#94a3b8",
    minWidth: "32px",
    textAlign: "center",
    fontVariantNumeric:
      "tabular-nums",
  },

  playerControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    height: "48px",
  },

  mobilePlayerControls: {
    gap: "22px",
    height: "56px",
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
    transition:
      "color 0.2s ease",
  },

  mobileControlBtn: {
    minWidth: "56px",
    minHeight: "44px",
    padding: "8px 10px",
  },

  playBtn: {
    width: "44px",
    height: "44px",
    minWidth: "44px",
    minHeight: "44px",
    borderRadius: "50%",
    backgroundColor:
      "transparent",
    color: "#ffffff",
    border:
      "1px solid rgba(56, 189, 248, 0.65)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    margin: 0,
    cursor: "pointer",
    boxShadow:
      "0 0 12px rgba(56, 189, 248, 0.25)",
    transition:
      "all 0.15s ease",
    WebkitAppearance:
      "none",
    appearance: "none",
    outline: "none",
    flexShrink: 0,
  },

  mobilePlayBtn: {
    width: "52px",
    height: "52px",
    minWidth: "52px",
    minHeight: "52px",
  },

  playIcon: {
    width: 0,
    height: 0,
    borderTop:
      "7px solid transparent",
    borderBottom:
      "7px solid transparent",
    borderLeft:
      "11px solid #ffffff",
    display: "block",
    marginLeft: "3px",
  },

  pauseIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
    width: "12px",
    height: "16px",
  },

  pauseIconBar: {
    width: "3px",
    height: "14px",
    backgroundColor: "#ffffff",
    borderRadius: "1px",
    display: "block",
  },

  footer: {
    flexShrink: 0,
    marginTop: "8px",
    paddingTop: "4px",
    paddingBottom: "2px",
    borderTop:
      "1px solid rgba(255, 255, 255, 0.05)",
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
    backgroundColor:
      "rgba(3, 7, 18, 0.95)",
    backdropFilter: "blur(25px)",
    WebkitBackdropFilter:
      "blur(25px)",
    zIndex: 99999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },

  shieldBox: {
    backgroundColor:
      "rgba(15, 23, 42, 0.9)",
    border:
      "1px solid rgba(56, 189, 248, 0.3)",
    borderRadius: "20px",
    padding: "28px",
    textAlign: "center",
    maxWidth: "360px",
    boxShadow:
      "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
  },
};