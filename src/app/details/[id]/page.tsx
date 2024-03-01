import { MediaDetails } from "~/components/MediaDetails";
import { getMediaDetails } from "~/actions/getMediaDetails";
import { Suspense } from "react";

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const details = await getMediaDetails(params.id);
  return (
    <main className="mx-auto w-1/2 p-4 text-peach">
      <Suspense>
        <MediaDetails details={details} />
      </Suspense>
    </main>
  );
}
