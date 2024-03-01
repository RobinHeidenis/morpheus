export default function AboutPage() {
  return (
    <main className="mx-auto w-1/2 p-4 text-peach">
      <h1 className="text-center text-6xl text-peach">About</h1>
      <div
        className={
          "mt-5 flex w-full flex-col gap-y-3 rounded-lg border border-peach p-5"
        }
      >
        <p>
          This project was created because I think the original{" "}
          <code>watchsomuch.to</code> website is really ugly, and I wanted to
          make a better version of it.
        </p>
        <p>
          This is for education purposes only, and I do not condone piracy.
          Please be careful when downloading movies and TV shows, and make sure
          you are not breaking any laws in your country.
        </p>
        <p>
          This website gets data from <code>watchsomuch.to</code>. Personally, I
          think the <code>watchsomuch.to</code> site was created by a spawn from
          hell. It was a nightmare to work with. They do not have an API, nor do
          they use JSON. They just return HTML from the server. On my end, I
          have to parse the HTML and extract the relevant data (which really
          sucks).
        </p>
        <p>
          For searching, this website and <code>watchsomuch.to</code> (at least
          for autcompletion) use an undocumented(?) IMDB api, located at{" "}
          <code>https://v2.sg.media-imdb.com/suggests/t/searchTerm.json</code>
        </p>
        <p>
          I am unable to understand how searching works on the original{" "}
          <code>watchsomuch.to</code> website. It is honestly a mystery to me.
          It appears as though they load every single possible movie and show
          into your local memory and then filter on the client (???). I have no
          idea how it works.
        </p>
        <p>
          I am not affiliated with <code>watchsomuch.to</code> in any way. I
          just wanted to make a better version of their website.
        </p>
        <p>
          Originally I wanted to make this website using Solid Start, but I had
          a lot of trouble with data fetching. I tried for a couple hours, and
          ultimately gave up. The docs need a lot of work before it&apos;s
          properly usable (I know it is in beta right now).
        </p>
        <p>
          Currently, this website is built using the NextJS App Router. I had
          not used that before (pages gang), and wanted to try it out. I&apos;ve
          learned a lot about server components and how to use them.
        </p>
        <p>
          I wanted to make the download page a modal, or maybe a collapsable
          section on the page, but everything I tried resulted in an infinite
          loop due to the download info fetching.
        </p>
        <p>
          The source code for this website is available on{" "}
          <a
            href="https://github.com/RobinHeidenis/morpheus"
            className={"underline decoration-green"}
          >
            GitHub
          </a>
        </p>
        <p>
          And that&apos;s about it. I hope you enjoy the website. If you have
          any questions, feel free to file an issue on GitHub.
        </p>
        <p>- Robin</p>
      </div>
    </main>
  );
}
