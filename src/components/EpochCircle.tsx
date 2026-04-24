type Props = {
  progress: number; 
};

export default function EpochCircle({ progress }: Props) {
  const size = 100;     
  const stroke = 10;

  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-[18px] h-[18px] lg:w-[32px] lg:h-6 rotate-[-90deg]"
    >
      <circle
        stroke="rgba(255,255,255,0.1)"
        fill="transparent"
        strokeWidth={stroke}
        r={radius}
        cx="50"
        cy="50"
      />

      <circle
        stroke="#a855f7"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        r={radius}
        cx="50"
        cy="50"
        className="transition-all duration-500 ease-out"
      />
    </svg>
  );
}