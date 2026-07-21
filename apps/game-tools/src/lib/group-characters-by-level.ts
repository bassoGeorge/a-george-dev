type BriefLike = { level: number; name: string };

type SnapshotLike<T extends BriefLike> = { brief: T };

export type LevelGroup<T extends BriefLike, S extends SnapshotLike<T>> = {
  level: number;
  characters: (S & { hasMultipleLevels: boolean })[];
};

export function groupCharactersByLevel<
  T extends BriefLike,
  S extends SnapshotLike<T>,
>(characterMap: Record<string, S[]>): LevelGroup<T, S>[] {
  const snapshots = Object.values(characterMap).flatMap((characters) =>
    characters.map((c) => ({ ...c, hasMultipleLevels: characters.length > 1 }))
  );

  const levels = [...new Set(snapshots.map((s) => s.brief.level))].sort(
    (a, b) => a - b
  );

  return levels.map((level) => ({
    level,
    characters: snapshots
      .filter((s) => s.brief.level === level)
      .sort((a, b) => a.brief.name.localeCompare(b.brief.name)),
  }));
}
