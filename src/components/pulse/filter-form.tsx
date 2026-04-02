import Link from "next/link";
import { listScheduleDays, rooms, segments, tracks, type ScheduleFilters } from "@/lib/pulse-data";

export function FilterForm({ filters }: { filters: ScheduleFilters }) {
  return (
    <form className="content-card grid gap-4 p-5 md:grid-cols-5">
      <label className="md:col-span-2">
        <span className="field-label">Search</span>
        <input
          className="field-input"
          type="search"
          name="q"
          placeholder="Session, speaker, track, or room"
          defaultValue={filters.q ?? ""}
        />
      </label>

      <label>
        <span className="field-label">Day</span>
        <select className="field-input" name="day" defaultValue={filters.day ?? ""}>
          <option value="">All days</option>
          {listScheduleDays().map((day) => (
            <option key={day.value} value={day.value}>
              {day.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span className="field-label">Segment</span>
        <select className="field-input" name="segment" defaultValue={filters.segment ?? ""}>
          <option value="">All segments</option>
          {segments.map((segment) => (
            <option key={segment.id} value={segment.slug}>
              {segment.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span className="field-label">Track</span>
        <select className="field-input" name="track" defaultValue={filters.track ?? ""}>
          <option value="">All tracks</option>
          {tracks.map((track) => (
            <option key={track.id} value={track.slug}>
              {track.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span className="field-label">Room</span>
        <select className="field-input" name="room" defaultValue={filters.room ?? ""}>
          <option value="">All rooms</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.slug}>
              {room.name}
            </option>
          ))}
        </select>
      </label>

      <div className="flex items-end gap-3 md:col-span-2">
        <button type="submit" className="accent-button w-full sm:w-auto">
          Apply filters
        </button>
        <Link href="/schedule" className="secondary-button w-full sm:w-auto">
          Clear
        </Link>
      </div>
    </form>
  );
}
