import * as React from 'react';

import { ComponentPreview } from './dev/ComponentPreview';
import { SharedComponentPreview } from './dev/SharedComponentPreview';
import { TokenPreview } from './dev/TokenPreview';

function App() {
  // TEMPORARY — State toggle to preview baseline tokens, shadcn primitives, or shared components.
  // This temporary workspace routing pattern will be replaced by standard React Router once real routing is introduced.
  const [activeView, setActiveView] = React.useState<
    'tokens' | 'primitives' | 'shared'
  >('shared');

  return (
    <div className="relative">
      {/* Diagnostic Navigation Toggle Header */}
      <div className="bg-surface border-b border-border py-[8px] px-[16px] flex justify-center flex-wrap gap-[12px] sticky top-0 z-50 shadow-card">
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
          onClick={() => setActiveView('primitives')}
          className={`px-[12px] py-[6px] rounded-soft text-body-sm font-semibold transition-colors ${
            activeView === 'primitives'
              ? 'bg-primary text-surface'
              : 'text-muted-foreground hover:bg-background hover:text-foreground'
          }`}
        >
          shadcn/ui Primitives
        </button>
        <button
          onClick={() => setActiveView('shared')}
          className={`px-[12px] py-[6px] rounded-soft text-body-sm font-semibold transition-colors ${
            activeView === 'shared'
              ? 'bg-primary text-surface'
              : 'text-muted-foreground hover:bg-background hover:text-foreground'
          }`}
        >
          Shared Components
        </button>
      </div>

      {activeView === 'tokens' && <TokenPreview />}
      {activeView === 'primitives' && <ComponentPreview />}
      {activeView === 'shared' && <SharedComponentPreview />}
    </div>
  );
}

export default App;
