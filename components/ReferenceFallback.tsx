import { useId } from "react";

/** Distinct vector stills preserve the reference composition without a graphics context. */
export default function ReferenceFallback({ variant }: { variant: string }) {
  const id = useId().replace(/:/g, "");
  const url = (key: string) => `url(#${id}-${key})`;
  const defs = (
    <defs>
      <linearGradient id={`${id}-silver`} x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#171320" />
        <stop offset=".17" stopColor="#aaa9cf" />
        <stop offset=".28" stopColor="#eeecff" />
        <stop offset=".36" stopColor="#35314d" />
        <stop offset=".63" stopColor="#090810" />
        <stop offset=".87" stopColor="#b2accb" />
        <stop offset="1" stopColor="#252033" />
      </linearGradient>
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#0c0a12" />
        <stop offset=".25" stopColor="#9c96c3" stopOpacity=".7" />
        <stop offset=".5" stopColor="#312740" stopOpacity=".3" />
        <stop offset=".75" stopColor="#aaa2d8" stopOpacity=".6" />
        <stop offset="1" stopColor="#0d0a14" />
      </linearGradient>
      <linearGradient id={`${id}-track`} x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#07050e" />
        <stop offset=".46" stopColor="#151122" />
        <stop offset=".7" stopColor="#353044" />
        <stop offset="1" stopColor="#08060d" />
      </linearGradient>
      <radialGradient id={`${id}-orb`} cx="30%" cy="23%" r="76%">
        <stop stopColor="#f2efff" />
        <stop offset=".1" stopColor="#b0abcf" />
        <stop offset=".34" stopColor="#322e4c" />
        <stop offset=".53" stopColor="#0b0915" />
        <stop offset=".79" stopColor="#050409" />
        <stop offset=".91" stopColor="#b5b1d8" />
        <stop offset="1" stopColor="#100d1a" />
      </radialGradient>
      <linearGradient id={`${id}-puff`} x1=".1" y1="0" x2=".75" y2="1">
        <stop stopColor="#0c0a15" />
        <stop offset=".17" stopColor="#030308" />
        <stop offset=".33" stopColor="#39354d" />
        <stop offset=".39" stopColor="#b1aacd" />
        <stop offset=".44" stopColor="#141020" />
        <stop offset=".7" stopColor="#030207" />
        <stop offset=".86" stopColor="#6b668c" />
        <stop offset=".92" stopColor="#171124" />
        <stop offset="1" stopColor="#06040a" />
      </linearGradient>
      <linearGradient id={`${id}-top`} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#07060a" />
        <stop offset=".8" stopColor="#34313e" />
        <stop offset="1" stopColor="#565061" />
      </linearGradient>
      <linearGradient id={`${id}-door`}>
        <stop stopColor="#08070b" />
        <stop offset=".75" stopColor="#131018" />
        <stop offset="1" stopColor="#35303b" />
      </linearGradient>
      <filter id={`${id}-glow`} x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="5" />
      </filter>
      <filter id={`${id}-soft`}>
        <feGaussianBlur stdDeviation="1.7" />
      </filter>
    </defs>
  );
  const orb = (x: number, y: number, r: number, color: string, key: number) => (
    <g key={key} transform={`translate(${x} ${y})`}>
      <circle r={r} fill={url("orb")} />
      <ellipse
        rx={r * 1.06}
        ry={r * 0.23}
        transform="rotate(-25)"
        fill="none"
        stroke={color}
        strokeWidth="3"
        filter={url("glow")}
      />
      <path
        d={`M ${-r} 0 C ${-r * 0.6} ${r * 0.54},${r * 0.6} ${r * 0.5},${r} ${-r * 0.16}`}
        transform="rotate(-25)"
        stroke={color}
        strokeWidth="2.2"
        fill="none"
      />
    </g>
  );
  return (
    <svg
      className={`reference-fallback fallback-${variant}`}
      viewBox={variant === "hero" ? "0 0 1440 900" : "0 0 800 600"}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {defs}
      {variant === "hero" && (
        <>
          <g transform="translate(180 245) rotate(32)">
            {[0, 1, 2, 3].map((i) => (
              <g key={i} transform={`translate(${i * 266} 0)`}>
                <rect
                  width="266"
                  height="115"
                  rx="28"
                  fill={url("glass")}
                  stroke="#938aaa"
                  strokeOpacity=".25"
                />
                <path
                  d="m20 68 56-45 68 64 89-60-30 78-117-16z"
                  fill={url("silver")}
                  opacity=".75"
                />
                <path d="M35 8H235M24 102H243" stroke="#9285b5" opacity=".2" />
                <rect
                  x="-10"
                  y="-5"
                  width="38"
                  height="125"
                  rx="8"
                  fill={url("silver")}
                />
              </g>
            ))}
          </g>
          <path
            d="M-80 686 Q720 224 1520 686 L1520 822 Q720 353-80 822Z"
            fill={url("track")}
            stroke="#625779"
            strokeWidth="4"
          />
          {Array.from({ length: 130 }, (_, i) => {
            const x = -50 + i * 12;
            const y = 455 + (x - 720) ** 2 * 0.00029;
            return (
              <path
                key={i}
                d={`M${x} ${y + 8} l${(x - 720) * 0.015} 105`}
                stroke="#8c7c9f"
                strokeWidth="2"
                opacity=".16"
              />
            );
          })}
          <path
            d="M-80 812 Q720 345 1520 812"
            fill="none"
            stroke="#665c82"
            strokeWidth="3"
          />
          {[
            { x: 240, y: 545, c: "#53fc74", r: -18 },
            { x: 615, y: 450, c: "#c52bff", r: -7 },
            { x: 960, y: 473, c: "#babbef", r: 14 },
            { x: 1320, y: 580, c: "#16bb49", r: 30 },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x} ${p.y}) rotate(${p.r})`}>
              <rect
                x="-32"
                y="-22"
                width="64"
                height="64"
                fill="#0e081b"
                stroke="#635c79"
              />
              <rect
                x="-22"
                y="-8"
                width="44"
                height="44"
                fill={p.c}
                opacity=".45"
                filter={url("glow")}
              />
              <path
                d="m-25 9 19-16 26 34-33-14 5 17"
                stroke={p.c}
                fill="none"
              />
              <path d="m-34-39 65 0 3 44-64 0z" fill="#dad9ea" />
              <path d="m31-39 15 9-9 39-3-4z" fill="#8e85a2" />
            </g>
          ))}
        </>
      )}
      {variant === "sculpture" && (
        <g className="fallback-sculpture-shape">
          <path
            d="M180 54 C276 11 320 145 400 143 C491 141 548 12 641 56 C727 97 622 228 637 300 C650 386 744 512 653 550 C556 591 492 448 405 455 C312 462 254 587 170 545 C88 504 200 388 184 306 C164 221 87 97 180 54Z M279 221 C293 259 303 291 279 348 C328 327 376 332 400 374 C430 327 474 334 524 353 C499 301 503 265 528 224 C470 245 435 239 402 201 C368 248 323 238 279 221Z"
            fill={url("puff")}
            fillRule="evenodd"
            filter={url("soft")}
          />
          <path
            d="M184 64C123 102 194 229 190 283M181 530C268 568 313 451 391 450M641 62C687 94 639 178 628 238"
            stroke="#767091"
            strokeWidth="3"
            fill="none"
            opacity=".32"
            filter={url("soft")}
          />
        </g>
      )}
      {variant === "orbs" && (
        <g className="fallback-orbit">
          {[
            "#f547fd",
            "#afef3b",
            "#ebedff",
            "#80afff",
            "#fc3293",
            "#ffc338",
            "#97d1fa",
            "#c763fc",
          ].map((c, i) =>
            orb(
              400 + Math.cos((i / 8) * Math.PI * 2) * 180,
              300 + Math.sin((i / 8) * Math.PI * 2) * 180,
              44,
              c,
              i,
            ),
          )}
        </g>
      )}
      {variant === "coins" && (
        <g>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g
              key={i}
              transform={`translate(${i * 158 + 8} ${325 + Math.sin(i * 1.4) * 38}) rotate(${i * 8 - 12})`}
            >
              <ellipse
                rx="56"
                ry="66"
                fill={i % 2 ? "#244259" : "#819ac6"}
                stroke="#405774"
                strokeWidth="5"
              />
              <ellipse
                rx="46"
                ry="55"
                fill="none"
                stroke="#b8c2e2"
                opacity=".3"
              />
              <path
                d="m0-28 25 16-6 29-21 14-23-18 4-28z m0 12 13 9-3 16-13 8-10-12 2-13z"
                stroke="#adc0dd"
                strokeWidth="2"
                fill="none"
                opacity=".7"
              />
            </g>
          ))}
        </g>
      )}
      {variant === "cube" && (
        <g className="fallback-cube">
          <path d="m244 143 188-88 160 79-194 96z" fill={url("top")} />
          <path
            d="m398 230 194-96v249l-194 104z"
            fill="#08070b"
            stroke="#18151e"
          />
          <path d="m244 143 154 87v257l-154-93z" fill="#15111d" />
          <path
            d="m253 163 128 73v224l-128-77z"
            fill="#010102"
            stroke="#31273d"
            strokeWidth="7"
          />
          {orb(410, 344, 75, "#d521ff", 0)}
          <path
            className="fallback-door"
            d="m244 143 154 87v257l-154-93z"
            fill={url("door")}
            stroke="#25202c"
          />
        </g>
      )}
      {variant === "wave" && (
        <g transform="translate(180 90)">
          {Array.from({ length: 25 }, (_, i) => (
            <path
              key={i}
              d={`M0 ${400 - i * 8} Q35 ${300 - i * 10} 100 ${40 + i * 3} Q150 ${430 - i * 5} 430 ${260 - i * 2}`}
              fill="none"
              stroke={`hsl(${226 + i},60%,${68 - i * 0.8}%)`}
              strokeWidth="2"
            />
          ))}
        </g>
      )}
    </svg>
  );
}
