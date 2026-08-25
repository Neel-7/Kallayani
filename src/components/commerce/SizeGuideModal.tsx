import { Button } from 'src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/ui/dialog';

/**
 * SizeGuideModal displays standard garment sizing charts.
 * Leverages the themed shadcn/ui Dialog primitive per blueprint constraints.
 */
export function SizeGuideModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="p-0 h-auto text-caption font-semibold text-primary underline"
        >
          View Size Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="font-display text-primary text-heading-sm">
            Size Guide Chart
          </DialogTitle>
          <DialogDescription className="text-caption">
            Standard measurements mapped in inches (whole-garment sizing
            guidelines).
          </DialogDescription>
        </DialogHeader>
        <div className="py-[16px] overflow-x-auto">
          <table className="w-full text-left text-body-sm font-sans border-collapse">
            <thead>
              <tr className="border-b border-border text-muted-foreground font-semibold text-caption">
                <th className="pb-[8px]">Size</th>
                <th className="pb-[8px]">Chest (in)</th>
                <th className="pb-[8px]">Waist (in)</th>
                <th className="pb-[8px]">Hips (in)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-foreground font-medium">
              <tr>
                <td className="py-[10px]">XS</td>
                <td className="py-[10px]">32 - 33</td>
                <td className="py-[10px]">24 - 25</td>
                <td className="py-[10px]">34 - 35</td>
              </tr>
              <tr>
                <td className="py-[10px]">S</td>
                <td className="py-[10px]">34 - 35</td>
                <td className="py-[10px]">26 - 27</td>
                <td className="py-[10px]">36 - 37</td>
              </tr>
              <tr>
                <td className="py-[10px]">M</td>
                <td className="py-[10px]">36 - 37</td>
                <td className="py-[10px]">28 - 29</td>
                <td className="py-[10px]">38 - 39</td>
              </tr>
              <tr>
                <td className="py-[10px]">L</td>
                <td className="py-[10px]">38 - 40</td>
                <td className="py-[10px]">30 - 32</td>
                <td className="py-[10px]">40 - 42</td>
              </tr>
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
