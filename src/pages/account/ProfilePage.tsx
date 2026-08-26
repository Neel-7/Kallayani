import React from 'react';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import { Skeleton } from 'src/components/ui/skeleton';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  type UserProfile,
} from 'src/features/account/accountApi';
import { useToast } from 'src/hooks/use-toast';

export default function ProfilePage() {
  const { toast } = useToast();
  const { data: profile, isLoading } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();

  const [formState, setFormState] = React.useState<Omit<UserProfile, 'id'>>({
    firstName: '',
    lastName: '',
    email: '',
    sizingPreference: '',
    communicationPreference: '',
  });

  const [isSaving, setIsSaving] = React.useState(false);

  // Sync state with fetched profile data
  React.useEffect(() => {
    if (profile) {
      const timer = setTimeout(() => {
        setFormState({
          firstName: profile.firstName || '',
          lastName: profile.lastName || '',
          email: profile.email || '',
          sizingPreference: profile.sizingPreference || '',
          communicationPreference: profile.communicationPreference || '',
        });
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.firstName || !formState.lastName || !formState.email) {
      toast({
        title: 'Validation Error',
        description: 'First name, last name, and email are required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    try {
      await updateProfile(formState).unwrap();
      toast({
        title: 'Profile Updated',
        description:
          'Your personal preferences and details have been successfully saved.',
      });
    } catch {
      toast({
        title: 'Update Failed',
        description:
          'We encountered an error saving your preferences. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-[32px] font-sans">
        <div className="space-y-[8px]">
          <Skeleton className="h-[36px] w-[240px]" />
          <Skeleton className="h-[20px] w-[380px]" />
        </div>
        <div className="space-y-[24px] max-w-[600px]">
          <Skeleton className="h-[40px] w-full" />
          <Skeleton className="h-[40px] w-full" />
          <Skeleton className="h-[40px] w-full" />
          <Skeleton className="h-[120px] w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-[32px] font-sans">
      <header className="border-b border-border/60 pb-[24px]">
        <h1 className="text-heading-md font-bold tracking-tight text-primary-text mb-[8px]">
          Personal Profile
        </h1>
        <p className="text-body-sm text-muted-foreground">
          Configure your personal details, communications log, and luxury fit
          templates.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-[24px] max-w-[600px]">
        {/* Basic Name Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
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

        {/* Email Address */}
        <div className="space-y-[6px]">
          <label className="text-body-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Email Address *
          </label>
          <Input
            name="email"
            type="email"
            value={formState.email}
            onChange={handleInputChange}
            placeholder="patricia@example.com"
            required
          />
        </div>

        {/* Sizing Preference Dropdown */}
        <div className="space-y-[6px]">
          <label className="text-body-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Sizing Preference
          </label>
          <Select
            value={formState.sizingPreference}
            onValueChange={(val) => handleSelectChange('sizingPreference', val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select sizing template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="XS">
                XS — Extra Small (Couture Size 0-2)
              </SelectItem>
              <SelectItem value="S">
                S — Small (Couture Size 4-6)
              </SelectItem>
              <SelectItem value="M">
                M — Medium (Couture Size 8-10)
              </SelectItem>
              <SelectItem value="L">
                L — Large (Couture Size 12-14)
              </SelectItem>
              <SelectItem value="XL">
                XL — Extra Large (Couture Size 16-18)
              </SelectItem>
              <SelectItem value="XXL">
                XXL — Double Extra Large (Couture Size 20-22)
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-body-xs text-muted-foreground leading-relaxed mt-[4px]">
            Your sizing preferences are referenced automatically to highlight
            ideal fits as you explore our heritage curation.
          </p>
        </div>

        {/* Communications Preference Dropdown */}
        <div className="space-y-[6px]">
          <label className="text-body-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Communication Preference
          </label>
          <Select
            value={formState.communicationPreference}
            onValueChange={(val) =>
              handleSelectChange('communicationPreference', val)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select dispatch preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">
                Email only (Couture Lookbooks & Receipts)
              </SelectItem>
              <SelectItem value="sms">
                SMS only (Real-time shipping notifications)
              </SelectItem>
              <SelectItem value="both">Both Email and SMS</SelectItem>
              <SelectItem value="none">
                Do not contact (Silence notifications)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="pt-[12px] border-t border-border/40">
          <Button
            type="submit"
            disabled={isSaving}
            className="w-full sm:w-auto px-[32px]"
          >
            {isSaving ? 'Saving Changes...' : 'Save Preferences'}
          </Button>
        </div>
      </form>
    </div>
  );
}

