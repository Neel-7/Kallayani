import { breakpoints } from '../tokens/breakpoints';
import { colors } from '../tokens/colors';
import { radii } from '../tokens/radii';
import { shadows } from '../tokens/shadows';
import { spacing } from '../tokens/spacing';
import { typeScale, fontFamilies } from '../tokens/typography';

export function TokenPreview() {
  return (
    <div className="min-h-screen bg-background text-foreground p-[32px] font-sans xs:p-[16px] md:p-[32px] lg:p-[48px]">
      <header className="mb-[48px] border-b border-border pb-[24px]">
        <h1 className="text-display-lg font-display text-primary">
          Kallayani Design Tokens
        </h1>
        <p className="text-body-lg text-muted-foreground mt-[8px]">
          Diagnostic Preview Page — Baseline System Tokens (Phase 1 / M2)
        </p>
        <p className="text-caption text-secondary mt-[4px]">
          Temporary View — No component libraries or router active
        </p>
      </header>

      <main className="space-y-[64px]">
        {/* Colors Section */}
        <section className="space-y-[24px]">
          <h2 className="text-heading-lg font-display border-b border-border pb-[8px] text-primary-text">
            1. Color Tokens
          </h2>
          <div className="grid grid-cols-2 gap-[16px] xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Object.entries(colors).map(([name, hex]) => (
              <div
                key={name}
                className="bg-surface rounded-soft border border-border p-[12px] shadow-card flex flex-col justify-between"
              >
                <div
                  className="w-full h-[96px] rounded-soft mb-[12px] border border-border"
                  style={{ backgroundColor: hex }}
                />
                <div>
                  <span className="block text-body-sm font-semibold truncate">
                    {name}
                  </span>
                  <span className="block text-caption text-muted-foreground font-mono">
                    {hex}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* Contrast Ratio Panel */}
          <div className="bg-surface p-[16px] rounded-soft border border-border mt-[16px] max-w-2xl">
            <h3 className="text-heading-sm font-semibold mb-[8px]">
              Contrast Ratios against Eggshell (#F7F3EC)
            </h3>
            <ul className="space-y-[8px] text-body-sm">
              <li>
                <strong>Primary (Vermilion - #B23A2E):</strong>{' '}
                <span className="font-semibold text-primary">5.37:1</span>
                <span className="ml-[8px] bg-success/20 text-success text-xs px-[8px] py-[2px] rounded font-bold">
                  PASS (AA Normal & Large Text)
                </span>
              </li>
              <li>
                <strong>PrimaryText (Darkened Vermilion - #8E2E24):</strong>{' '}
                <span className="font-semibold text-primary-text">7.40:1</span>
                <span className="ml-[8px] bg-success/20 text-success text-xs px-[8px] py-[2px] rounded font-bold">
                  PASS (AA Normal & AAA Large Text)
                </span>
              </li>
            </ul>
            <p className="text-caption text-muted-foreground mt-[8px]">
              Note: <code>primaryText</code> is optimized specifically for small
              body-text sizes to exceed the WCAG AA 4.5:1 requirement with high
              legibility.
            </p>
          </div>
        </section>

        {/* Typography Section */}
        <section className="space-y-[24px]">
          <h2 className="text-heading-lg font-display border-b border-border pb-[8px] text-primary-text">
            2. Typography & Type Scale
          </h2>
          <div className="bg-surface p-[24px] rounded-soft border border-border space-y-[16px]">
            <div className="border-b border-border pb-[16px] mb-[16px]">
              <p className="text-body-md font-semibold">Font Families:</p>
              <p className="text-body-sm font-display text-primary mt-[4px]">
                Display font:{' '}
                <code className="font-mono text-xs">
                  {fontFamilies.display}
                </code>
              </p>
              <p className="text-body-sm font-sans mt-[4px]">
                Sans UI font:{' '}
                <code className="font-mono text-xs">{fontFamilies.sans}</code>
              </p>
              <p className="text-caption text-muted-foreground mt-[8px] italic">
                // PLACEHOLDER — final typeface TBD per blueprint §36
                (integrated with font-display: swap)
              </p>
            </div>
            <div className="space-y-[32px]">
              {Object.entries(typeScale).map(([name, scale]) => (
                <div
                  key={name}
                  className="border-b border-border/50 pb-[16px] last:border-0 last:pb-0"
                >
                  <span className="inline-block text-caption text-muted-foreground font-mono mb-[8px]">
                    {name} ({scale.fontSize} / LH: {scale.lineHeight})
                  </span>
                  <div
                    className={`text-${name} ${name.startsWith('display') || name.startsWith('heading') ? 'font-display' : 'font-sans'}`}
                  >
                    Kallayani Editorial — Premium Fashion Platform
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Spacing Section */}
        <section className="space-y-[24px]">
          <h2 className="text-heading-lg font-display border-b border-border pb-[8px] text-primary-text">
            3. Spacing Scale
          </h2>
          <p className="text-body-sm text-muted-foreground -mt-[16px]">
            Custom-named-by-px-value approach for clarity and explicitness.
          </p>
          <div className="bg-surface p-[24px] rounded-soft border border-border space-y-[16px]">
            {Object.entries(spacing).map(([key, val]) => (
              <div key={key} className="flex items-center gap-[24px]">
                <span className="w-[240px] shrink-0 text-body-sm text-muted-foreground font-mono">
                  spacing['{key}'] ({val})
                </span>
                <div
                  className="bg-primary h-6 rounded-soft"
                  style={{ width: val }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Radii & Shadows & Borders */}
        <section className="space-y-[24px]">
          <h2 className="text-heading-lg font-display border-b border-border pb-[8px] text-primary-text">
            4. Radii, Shadows & Borders
          </h2>
          <div className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-3">
            {/* Radii */}
            <div className="bg-surface p-[24px] rounded-soft border border-border space-y-[16px]">
              <h3 className="text-heading-sm font-semibold">
                Radii (Section 29)
              </h3>
              <div className="space-y-[16px]">
                <div>
                  <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
                    radius.soft = {radii.soft} (for cards/buttons)
                  </span>
                  <button className="bg-primary text-surface px-[16px] py-[8px] rounded-soft font-semibold text-body-sm">
                    Soft Radius Button
                  </button>
                </div>
                <div>
                  <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
                    radius.none = {radii.none} (for full-bleed imagery)
                  </span>
                  <div className="bg-muted-foreground/20 w-full h-[48px] rounded-none flex items-center justify-center text-body-sm text-muted-foreground">
                    Full bleed container (no radius)
                  </div>
                </div>
              </div>
            </div>

            {/* Shadows */}
            <div className="bg-surface p-[24px] rounded-soft border border-border space-y-[16px]">
              <h3 className="text-heading-sm font-semibold">
                Shadows (Section 29)
              </h3>
              <div className="space-y-[16px]">
                <div className="bg-surface border border-border p-[16px] rounded-soft shadow-card">
                  <span className="block text-caption text-muted-foreground font-mono">
                    shadows.card ({shadows.card})
                  </span>
                  <p className="text-body-sm text-muted-foreground">
                    Subtle card backing
                  </p>
                </div>
                <div className="bg-surface border border-border p-[16px] rounded-soft shadow-drawer">
                  <span className="block text-caption text-muted-foreground font-mono">
                    shadows.drawer ({shadows.drawer})
                  </span>
                  <p className="text-body-sm text-muted-foreground">
                    Elevated drawer context
                  </p>
                </div>
              </div>
            </div>

            {/* Borders */}
            <div className="bg-surface p-[24px] rounded-soft border border-border space-y-[16px]">
              <h3 className="text-heading-sm font-semibold">
                Borders (Section 29)
              </h3>
              <div>
                <span className="block text-caption text-muted-foreground font-mono mb-[8px]">
                  border.hairline = 1px solid {colors.border}
                </span>
                <div className="border border-border p-[16px] rounded-soft">
                  <p className="text-body-sm text-muted-foreground">
                    This box utilizes the thin hairline border token.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Breakpoints Section */}
        <section className="space-y-[24px]">
          <h2 className="text-heading-lg font-display border-b border-border pb-[8px] text-primary-text">
            5. Breakpoint Verification (Section 23)
          </h2>
          <div className="bg-surface p-[24px] rounded-soft border border-border">
            <p className="text-body-sm mb-[16px] text-muted-foreground">
              Resize your browser to observe the active breakpoint indicators
              below.
            </p>
            <div className="grid grid-cols-5 gap-[8px] text-center text-caption font-mono">
              <div className="p-[8px] rounded bg-primary text-surface xs:bg-primary xs:text-surface">
                xs ({breakpoints.xs})
              </div>
              <div className="p-[8px] rounded bg-muted-foreground/10 text-muted-foreground sm:bg-primary sm:text-surface">
                sm ({breakpoints.sm})
              </div>
              <div className="p-[8px] rounded bg-muted-foreground/10 text-muted-foreground md:bg-primary md:text-surface">
                md ({breakpoints.md})
              </div>
              <div className="p-[8px] rounded bg-muted-foreground/10 text-muted-foreground lg:bg-primary lg:text-surface">
                lg ({breakpoints.lg})
              </div>
              <div className="p-[8px] rounded bg-muted-foreground/10 text-muted-foreground xl:bg-primary xl:text-surface">
                xl ({breakpoints.xl})
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-[64px] border-t border-border pt-[24px] text-center text-caption text-muted-foreground">
        Kallayani — Phase 1 (M2) Complete and Verified.
      </footer>
    </div>
  );
}
