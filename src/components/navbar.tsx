import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 32px",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      {/* Left: Logo + Name */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Logo placeholder */}
        <div
          style={{
            width: "32px",
            height: "32px",
            backgroundColor: "#e5e7eb",
            borderRadius: "6px",
          }}
        />
        <span style={{ fontWeight: 600 }}>TU Codes</span>
      </div>

      {/* Right: Navigation */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/events">Events</Link>
        <Link href="/projects">Projects</Link>

        {/* Join Us Button */}
        <Link
          href="/join"
          style={{
            padding: "8px 16px",
            border: "1px solid #000",
            borderRadius: "6px",
            fontWeight: 500,
          }}
        >
          Join Us
        </Link>
      </div>
    </nav>
  );
}
