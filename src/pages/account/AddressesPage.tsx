import React from 'react';
import { EmptyState } from 'src/components/shared/EmptyState';
import { Button } from 'src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from 'src/components/ui/dialog';
import { Input } from 'src/components/ui/input';
import { Skeleton } from 'src/components/ui/skeleton';
import {
  useGetAddressesQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} from 'src/features/account/accountApi';
import { useToast } from 'src/hooks/use-toast';
import { type Address } from 'src/types/address';

const initialAddressState: Omit<Address, 'id'> = {
  firstName: '',
  lastName: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'United States',
  phone: '',
};

export default function AddressesPage() {
  const { toast } = useToast();
  const { data: addresses, isLoading } = useGetAddressesQuery();
  const [addAddress] = useAddAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();

  const [isDialogOpen, setIsOpen] = React.useState(false);
  const [editingAddress, setEditingAddress] = React.useState<Address | null>(
    null,
  );
  const [formState, setFormState] =
    React.useState<Omit<Address, 'id'>>(initialAddressState);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Set form values when opening dialog for add vs edit
  const handleOpenAdd = () => {
    setEditingAddress(null);
    setFormState(initialAddressState);
    setIsOpen(true);
  };

  const handleOpenEdit = (address: Address) => {
    setEditingAddress(address);
    setFormState({
      firstName: address.firstName,
      lastName: address.lastName,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || '',
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      phone: address.phone,
    });
    setIsOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formState.firstName ||
      !formState.lastName ||
      !formState.addressLine1 ||
      !formState.city ||
      !formState.state ||
      !formState.postalCode ||
      !formState.phone
    ) {
      toast({
        title: 'Validation Error',
        description: 'Please complete all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingAddress) {
        await updateAddress({
          ...formState,
          id: editingAddress.id,
        }).unwrap();
        toast({
          title: 'Address Updated',
          description: 'Your shipping address was successfully updated.',
        });
      } else {
        await addAddress(formState).unwrap();
        toast({
          title: 'Address Added',
          description: 'A new shipping address was successfully created.',
        });
      }
      setIsOpen(false);
    } catch {
      toast({
        title: 'Error Saving Address',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this address?')) {
      try {
        await deleteAddress(id).unwrap();
        toast({
          title: 'Address Deleted',
          description: 'The selected address was removed from your book.',
        });
      } catch {
        toast({
          title: 'Deletion Failed',
          description: 'We could not delete this address. Please try again.',
          variant: 'destructive',
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-[32px] font-sans">
        <div className="space-y-[8px]">
          <Skeleton className="h-[36px] w-[240px]" />
          <Skeleton className="h-[20px] w-[380px]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          <Skeleton className="h-[180px] w-full rounded-soft" />
          <Skeleton className="h-[180px] w-full rounded-soft" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-[32px] font-sans">
      <header className="flex flex-wrap items-center justify-between gap-[16px] border-b border-border/60 pb-[24px]">
        <div className="space-y-[4px]">
          <h1 className="text-heading-md font-bold tracking-tight text-primary-text">
            Address Book
          </h1>
          <p className="text-body-sm text-muted-foreground">
            Manage your default shipping destinations and billing credentials.
          </p>
        </div>
        <Button onClick={handleOpenAdd}>Add New Address</Button>
      </header>

      {addresses && addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="border border-border/80 rounded-soft p-[20px] bg-surface/50 hover:bg-surface/90 transition-all flex flex-col justify-between"
            >
              <div className="space-y-[12px]">
                <div className="flex items-center justify-between">
                  <h3 className="text-body-sm font-semibold text-primary-text">
                    {address.firstName} {address.lastName}
                  </h3>
                </div>
                <div className="text-body-sm text-muted-foreground leading-relaxed space-y-[2px]">
                  <p>{address.addressLine1}</p>
                  {address.addressLine2 && <p>{address.addressLine2}</p>}
                  <p>
                    {address.city}, {address.state} {address.postalCode}
                  </p>
                  <p>{address.country}</p>
                  <p className="pt-[4px] text-body-xs font-mono">
                    {address.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-[12px] pt-[20px] border-t border-border/30 mt-[20px]">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenEdit(address)}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => handleDelete(address.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No addresses found"
          description="Your address book is empty. Add a shipping address to speed up your checkout checkout experience."
          action={<Button onClick={handleOpenAdd}>Create First Address</Button>}
        />
      )}

      {/* Add / Edit Address Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </DialogTitle>
            <DialogDescription>
              Provide the shipping credentials and contact coordinates for
              package routing.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-[16px] py-[12px]">
            <div className="grid grid-cols-2 gap-[12px]">
              <div className="space-y-[6px]">
                <label className="text-body-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  First Name *
                </label>
                <Input
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleInputChange}
                  placeholder="Patricia"
                  required
                />
              </div>
              <div className="space-y-[6px]">
                <label className="text-body-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Last Name *
                </label>
                <Input
                  name="lastName"
                  value={formState.lastName}
                  onChange={handleInputChange}
                  placeholder="Hale"
                  required
                />
              </div>
            </div>

            <div className="space-y-[6px]">
              <label className="text-body-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Address Line 1 *
              </label>
              <Input
                name="addressLine1"
                value={formState.addressLine1}
                onChange={handleInputChange}
                placeholder="123 Luxury Way"
                required
              />
            </div>

            <div className="space-y-[6px]">
              <label className="text-body-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Address Line 2 (Optional)
              </label>
              <Input
                name="addressLine2"
                value={formState.addressLine2}
                onChange={handleInputChange}
                placeholder="Apt 4B"
              />
            </div>

            <div className="grid grid-cols-3 gap-[12px]">
              <div className="space-y-[6px]">
                <label className="text-body-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  City *
                </label>
                <Input
                  name="city"
                  value={formState.city}
                  onChange={handleInputChange}
                  placeholder="San Francisco"
                  required
                />
              </div>
              <div className="space-y-[6px]">
                <label className="text-body-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  State *
                </label>
                <Input
                  name="state"
                  value={formState.state}
                  onChange={handleInputChange}
                  placeholder="CA"
                  required
                />
              </div>
              <div className="space-y-[6px]">
                <label className="text-body-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Zip *
                </label>
                <Input
                  name="postalCode"
                  value={formState.postalCode}
                  onChange={handleInputChange}
                  placeholder="94103"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-[12px]">
              <div className="space-y-[6px]">
                <label className="text-body-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Country *
                </label>
                <Input
                  name="country"
                  value={formState.country}
                  onChange={handleInputChange}
                  placeholder="United States"
                  required
                />
              </div>
              <div className="space-y-[6px]">
                <label className="text-body-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Phone *
                </label>
                <Input
                  name="phone"
                  value={formState.phone}
                  onChange={handleInputChange}
                  placeholder="415-555-0199"
                  required
                />
              </div>
            </div>

            <DialogFooter className="pt-[12px]">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? 'Saving...'
                  : editingAddress
                    ? 'Update'
                    : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
