
"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Filter,
  Search,
  ShieldCheck,
  Trophy,
  X,
  Zap,
} from "lucide-react";

type PremierPatchCard = {
  primary: number;
  Year: number | null;
  Player: string | null;
  Team: string | null;
  Checklist: string | null;
  "Card Number": string | null;
  Pulled: boolean | null;
  "Pulled Date": string | null;
  "Source / Evidence URL": string | null;
  Notes: string | null;
};

type FilterOption = "All" | "Pulled" | "Missing";

type HomeProps = {
  initialCards: PremierPatchCard[];
  initialError: string | null;
};

export default function Home({ initialCards, initialError }: HomeProps) {
  const [cards] = useState<PremierPatchCard[]>(initialCards);
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const pulledCards = useMemo(
    () => cards.filter((card) => card.Pulled === true),
    [cards]
  );

  const missingCards = cards.length - pulledCards.length;
  const completion =
    cards.length > 0
      ? Math.round((pulledCards.length / cards.length) * 100)
      : 0;

  const filteredCards = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return cards.filter((card) => {
      const matchesFilter =
        activeFilter === "All" ||
        (activeFilter === "Pulled" && card.Pulled === true) ||
        (activeFilter === "Missing" && card.Pulled !== true);

      const searchableText = [
        card.Player,
        card.Team,
        card.Checklist,
        card["Card Number"],
        card.Notes,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesFilter && (!query || searchableText.includes(query));
    });
  }, [cards, activeFilter, searchQuery]);

  const recentHits = useMemo(
    () =>
      [...pulledCards]
        .sort((a, b) => {
          const dateA = a["Pulled Date"]
            ? new Date(a["Pulled Date"]).getTime()
            : 0;
          const dateB = b["Pulled Date"]
            ? new Date(b["Pulled Date"]).getTime()
            : 0;
          return dateB - dateA;
        })
        .slice(0, 3),
    [pulledCards]
  );

  function formatDate(date: string | null) {
    if (!date) return "—";
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return date;

    return parsed.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#090909] text-[#F4F0E7]">
      {/* Background texture and atmosphere */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(125deg,transparent_0px,transparent_3px,rgba(255,255,255,.16)_4px,transparent_5px)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(178,132,43,.16),transparent_55%)]" />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">

        {/* NAVIGATION */}
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#A98945]/40 py-5">
          <a href="#" className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center border-2 border-[#D8B65F] bg-gradient-to-br from-[#29251A] to-black shadow-[0_0_18px_rgba(207,169,78,.2)] [clip-path:polygon(0_0,100%_0,100%_78%,50%_100%,0_78%)]">
              <span className="text-lg font-black italic tracking-tighter text-[#E8CC83]">
                TT
              </span>
            </div>
            <div>
              <div className="text-xl font-black italic tracking-tight text-white sm:text-2xl">
                THREAD<span className="text-[#D9B65D]">TRACKER</span>
              </div>
              <div className="text-[9px] font-bold tracking-[0.25em] text-[#B8A77E]">
                THE PREMIER PATCH TRACKER
              </div>
            </div>
          </a>
        </header>

        {/* HERO */}
        <section className="relative overflow-hidden border border-[#B48C3C] bg-[#111112] shadow-[0_20px_80px_rgba(0,0,0,.65)]">
          <div className="relative px-4 pb-7 pt-9 sm:px-10 sm:pb-9 sm:pt-12">
            <div className="w-full overflow-hidden">
              <div className="flex">
                <nav className="flex flex-wrap items-center gap-3 text-sm font-bold tracking-wider text-[#B9A77D] sm:gap-5">
                  <a
                    href="#checklist"
                    className="transition hover:text-[#E6C979]"
                  >
                    CHECKLIST
                  </a>
                </nav>
              </div>
                 <div className="relative mx-auto grid max-w-[1050px] grid-cols-3 border-y border-[#B89447]/60 py-5 sm:mt-2 sm:py-7">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-black italic tabular-nums text-[#E6C46E] sm:text-5xl">
                    {pulledCards.length}
                  </span>
                  <CheckCircle2 className="hidden h-6 w-6 text-[#D9B65D] sm:block" />
                </div>
                <div className="mt-1 text-[9px] font-black italic tracking-[0.2em] text-[#D6C48F] sm:text-xs">
                  PULLED
                </div>
              </div>

              <div className="border-x border-[#8F7137]/60 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-black italic tabular-nums text-[#E5E0D5] sm:text-5xl">
                    {missingCards}
                  </span>
                  <Clock3 className="hidden h-6 w-6 text-[#BDB9AE] sm:block" />
                </div>
                <div className="mt-1 text-[9px] font-black italic tracking-[0.2em] text-[#BDB9AE] sm:text-xs">
                  MISSING
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-3xl font-black italic tabular-nums text-[#E6C46E] sm:text-5xl">
                    {completion}
                  </span>
                  <span className="text-xl font-black italic text-[#E6C46E] sm:text-3xl">
                    %
                  </span>
                </div>
                <div className="mt-1 text-[9px] font-black italic tracking-[0.2em] text-[#D6C48F] sm:text-xs">
                  COMPLETE
                </div>
              </div>
            </div>
              <img
                 src="/hero.png"
                alt="PREM1ERE 2026 Topps Chrome Football Premier Patch"
                className="block h-auto w-full"
                />
            </div>
          </div>
        </section>

        {/* CHECKLIST */}
        <section id="checklist" className="mb-16 scroll-mt-6">
          <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-block -skew-x-12 bg-gradient-to-r from-[#F1D47D] to-[#B58A32] px-5 py-2">
                <span className="block skew-x-12 text-[11px] font-black italic tracking-wider text-[#17130C]">
                  THE CHECKLIST
                </span>
              </div>
              <h2 className="text-3xl font-black italic leading-tight tracking-tight sm:text-5xl">
                THE CHASE
                <span className="text-[#D5AC50]"> IS ON.</span>
              </h2>
              <p className="mt-2 text-sm text-[#99958B]">
                2026 Topps Chrome Football Premier Patch.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#B9AC8C]">
              <ShieldCheck className="h-4 w-4 text-[#D1AC57]" />
              {cards.length} checklist entries
            </div>
          </div>

          {initialError && (
            <div className="mb-5 border border-red-500/30 bg-red-950/30 p-4 text-sm text-red-300">
              Could not load checklist data: {initialError}
            </div>
          )}

          {/* Search and filter controls */}
          <div className="mb-4 flex flex-col gap-3 border border-[#8F7137]/50 bg-[#151515] p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D2AD58]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search player, team or card number..."
                className="h-11 w-full border border-white/10 bg-[#090909] pl-10 pr-10 text-sm text-white outline-none placeholder:text-[#77736A] focus:border-[#C7A24E]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#99958B] hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Filter className="mr-1 h-4 w-4 text-[#C7A24E]" />
              {(["All", "Pulled", "Missing"] as FilterOption[]).map(
                (filter) => {
                  const isActive = activeFilter === filter;
                  const count =
                    filter === "All"
                      ? cards.length
                      : filter === "Pulled"
                        ? pulledCards.length
                        : missingCards;

                  return (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`flex items-center gap-2 border px-3 py-2 text-xs font-bold transition ${
                        isActive
                          ? "border-[#E0BD65] bg-gradient-to-b from-[#E4C66F] to-[#A77C2C] text-[#17130C]"
                          : "border-white/10 bg-[#0B0B0B] text-[#BDB7A9] hover:border-[#A98945] hover:text-[#E6C979]"
                      }`}
                    >
                      {filter}
                      <span className="text-[10px] opacity-70">{count}</span>
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* Existing table layout */}
          <div className="overflow-hidden border border-[#A98945]/50 bg-[#111112]">
            <div className="flex items-center justify-between border-b border-[#8F7137]/50 bg-[#201D17] px-4 py-3">
              <span className="text-[10px] font-black tracking-[0.2em] text-[#D9B967]">
                PREMIER PATCH CHECKLIST
              </span>
              <span className="text-[10px] tabular-nums text-[#B5A77F]">
                SHOWING {filteredCards.length} OF {cards.length}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#6F592F]/60 bg-[#191817]">
                    <th className="px-4 py-3 text-[9px] font-black tracking-[0.18em] text-[#BBA36D]">
                      STATUS
                    </th>
                    <th className="px-4 py-3 text-[9px] font-black tracking-[0.18em] text-[#BBA36D]">
                      PLAYER / TEAM
                    </th>
                    <th className="px-4 py-3 text-[9px] font-black tracking-[0.18em] text-[#BBA36D]">
                      CARD NUMBER
                    </th>
                    <th className="px-4 py-3 text-[9px] font-black tracking-[0.18em] text-[#BBA36D]">
                      CHECKLIST
                    </th>
                    <th className="px-4 py-3 text-[9px] font-black tracking-[0.18em] text-[#BBA36D]">
                      PULLED DATE
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCards.map((card, index) => {
                    const isPulled = card.Pulled === true;
                    const evidenceUrl = card["Source / Evidence URL"];

                    return (
                      <tr
                        key={card.primary}
                        className={`group border-b border-white/[0.07] transition hover:bg-[#292318]/70 ${
                          index % 2 === 0 ? "bg-[#141414]" : "bg-[#101010]"
                        }`}
                      >
                        <td className="px-4 py-4">
                          {isPulled ? (
                            <span className="inline-flex items-center gap-2 rounded-md border-2 border-emerald-400/70 bg-emerald-500/20 px-3 py-2 text-sm font-extrabold tracking-wider text-emerald-300 shadow-[0_0_14px_rgba(16,185,129,0.16)]">
                              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />
                              PULLED
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 border border-white/10 bg-white/[0.03] px-2 py-1 text-[9px] font-bold tracking-wider text-[#96938B]">
                              <Clock3 className="h-3 w-3" />
                              MISSING
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-4">
                          <div className="text-lg font-black leading-tight tracking-tight text-[#F3EDE0] transition group-hover:text-[#E4C778] sm:text-xl">
                            {card.Player || "Unknown Player"}
                          </div>
                          <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#B29A64]">
                            {card.Team || "Team not listed"}
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <span className="font-mono text-sm font-bold text-[#D8C99F]">
                            {card["Card Number"] || "—"}
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          <span className="text-xs text-[#C0B9AA]">
                            {card.Checklist || "—"}
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          {isPulled ? (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-[#CFC4A8]">
                                {formatDate(card["Pulled Date"])}
                              </span>
                              {evidenceUrl && (
                                <a
                                  href={evidenceUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  aria-label="View pull evidence"
                                  className="text-[#D6B45F] transition hover:text-[#FFF0B8]"
                                >
                                  <ArrowUpRight className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-[#68665F]">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredCards.length === 0 && (
              <div className="px-6 py-16 text-center">
                <Search className="mx-auto mb-3 h-7 w-7 text-[#A98945]" />
                <p className="font-bold text-[#D8D0C1]">No cards found</p>
                <p className="mt-1 text-sm text-[#77736B]">
                  Try another search or change your filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilter("All");
                  }}
                  className="mt-4 text-xs font-bold tracking-wider text-[#D5B66C] hover:text-[#F0D995]"
                >
                  CLEAR SEARCH AND FILTERS
                </button>
              </div>
            )}
          </div>
        </section>

        {/* RECENT HITS */}
        {/* <section id="recent-hits" className="mb-16 scroll-mt-6">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="h-5 w-[3px] bg-[#B21F27]" />
                <span className="text-[10px] font-black tracking-[0.25em] text-[#D5B66C]">
                  THE LATEST
                </span>
              </div>
              <h2 className="text-2xl font-black italic text-[#F1EBDD] sm:text-3xl">
                RECENT HITS
              </h2>
            </div>
            <Zap className="mb-1 h-6 w-6 text-[#D1AC57]" />
          </div>

          {recentHits.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-3">
              {recentHits.map((card) => (
                <div
                  key={card.primary}
                  className="border border-[#A88948]/35 bg-[#151515] p-4 transition hover:border-[#D0AD60]/80"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[9px] font-black tracking-[0.18em] text-[#D5B66C]">
                      CONFIRMED PULL
                    </span>
                    <CheckCircle2 className="h-4 w-4 text-[#D5B66C]" />
                  </div>
                  <h3 className="text-xl font-black text-[#F1EBDD]">
                    {card.Player}
                  </h3>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#B29A64]">
                    {card.Team}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="text-xs text-[#AFA99B]">
                      {card["Card Number"] || "Card number unavailable"}
                    </span>
                    <span className="text-[10px] text-[#C5A052]">
                      {formatDate(card["Pulled Date"])}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-white/10 bg-[#151515] px-5 py-8 text-center text-sm text-[#8F8B82]">
              No confirmed pulls yet. The first hit is waiting to be found.
            </div>
          )}
        </section> */}

        {/* ABOUT */}
        <section
          id="about"
          className="border-y border-[#A88948]/30 py-10 text-center"
        >
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center border border-[#A88948]/50 bg-[#B9954D]/10">
            <ShieldCheck className="h-5 w-5 text-[#D5B66C]" />
          </div>
          <h2 className="text-xl font-black italic tracking-tight text-[#E8DCC0]">
            BUILT FOR THE CHASE.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#969187]">
            Thread Tracker tracks the 2026 Topps Chrome Football Premier Patch
            checklist, bringing collectors together to follow the hunt,
            document confirmed pulls, and see what is still out there.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#969187]">
            Something missing? Pulled a premier patch yourself? Have a suggestion? Please send an email to <a href="mailto:brett@holofamecards.com">brett@holofamecards.com</a>
          </p>
        </section>

        {/* FOOTER */}
        <footer className="flex flex-col items-center justify-between gap-3 py-7 text-center sm:flex-row sm:text-left">
          <div>
            <div className="text-sm font-black italic tracking-wider text-[#D5B66C]">
              THREAD TRACKER
            </div>
            <div className="mt-1 text-[9px] tracking-[0.18em] text-[#77736B]">
              2026 TOPPS CHROME FOOTBALL PREMIER PATCH TRACKER
            </div>
          </div>
          <p className="text-[10px] text-[#77736B]">
            An independent collector tracking project. Not affiliated with Topps, the NFL or any other entity. <a href="mailto:brett@holofamecards.com">CONTACT</a>
          </p>
          <a
            href="https://ko-fi.com/threadtracker"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-yellow-600/60
              bg-yellow-500/10 px-4 py-2 text-sm font-semibold
              text-yellow-400 transition hover:bg-yellow-500/20"
          >
          ☕ Support ThreadTracker
        </a>
        </footer>
      </div>
    </main>
  );
}
