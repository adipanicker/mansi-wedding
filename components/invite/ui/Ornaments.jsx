export function Mandala({ className = "" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <circle cx="100" cy="100" r="9" />
      <circle
        cx="100"
        cy="100"
        r="94"
        strokeDasharray="1 6"
        strokeLinecap="round"
      />
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse
          key={i}
          cx="100"
          cy="58"
          rx="9"
          ry="30"
          transform={`rotate(${i * 30} 100 100)`}
        />
      ))}
    </svg>
  );
}
