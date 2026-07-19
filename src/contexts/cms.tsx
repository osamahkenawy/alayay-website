import React, { createContext, useContext } from 'react';
import type { CmsOverlay } from '../lib/cms';

const EMPTY: CmsOverlay = { t: {}, media: {}, brand: {} };

const CmsContext = createContext<CmsOverlay>(EMPTY);

export function CmsProvider({ value, children }: { value?: CmsOverlay | null; children: React.ReactNode }) {
  return <CmsContext.Provider value={value ?? EMPTY}>{children}</CmsContext.Provider>;
}

export function useCms(): CmsOverlay {
  return useContext(CmsContext);
}

// Deep-merge a partial override onto a base object. Arrays merge element-wise by
// index (so CMS item 0 overlays default item 0), and empty/undefined values in
// the override never clobber a good default.
export function deepMerge<T>(base: T, override: any): T {
  if (override === undefined || override === null) return base;
  if (Array.isArray(base)) {
    if (!Array.isArray(override)) return base;
    return base.map((el, i) => deepMerge(el, override[i])) as any;
  }
  if (typeof base === 'object' && base !== null && typeof override === 'object' && !Array.isArray(override)) {
    const out: any = { ...base };
    for (const k of Object.keys(override)) out[k] = deepMerge((base as any)[k], override[k]);
    return out;
  }
  return (override === undefined ? base : override) as T;
}
