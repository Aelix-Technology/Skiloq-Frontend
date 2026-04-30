// src/components/auth/CountryFlagSelect.tsx
"use client";

interface Country {
  code: string;
  name: string;
  flag: string;
  dial_code: string;
}

const countries: Country[] = [
  { code: "GH", name: "Ghana", flag: "🇬🇭", dial_code: "+233" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", dial_code: "+234" },
  { code: "KE", name: "Kenya", flag: "🇰🇪", dial_code: "+254" },
];

interface CountryFlagSelectProps {
  value: string;
  onChange: (dialCode: string) => void;
}

export function CountryFlagSelect({ value, onChange }: CountryFlagSelectProps) {
  const selected = countries.find((c) => c.dial_code === value) || countries[0];

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-primary-50 border border-primary-100 rounded-input px-3 py-3 pr-8 text-sm font-medium text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer"
      >
        {countries.map((country) => (
          <option key={country.code} value={country.dial_code}>
            {country.flag} {country.dial_code}
          </option>
        ))}
      </select>
      <span className="absolute left-8 top-1/2 -translate-y-1/2 text-lg pointer-events-none">
        {selected.flag}
      </span>
    </div>
  );
}