import * as React from 'react';

import { ComponentPreview } from './dev/ComponentPreview';
import { TokenPreview } from './dev/TokenPreview';

function App() {
  // TEMPORARY — State toggle to preview baseline tokens or shadcn primitives.
  // This temporary workspace routing pattern will be replaced by standard React Router once real routing is introduced.
  const [activeView, setActiveView] = React.useState<'tokens' | 'components'>(
    'components',
  );

  return (
    <div className="relative">
      {/* Diagnostic Navigation Toggle Header */}
      <div className="bg-surface border-b border-border py-[8px] px-[16px] flex justify-center gap-[16px] sticky top-0 z-50 shadow-card">
        <button
          onClick={() => setActiveView('tokens')}
          className={`px-[12px] py-[6px] rounded-soft text-body-sm font-semibold transition-colors ${
            activeView === 'tokens'
              ? 'bg-primary text-surface'
              : 'text-muted-foreground hover:bg-background hover:text-foreground'
          }`}
        >
          Design System Tokens
        </button>
        <button
          onClick={() => setActiveView('components')}
          className={`px-[12px] py-[6px] rounded-soft text-body-sm font-semibold transition-colors ${
            activeView === 'components'
              ? 'bg-primary text-surface'
              : 'text-muted-foreground hover:bg-background hover:text-foreground'
          }`}
        >
          shadcn/ui Primitive Components
        </button>
      </div>

      {activeView === 'tokens' ? <TokenPreview /> : <ComponentPreview />}
    </div>
  );
}

export default App;
