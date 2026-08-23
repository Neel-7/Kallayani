import * as React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../components/ui/sheet';
import { Skeleton } from '../components/ui/skeleton';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import { Toaster } from '../components/ui/toaster';
import { useToast } from '../hooks/use-toast';

export function ComponentPreview() {
  const { toast } = useToast();
  const [inputValue, setInputValue] = React.useState('Pre-filled state');

  return (
    <div className="min-h-screen bg-background text-foreground p-[32px] font-sans xs:p-[16px] md:p-[32px] lg:p-[48px]">
      <header className="mb-[48px] border-b border-border pb-[24px]">
        <h1 className="text-display-lg font-display text-primary">
          Kallayani Primitive UI Components
        </h1>
        <p className="text-body-lg text-muted-foreground mt-[8px]">
          Diagnostic Components Preview Page — Baseline System Primitives (Phase
          1 / M3)
        </p>
        <p className="text-caption text-secondary mt-[4px]">
          Temporary View — Mapped strictly to M2 brand design tokens
        </p>
      </header>

      <main className="space-y-[48px]">
        {/* 1. Button Primitive */}
        <section className="space-y-[16px] border border-border p-[24px] rounded-soft bg-surface shadow-card">
          <h3 className="text-heading-sm font-semibold text-primary font-display border-b border-border pb-[8px]">
            Button
          </h3>
          <div className="flex flex-wrap gap-[16px] items-center">
            <div>
              <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
                Default / Primary
              </span>
              <Button>Primary CTA</Button>
            </div>
            <div>
              <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
                Secondary
              </span>
              <Button variant="secondary">Secondary Button</Button>
            </div>
            <div>
              <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
                Outline
              </span>
              <Button variant="outline">Outline Button</Button>
            </div>
            <div>
              <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
                Disabled
              </span>
              <Button disabled>Disabled Button</Button>
            </div>
          </div>
        </section>

        {/* 2. Input Primitive */}
        <section className="space-y-[16px] border border-border p-[24px] rounded-soft bg-surface shadow-card">
          <h3 className="text-heading-sm font-semibold text-primary font-display border-b border-border pb-[8px]">
            Input
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
            <div>
              <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
                Empty State / Placeholder
              </span>
              <Input type="text" placeholder="Enter text here..." />
            </div>
            <div>
              <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
                Pre-filled State
              </span>
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div>
              <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
                Disabled State
              </span>
              <Input type="text" value="Disabled input text" disabled />
            </div>
          </div>
        </section>

        {/* 3. Select Primitive */}
        <section className="space-y-[16px] border border-border p-[24px] rounded-soft bg-surface shadow-card">
          <h3 className="text-heading-sm font-semibold text-primary font-display border-b border-border pb-[8px]">
            Select
          </h3>
          <div className="max-w-[280px]">
            <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
              Trigger & Closed/Open State
            </span>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option-1">Option One</SelectItem>
                <SelectItem value="option-2">Option Two</SelectItem>
                <SelectItem value="option-3">Option Three</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* 4. Dialog Primitive */}
        <section className="space-y-[16px] border border-border p-[24px] rounded-soft bg-surface shadow-card">
          <h3 className="text-heading-sm font-semibold text-primary font-display border-b border-border pb-[8px]">
            Dialog (Modal)
          </h3>
          <div>
            <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
              Modal Trigger
            </span>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Sample Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-display text-primary">
                    Sample Dialog Header
                  </DialogTitle>
                  <DialogDescription>
                    This is a generic primitive modal dialog context. Tab index
                    focus locking and keyboard triggers are active.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-[16px]">
                  <p className="text-body-sm">
                    Generic diagnostic copy. Every color matches M2 tokens.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* 5. Sheet Primitive */}
        <section className="space-y-[16px] border border-border p-[24px] rounded-soft bg-surface shadow-card">
          <h3 className="text-heading-sm font-semibold text-primary font-display border-b border-border pb-[8px]">
            Sheet (Side Drawer)
          </h3>
          <div>
            <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
              Drawer Trigger (Right Side)
            </span>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open Drawer Sheet</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="font-display text-primary">
                    Sample Drawer Content
                  </SheetTitle>
                  <SheetDescription>
                    This is a generic side-sheet sliding drawer. Ideal for cart
                    and hamburger contexts.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-[24px]">
                  <p className="text-body-sm text-muted-foreground">
                    Content is mapped strictly to standard background and
                    surface tokens.
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </section>

        {/* 6. Dropdown Menu Primitive */}
        <section className="space-y-[16px] border border-border p-[24px] rounded-soft bg-surface shadow-card">
          <h3 className="text-heading-sm font-semibold text-primary font-display border-b border-border pb-[8px]">
            Dropdown Menu
          </h3>
          <div>
            <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
              Menu Trigger
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary">Trigger Dropdown</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Label Heading</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Item One</DropdownMenuItem>
                <DropdownMenuItem>Item Two</DropdownMenuItem>
                <DropdownMenuItem>Item Three</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </section>

        {/* 7. Tabs Primitive */}
        <section className="space-y-[16px] border border-border p-[24px] rounded-soft bg-surface shadow-card">
          <h3 className="text-heading-sm font-semibold text-primary font-display border-b border-border pb-[8px]">
            Tabs
          </h3>
          <div>
            <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
              Tab Switching Context
            </span>
            <Tabs defaultValue="tab-1" className="max-w-[400px]">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="tab-1">Tab One</TabsTrigger>
                <TabsTrigger value="tab-2">Tab Two</TabsTrigger>
              </TabsList>
              <TabsContent
                value="tab-1"
                className="p-[16px] border border-border mt-[8px] rounded-soft bg-background"
              >
                <h4 className="text-body-md font-semibold">
                  Tab Content Heading One
                </h4>
                <p className="text-body-sm text-muted-foreground mt-[4px]">
                  Placeholder details for tab one. Fully keyboard navigable.
                </p>
              </TabsContent>
              <TabsContent
                value="tab-2"
                className="p-[16px] border border-border mt-[8px] rounded-soft bg-background"
              >
                <h4 className="text-body-md font-semibold">
                  Tab Content Heading Two
                </h4>
                <p className="text-body-sm text-muted-foreground mt-[4px]">
                  Alternative text block for the second interactive tab
                  container.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* 8. Accordion Primitive */}
        <section className="space-y-[16px] border border-border p-[24px] rounded-soft bg-surface shadow-card">
          <h3 className="text-heading-sm font-semibold text-primary font-display border-b border-border pb-[8px]">
            Accordion
          </h3>
          <div className="max-w-[500px]">
            <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
              Collapsible Panel Stack (Item 1 expanded by default)
            </span>
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>Accordion Trigger One</AccordionTrigger>
                <AccordionContent>
                  This is the expanded text block contents for Accordion item 1.
                  Standard transition-height animation applies.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Accordion Trigger Two</AccordionTrigger>
                <AccordionContent>
                  This is the expanded text block contents for Accordion item 2.
                  Re-triggering collapses previous blocks.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* 9. Badge Primitive */}
        <section className="space-y-[16px] border border-border p-[24px] rounded-soft bg-surface shadow-card">
          <h3 className="text-heading-sm font-semibold text-primary font-display border-b border-border pb-[8px]">
            Badge
          </h3>
          <div className="flex flex-wrap gap-[12px] items-center">
            <div>
              <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
                Default Badge
              </span>
              <Badge>Sample Badge</Badge>
            </div>
            <div>
              <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
                Secondary Variant
              </span>
              <Badge variant="secondary">Secondary Badge</Badge>
            </div>
            <div>
              <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
                Outline Variant
              </span>
              <Badge variant="outline">Outline Badge</Badge>
            </div>
          </div>
        </section>

        {/* 10. Skeleton Primitive */}
        <section className="space-y-[16px] border border-border p-[24px] rounded-soft bg-surface shadow-card">
          <h3 className="text-heading-sm font-semibold text-primary font-display border-b border-border pb-[8px]">
            Skeleton Loader
          </h3>
          <div>
            <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
              Animated Profile Card Placeholder
            </span>
            <div className="flex items-center space-x-[16px] p-[16px] bg-background border border-border rounded-soft max-w-[320px]">
              <Skeleton className="h-[48px] w-[48px] rounded-full shrink-0" />
              <div className="space-y-[8px] flex-1">
                <Skeleton className="h-[16px] w-[80%]" />
                <Skeleton className="h-[12px] w-[60%]" />
              </div>
            </div>
          </div>
        </section>

        {/* 11. Toast Primitive */}
        <section className="space-y-[16px] border border-border p-[24px] rounded-soft bg-surface shadow-card">
          <h3 className="text-heading-sm font-semibold text-primary font-display border-b border-border pb-[8px]">
            Toast Alerts
          </h3>
          <div>
            <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
              Trigger Floating Alert Toast
            </span>
            <Button
              onClick={() => {
                toast({
                  title: 'Success Event Alert',
                  description:
                    'This is a generic popup toast description alert.',
                });
              }}
            >
              Trigger Success Toast
            </Button>
          </div>
        </section>
      </main>

      <footer className="mt-[64px] border-t border-border pt-[24px] text-center text-caption text-muted-foreground">
        Kallayani — Phase 1 (M3) Complete and Verified.
      </footer>

      {/* Mounting Toaster for Toast render tree portals */}
      <Toaster />
    </div>
  );
}
