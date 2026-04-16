"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { ArrowLeft, Flag, Target, Wind, MapPin } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface SessionShotApi {
  _id: string;
  holeNumber: number;
  shotNumber: number;
  club: string | null;
  distance: number | null;
  direction: string | null;
  shotType: string | null;
  position: string | null;
  scoring: string | null;
  event: string | null;
  rawText: string;
  recordedAt: string;
  isValid: boolean;
}

interface SessionShotsResponse {
  status: boolean;
  message: string;
  data: SessionShotApi[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatTime(isoDate: string): string {
  return new Date(isoDate).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

const SCORING_META: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  eagle: { label: "Eagle", color: "#b45309", bg: "#fffbeb" },
  birdie: { label: "Birdie", color: "#15803d", bg: "#f0fdf4" },
  par: { label: "Par", color: "#1d4ed8", bg: "#eff6ff" },
  bogey: { label: "Bogey", color: "#dc2626", bg: "#fef2f2" },
  "double bogey": { label: "Double Bogey", color: "#9f1239", bg: "#fff1f2" },
};

const DIRECTION_META: Record<string, string> = {
  straight: "↑",
  right: "↗",
  left: "↖",
  "slight right": "↗",
  "slight left": "↖",
  "heavy right": "→",
  "heavy left": "←",
  draw: "↑",
  fade: "↑",
};

function groupByHole(shots: SessionShotApi[]): Map<number, SessionShotApi[]> {
  const map = new Map<number, SessionShotApi[]>();
  for (const shot of shots) {
    const existing = map.get(shot.holeNumber) ?? [];
    existing.push(shot);
    map.set(shot.holeNumber, existing);
  }
  return map;
}

// ─── Shot Card ────────────────────────────────────────────────────────────────
function ShotCard({ shot }: { shot: SessionShotApi }) {
  const dirArrow = shot.direction
    ? (DIRECTION_META[shot.direction.toLowerCase()] ?? "•")
    : null;

  const scoringInfo = shot.scoring
    ? (SCORING_META[shot.scoring.toLowerCase()] ?? null)
    : null;

  return (
    <div className="flex items-start gap-3">
      {/* Shot number bubble + connector */}
      <div className="flex flex-col items-center pt-1">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style={{ backgroundColor: "#1a5c38" }}
        >
          {shot.shotNumber}
        </div>
      </div>

      {/* Card */}
      <div
        className="flex-1 rounded-xl border border-gray-100 bg-white px-4 py-3 mb-3 shadow-sm"
        style={{ borderLeft: "3px solid #1a5c38" }}
      >
        {/* Top row: badges + time */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {shot.club && (
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: "#1a5c38" }}
            >
              {shot.club}
            </span>
          )}
          {shot.shotType && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 capitalize">
              {shot.shotType}
            </span>
          )}
          {scoringInfo && (
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-bold capitalize"
              style={{
                color: scoringInfo.color,
                backgroundColor: scoringInfo.bg,
              }}
            >
              {scoringInfo.label}
            </span>
          )}
          <span className="ml-auto text-xs text-gray-400 whitespace-nowrap">
            {formatTime(shot.recordedAt)}
          </span>
        </div>

        {/* Stats row */}
        {(shot.distance || shot.direction || shot.position) && (
          <div className="flex flex-wrap gap-4 text-sm mb-2">
            {shot.distance && (
              <div className="flex items-center gap-1 text-gray-700">
                <Target className="w-3.5 h-3.5 text-gray-400" />
                <span className="font-semibold">{shot.distance}m</span>
              </div>
            )}
            {shot.direction && (
              <div className="flex items-center gap-1 text-gray-700">
                <Wind className="w-3.5 h-3.5 text-gray-400" />
                <span className="font-semibold capitalize">
                  {shot.direction}
                </span>
                {dirArrow && (
                  <span className="text-gray-500 text-base leading-none">
                    {dirArrow}
                  </span>
                )}
              </div>
            )}
            {shot.position && (
              <div className="flex items-center gap-1 text-gray-700">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span className="font-semibold capitalize">{shot.position}</span>
              </div>
            )}
          </div>
        )}

        {/* Raw voice note */}
        {shot.rawText && (
          <p className="text-xs text-gray-400 italic">
            &ldquo;{shot.rawText}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Hole Section ─────────────────────────────────────────────────────────────
function HoleSection({
  holeNumber,
  shots,
}: {
  holeNumber: number;
  shots: SessionShotApi[];
}) {
  const scoringShot = shots.find((s) => s.scoring);
  const scoringInfo = scoringShot?.scoring
    ? (SCORING_META[scoringShot.scoring.toLowerCase()] ?? null)
    : null;

  return (
    <div className="mb-7">
      {/* Hole header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-white font-bold text-sm"
          style={{ backgroundColor: "#1a5c38" }}
        >
          <Flag className="w-3.5 h-3.5" />
          Hole {holeNumber}
        </div>
        <span className="text-sm text-gray-400">{shots.length} shots</span>
        {scoringInfo && (
          <span
            className="px-3 py-0.5 rounded-full text-xs font-bold"
            style={{
              color: scoringInfo.color,
              backgroundColor: scoringInfo.bg,
            }}
          >
            {scoringInfo.label}
          </span>
        )}
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Shots */}
      <div className="pl-1">
        {shots.map((shot) => (
          <ShotCard key={shot._id} shot={shot} />
        ))}
      </div>
    </div>
  );
}

// ─── Scorecard Strip ──────────────────────────────────────────────────────────
function ScorecardStrip({
  holeGroups,
  sortedHoles,
}: {
  holeGroups: Map<number, SessionShotApi[]>;
  sortedHoles: number[];
}) {
  return (
    <div className="mb-8 rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
      <div
        className="px-5 py-2.5 text-white text-xs font-semibold tracking-widest uppercase"
        style={{ backgroundColor: "#1a5c38" }}
      >
        Scorecard
      </div>
      <div className="flex divide-x divide-gray-100 overflow-x-auto">
        {sortedHoles.map((hole) => {
          const holeShots = holeGroups.get(hole)!;
          const scoring = holeShots.find((s) => s.scoring)?.scoring;
          const scoringInfo = scoring
            ? (SCORING_META[scoring.toLowerCase()] ?? null)
            : null;

          return (
            <div
              key={hole}
              className="flex-1 min-w-[56px] flex flex-col items-center py-3 px-2"
            >
              <span className="text-[11px] text-gray-400 font-medium mb-1">
                H{hole}
              </span>
              <span className="text-xl font-bold text-gray-900">
                {holeShots.length}
              </span>
              {scoringInfo ? (
                <span
                  className="mt-1 text-[10px] font-bold px-1.5 py-0.5 rounded"
                  style={{
                    color: scoringInfo.color,
                    backgroundColor: scoringInfo.bg,
                  }}
                >
                  {scoringInfo.label}
                </span>
              ) : (
                <span className="mt-1 text-[10px] text-gray-300">—</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Skeleton Loader ──────────────────────────────────────────────────────────
function HistorySkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {[1, 2].map((i) => (
        <div key={i}>
          <Skeleton className="h-8 w-32 rounded-full mb-4" />
          <div className="flex flex-col gap-3 pl-1">
            {[1, 2].map((j) => (
              <div key={j} className="flex items-start gap-3">
                <Skeleton className="w-7 h-7 rounded-full flex-shrink-0 mt-1" />
                <Skeleton className="flex-1 h-20 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HistoryPage() {
  const router = useRouter();

  const { data: shots = [], isLoading } = useQuery({
    queryKey: ["session-shots"],
    queryFn: async () => {
      const sessionId =
        localStorage.getItem("recordingSessionId") || "my-round-001";
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/shots/session/${sessionId}`
      );
      if (!res.ok) throw new Error("Failed to fetch session shots.");
      const json: SessionShotsResponse = await res.json();
      return json.data;
    },
  });

  const holeGroups = groupByHole(shots);
  const sortedHoles = Array.from(holeGroups.keys()).sort((a, b) => a - b);

  return (
    <div
      className="min-h-screen w-full px-5 py-8"
      style={{
        backgroundColor: "#F5F2EB",
        fontFamily: "'SF Pro Display', 'Helvetica Neue', sans-serif",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Back */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="mb-6 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {/* Title */}
        <div className="mb-7">
          <h1 className="text-[2rem] font-bold text-gray-900">Round History</h1>
          {!isLoading && shots.length > 0 && (
            <p className="text-gray-500 mt-1 text-sm">
              {sortedHoles.length} hole{sortedHoles.length !== 1 ? "s" : ""} &middot;{" "}
              {shots.length} total shots
            </p>
          )}
        </div>

        {/* Body */}
        {isLoading ? (
          <HistorySkeleton />
        ) : shots.length === 0 ? (
          <div className="min-h-[50vh] flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white/70 gap-3">
            <Flag className="w-10 h-10 text-gray-300" />
            <p className="text-gray-500 font-medium">No shots recorded yet</p>
            <p className="text-sm text-gray-400">
              Start a round to see your history here
            </p>
          </div>
        ) : (
          <>
            <ScorecardStrip
              holeGroups={holeGroups}
              sortedHoles={sortedHoles}
            />
            {sortedHoles.map((hole) => (
              <HoleSection
                key={hole}
                holeNumber={hole}
                shots={holeGroups.get(hole)!}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
