import { usePingQuery } from 'src/api/temp-ping';
import { Container } from 'src/components/shared/Container';
import { SectionHeading } from 'src/components/shared/SectionHeading';
import { Skeleton } from 'src/components/ui/skeleton';

/**
 * TEMPORARY DIAGNOSTIC API PAGE — PENDING DELETION AS FIRST STEP OF M7.
 * Used exclusively to test RTK Query baseQuery config and MSW mocking switch.
 */
export default function ApiPreviewPage() {
  const { data, error, isLoading, isError } = usePingQuery();

  return (
    <Container className="py-[48px] space-y-[24px]">
      <SectionHeading
        title="Diagnostic API & State Preview"
        description="Verifies the RTK Query cache pipeline and MSW mock interception switching. Temporary page."
        align="left"
      />

      <div className="p-[24px] border border-border rounded-soft bg-surface space-y-[16px] max-w-[600px]">
        <h3 className="text-body-sm font-bold uppercase tracking-wider text-muted-foreground">
          Ping Query Status
        </h3>

        {isLoading && (
          <div className="space-y-[8px]">
            <Skeleton className="h-[20px] w-[180px]" />
            <Skeleton className="h-[14px] w-[240px]" />
          </div>
        )}

        {isError && (
          <div className="p-[16px] rounded-soft bg-error/10 text-error text-body-sm font-semibold border border-error/20">
            Ping failed: {JSON.stringify(error) || 'Connection Error'}
          </div>
        )}

        {data && (
          <div className="p-[16px] rounded-soft bg-success/10 text-success text-body-sm font-semibold border border-success/20">
            Ping response: {data.status} (intercepted by MSW successfully)
          </div>
        )}
      </div>
    </Container>
  );
}
