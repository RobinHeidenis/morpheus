import { getDownloadDetails } from "~/actions/getDownloadDetails";

export default async function DownloadPage({
  params,
}: {
  params: { id: string; downloadId: string };
}) {
  const data = await getDownloadDetails(params.id, params.downloadId);

  return (
    <main className="mx-auto w-1/2 p-4 text-peach">
      <h1 className="text-center text-6xl text-peach">Download</h1>
      <div
        className={
          "mt-5 flex flex-col items-center rounded-lg border border-peach pb-5"
        }
      >
        <h2 className={"mt-5 text-xl"}>You&apos;re downloading:</h2>
        <h3 className="text-md leading-6">{data.name}</h3>
        <h4 className="mt-5 text-lg font-normal leading-5">Download info</h4>
        <div className="mt-4 flex flex-col items-center text-text">
          <table className={"table-auto border-collapse"}>
            <thead className={"bg-surface0"}>
              <tr>
                <th className={"border border-surface1 p-2 text-start"}>
                  Attribute
                </th>
                <th className={"border border-surface1 p-2 text-start"}>
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.info ?? {}).map(([key, value]) => (
                <tr key={key}>
                  <td className={"border border-surface1 p-2"}>{key}</td>
                  <td className={"border border-surface1 p-2"}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={"mt-10 flex flex-col gap-y-5"}>
            {data.downloadLinks.map((link) => (
              <a
                href={link.href}
                key={link.title}
                className={
                  "w-96 rounded-3xl border border-green p-2 text-center"
                }
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
