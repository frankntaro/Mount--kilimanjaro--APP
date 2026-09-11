import { Route, SafariPackage } from '../types';

export interface RouteTariff {
  priceUSD: number;
  days: number;
}

export interface SafariTariff {
  priceUSD: number;
  days: number;
}

export interface PackageOverrides {
  routes: Record<string, RouteTariff>;
  safaris: Record<string, SafariTariff>;
  gearRental: number;
}

export const DEFAULT_ROUTE_CONFIGS: Record<string, RouteTariff> = {
  machame: { priceUSD: 2150, days: 6 },
  lemosho: { priceUSD: 2350, days: 6 },
  shira: { priceUSD: 2250, days: 6 },
  'northern-circuit': { priceUSD: 2950, days: 9 },
  marangu: { priceUSD: 1750, days: 5 },
  rongai: { priceUSD: 2250, days: 6 },
  'rongai-5': { priceUSD: 1980, days: 5 },
  umbwe: { priceUSD: 2100, days: 5 },
};

export const DEFAULT_SAFARI_CONFIGS: Record<string, SafariTariff> = {
  'serengeti-ngorongoro': { priceUSD: 1450, days: 4 },
  'tarangire-manyara': { priceUSD: 680, days: 2 },
  'zanzibar-beach': { priceUSD: 890, days: 4 },
  'chemka-hotsprings': { priceUSD: 95, days: 1 },
  'materuni-waterfalls': { priceUSD: 85, days: 1 },
  'serval-wildlife': { priceUSD: 220, days: 1 },
  'marangu-day-trip': { priceUSD: 170, days: 1 },
  'moshi-town-tour': { priceUSD: 65, days: 1 },
  'rau-forest': { priceUSD: 70, days: 1 },
  'lake-chala': { priceUSD: 115, days: 1 },
};

export const DEFAULT_GEAR_RENTAL = 150;

export const DEFAULT_PACKAGE_OVERRIDES: PackageOverrides = {
  routes: { ...DEFAULT_ROUTE_CONFIGS },
  safaris: { ...DEFAULT_SAFARI_CONFIGS },
  gearRental: DEFAULT_GEAR_RENTAL,
};

// Aliases for compatibility
export type PriceOverrides = PackageOverrides;
export const DEFAULT_PRICE_OVERRIDES = DEFAULT_PACKAGE_OVERRIDES;
export const DEFAULT_ROUTE_PRICES: Record<string, number> = {
  machame: 2150,
  lemosho: 2350,
  shira: 2250,
  'northern-circuit': 2950,
  marangu: 1750,
  rongai: 2250,
  'rongai-5': 1980,
  umbwe: 2100,
};
export const DEFAULT_SAFARI_PRICES: Record<string, number> = {
  'serengeti-ngorongoro': 1450,
  'tarangire-manyara': 680,
  'zanzibar-beach': 890,
  'chemka-hotsprings': 95,
  'materuni-waterfalls': 85,
  'serval-wildlife': 220,
  'marangu-day-trip': 170,
  'moshi-town-tour': 65,
  'rau-forest': 70,
  'lake-chala': 115,
};

const STORAGE_KEY = 'vamos_custom_prices';

export function getStoredPackageOverrides(): PackageOverrides {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const routes: Record<string, RouteTariff> = {};
      const safaris: Record<string, SafariTariff> = {};

      // Parse routes
      Object.keys(DEFAULT_ROUTE_CONFIGS).forEach((k) => {
        const defaultCfg = DEFAULT_ROUTE_CONFIGS[k];
        const saved = parsed.routes ? parsed.routes[k] : undefined;
        if (typeof saved === 'number') {
          routes[k] = { priceUSD: saved, days: defaultCfg.days };
        } else if (saved && typeof saved === 'object') {
          routes[k] = {
            priceUSD: typeof saved.priceUSD === 'number' ? saved.priceUSD : defaultCfg.priceUSD,
            days: typeof saved.days === 'number' ? saved.days : defaultCfg.days,
          };
        } else {
          routes[k] = { ...defaultCfg };
        }
      });

      // Parse safaris
      Object.keys(DEFAULT_SAFARI_CONFIGS).forEach((k) => {
        const defaultCfg = DEFAULT_SAFARI_CONFIGS[k];
        const saved = parsed.safaris ? parsed.safaris[k] : undefined;
        if (typeof saved === 'number') {
          safaris[k] = { priceUSD: saved, days: defaultCfg.days };
        } else if (saved && typeof saved === 'object') {
          safaris[k] = {
            priceUSD: typeof saved.priceUSD === 'number' ? saved.priceUSD : defaultCfg.priceUSD,
            days: typeof saved.days === 'number' ? saved.days : defaultCfg.days,
          };
        } else {
          safaris[k] = { ...defaultCfg };
        }
      });

      return {
        routes,
        safaris,
        gearRental: typeof parsed.gearRental === 'number' ? parsed.gearRental : DEFAULT_GEAR_RENTAL,
      };
    }
  } catch (e) {
    console.error('Failed to load stored package overrides', e);
  }
  return {
    routes: { ...DEFAULT_ROUTE_CONFIGS },
    safaris: { ...DEFAULT_SAFARI_CONFIGS },
    gearRental: DEFAULT_GEAR_RENTAL,
  };
}

export const getStoredPriceOverrides = getStoredPackageOverrides;

export function savePackageOverrides(overrides: PackageOverrides): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  } catch (e) {
    console.error('Failed to save package overrides', e);
  }
}

export const savePriceOverrides = savePackageOverrides;

export function resetPackageOverrides(): PackageOverrides {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to reset package overrides', e);
  }
  return {
    routes: { ...DEFAULT_ROUTE_CONFIGS },
    safaris: { ...DEFAULT_SAFARI_CONFIGS },
    gearRental: DEFAULT_GEAR_RENTAL,
  };
}

export const resetPriceOverrides = resetPackageOverrides;

export function applyPricesToData(
  overrides: PackageOverrides,
  routes: Route[],
  safaris: SafariPackage[]
): void {
  if (!overrides) return;

  if (overrides.routes) {
    routes.forEach((route) => {
      const cfg = overrides.routes[route.id];
      if (typeof cfg === 'number') {
        route.priceUSD = cfg;
      } else if (cfg && typeof cfg === 'object') {
        if (typeof cfg.priceUSD === 'number') route.priceUSD = cfg.priceUSD;
        if (typeof cfg.days === 'number') route.days = cfg.days;
      }
    });
  }

  if (overrides.safaris) {
    safaris.forEach((safari) => {
      const cfg = overrides.safaris[safari.id];
      if (typeof cfg === 'number') {
        safari.priceUSD = cfg;
      } else if (cfg && typeof cfg === 'object') {
        if (typeof cfg.priceUSD === 'number') safari.priceUSD = cfg.priceUSD;
        if (typeof cfg.days === 'number') safari.days = cfg.days;
      }
    });
  }
}
