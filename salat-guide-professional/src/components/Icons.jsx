// Small hand-drawn icon set. Keeping these inline avoids pulling in an
// icon library dependency for a handful of simple glyphs.

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function SearchIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function LocateIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  );
}

export function CloseIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function MenuIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

export function PhoneIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2C9.5 21 3 14.5 3 6a2 2 0 0 1 1-2Z" />
    </svg>
  );
}

export function ChevronLeftIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export function ChevronRightIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function ChevronDownIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function CompassIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15 9-3.5 5.5L9 16l1.5-5.5L15 9Z" />
    </svg>
  );
}

export function MailIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function CheckIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function AlertIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 9v4M12 17h.01" />
      <path d="M10.3 3.9 2.6 17.5A1.8 1.8 0 0 0 4.2 20.2h15.6a1.8 1.8 0 0 0 1.6-2.7L13.7 3.9a1.8 1.8 0 0 0-3.4 0Z" />
    </svg>
  );
}

export function FajrIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v3M4.2 10.2 6 12M19.8 10.2 18 12M2 18h20M6 18a6 6 0 0 1 12 0" />
    </svg>
  );
}

export function SunriseIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2v4M4.9 8.9l1.4 1.4M17.7 10.3l1.4-1.4M2 18h20M6 18a6 6 0 0 1 12 0M3 22h18" />
    </svg>
  );
}

export function DhuhrIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </svg>
  );
}

export function AsrIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="13" r="4" />
      <path d="M12 3v2M4.5 6.5l1.4 1.4M19.5 6.5l-1.4 1.4M2 20h20" />
    </svg>
  );
}

export function MaghribIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M2 18h20M6 18a6 6 0 0 1 12 0M12 4v6M9 7l3 3 3-3" />
    </svg>
  );
}

export function IshaIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5Z" />
      <path d="M18 3v3M19.5 4.5h-3" />
    </svg>
  );
}

export function ShahadaIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 19V6a2 2 0 0 1 2-2h9l5 5v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
      <path d="M8 9h8M8 13h8M8 17h5" />
    </svg>
  );
}

export function SalahIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />
      <path d="M12 7v4M6 21l3-6 3 2 3-2 3 6M9 11h6" />
    </svg>
  );
}

export function ZakatIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2 0 0 1 5 0c0 1.5-2.5 1.7-2.5 3M12 16h.01" />
    </svg>
  );
}

export function SawmIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M19 13.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 9.5 9.5Z" />
    </svg>
  );
}

export function HajjIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 3 20h18L12 3Z" />
      <path d="M8.5 20 12 10l3.5 10" />
    </svg>
  );
}

export function GlobeIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
    </svg>
  );
}

export function BookIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 19.5V5a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2Z" />
      <path d="M19 18H6a2 2 0 0 0-2 2" />
    </svg>
  );
}

export function ShieldIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z" />
    </svg>
  );
}

export function DropletIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3s6 7 6 11.5A6 6 0 0 1 6 14.5C6 10 12 3 12 3Z" />
    </svg>
  );
}

export function ClockIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function MapPinIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.3" />
    </svg>
  );
}

export function MosqueIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2v3M10 4h4" />
      <path d="M12 5a3 3 0 0 1 3 3c0 1.3-.7 2-1.4 2.6.9.5 1.9 1.5 1.9 3.4H8.5c0-1.9 1-2.9 1.9-3.4C9.7 10 9 9.3 9 8a3 3 0 0 1 3-3Z" />
      <path d="M3 21v-6a3 3 0 0 1 3-3 3 3 0 0 1 3 3v6M15 21v-6a3 3 0 0 1 3-3 3 3 0 0 1 3 3v6" />
      <path d="M9 21v-4a3 3 0 0 1 6 0v4M2 21h20" />
    </svg>
  );
}

export const PRAYER_ICONS = {
  Fajr: FajrIcon,
  Sunrise: SunriseIcon,
  Dhuhr: DhuhrIcon,
  Asr: AsrIcon,
  Maghrib: MaghribIcon,
  Isha: IshaIcon,
};

export const PILLAR_ICONS = {
  shahada: ShahadaIcon,
  salah: SalahIcon,
  zakat: ZakatIcon,
  sawm: SawmIcon,
  hajj: HajjIcon,
};
