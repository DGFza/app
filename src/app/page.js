"use client";
import { useState } from "react";
import DataJson from "../util/data.json";
import Teachjson from "../util/teacher.json";

const cyrillicToLatin = {
  'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'j',
  'з':'z','и':'i','й':'i','к':'k','л':'l','м':'m','н':'n','о':'o',
  'ө':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ү':'u','ф':'f',
  'х':'h','ц':'ts','ч':'ch','ш':'sh','щ':'sh','ъ':'','ы':'i','ь':'',
  'э':'e','ю':'yu','я':'ya'
};

const transliterate = (str) =>
  String(str ?? "")
    .toLowerCase()
    .split("")
    .map((c) => cyrillicToLatin[c] ?? c)
    .join("");

function getInitials(firstname, lastname) {
  return `${String(firstname ?? "").charAt(0)}${String(lastname ?? "").charAt(0)}`.toUpperCase();
}

const AVATAR_COLORS = [
  { bg: "#E6F1FB", text: "#0C447C" },
  { bg: "#E1F5EE", text: "#085041" },
  { bg: "#EEEDFE", text: "#3C3489" },
  { bg: "#FAEEDA", text: "#633806" },
  { bg: "#FBEAF0", text: "#72243E" },
];

function avatarColor(name) {
  let code = 0;
  for (const c of String(name)) code += c.charCodeAt(0);
  return AVATAR_COLORS[code % AVATAR_COLORS.length];
}

function Avatar({ firstname, lastname, img, size = 56 }) {
  const [imgError, setImgError] = useState(false);
  const { bg, text } = avatarColor((firstname ?? "") + (lastname ?? ""));
  if (img && !imgError) {
    return (
      <img
        src={img}
        alt={`${firstname} ${lastname}`}
        onError={() => setImgError(true)}
        style={{
          width: size, height: size,
          borderRadius: "50%",
          objectFit: "cover",
          flexShrink: 0,
          border: "2px solid #e5e7eb",
        }}
      />
    );
  }
  return (
    <div style={{
      width: size, height: size,
      borderRadius: "50%",
      background: bg,
      color: text,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 600, fontSize: size * 0.32,
      flexShrink: 0,
      border: "2px solid #e5e7eb",
      letterSpacing: "0.04em",
    }}>
      {getInitials(firstname, lastname)}
    </div>
  );
}

function Badge({ role }) {
  const isTeacher = role === "teacher";
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 10px",
      borderRadius: 99,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      background: isTeacher ? "#E6F1FB" : "#E1F5EE",
      color: isTeacher ? "#185FA5" : "#0F6E56",
      border: `1px solid ${isTeacher ? "#B5D4F4" : "#9FE1CB"}`,
    }}>
      {isTeacher ? "Teacher" : "Student"}
    </span>
  );
}

function InfoRow({ icon, label, value }) {
  if (!value) return null;
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "4px 0" }}>
      <span style={{ fontSize: 13, color: "#6b7280", minWidth: 68, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 13, color: "#111827", wordBreak: "break-all" }}>{value}</span>
    </div>
  );
}

function ItemCard({ item }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      background: "#f9fafb",
      border: "1px solid #e5e7eb",
      borderRadius: 8, padding: "6px 10px", marginTop: 4,
    }}>
      {item.img && !imgError && (
        <img
          src={item.img}
          alt={item.name}
          onError={() => setImgError(true)}
          style={{ width: 32, height: 32, borderRadius: 6, objectFit: "cover", flexShrink: 0 }}
        />
      )}
      <div>
        <p style={{ margin: 0, fontSize: 12, fontWeight: 500, color: "#374151" }}>{item.name}</p>
        {item.phone_number && (
          <p style={{ margin: 0, fontSize: 11, color: "#6b7280" }}>{item.phone_number}</p>
        )}
      </div>
    </div>
  );
}

function UserCard({ person, role }) {
  return (
    <div style={{
      background: "#ffffff",
      border: "1px solid #e5e7eb",
      borderRadius: 14,
      padding: "18px 16px",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
      transition: "box-shadow 0.15s",
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.10)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)"}
    >

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Avatar firstname={person.firstname} lastname={person.lastname} img={person.img} size={48} />
        <div style={{ minWidth: 0, flex: 1 }}>
          <p style={{ margin: 0, fontWeight: 600, fontSize: 15, color: "#111827", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {person.firstname} {person.lastname}
          </p>
          <div style={{ marginTop: 4 }}>
            <Badge role={role} />
          </div>
        </div>
      </div>


      <div style={{ borderTop: "1px solid #f3f4f6" }} />


      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {person.job && <InfoRow label="Position" value={person.job} />}
        <InfoRow label="Status" value={person.alive !== undefined ? (person.alive ? "Active" : "Inactive") : undefined} />
        {role === "student" && person.age && <InfoRow label="Age" value={person.age} />}
        {person.mail && <InfoRow label="Email" value={person.mail} />}
        {person.password && <InfoRow label="Password" value={person.password} />}
      </div>


      {person.items && person.items.length > 0 && (
        <div>
          <p style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>Items</p>
          {person.items.map((item, i) => <ItemCard key={i} item={item} />)}
        </div>
      )}

    </div>
  );
}

function SectionHeader({ title, count }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
      <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#111827" }}>{title}</h2>
      <span style={{
        background: "#f3f4f6", color: "#6b7280",
        borderRadius: 99, padding: "1px 10px", fontSize: 13, fontWeight: 500,
      }}>{count}</span>
    </div>
  );
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [students] = useState(DataJson);
  const [teachers] = useState(Teachjson);

  const matches = (name) =>
    transliterate(name).includes(transliterate(query));

  const filteredStudents = students.filter((s) =>
    matches(s.firstname) || matches(s.lastname)
  );

  const filteredTeachers = teachers.filter((t) =>
    matches(t.firstname) || matches(t.lastname)
  );

  const noResults =
    query.trim() !== "" &&
    filteredStudents.length === 0 &&
    filteredTeachers.length === 0;

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 16,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "system-ui, -apple-system, sans-serif" }}>

      <div style={{
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        padding: "18px 20px",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ margin: "0 0 10px", fontWeight: 700, fontSize: 20, color: "#111827", letterSpacing: "-0.01em" }}>
            Directory
          </p>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Хайх... / Search..."
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "10px 14px",
                fontSize: 15,
                border: "1.5px solid #e5e7eb",
                borderRadius: 10,
                outline: "none",
                color: "#111827",
                background: "#f9fafb",
                transition: "border-color 0.15s",
              }}
              onFocus={e => e.target.style.borderColor = "#93c5fd"}
              onBlur={e => e.target.style.borderColor = "#e5e7eb"}
            />
          </div>
        </div>
      </div>


      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px" }}>


        {filteredStudents.length > 0 && (
          <section style={{ marginBottom: 36 }}>
            <SectionHeader title="Students" count={filteredStudents.length} />
            <div style={gridStyle}>
              {filteredStudents.map((s, i) => (
                <UserCard key={i} person={s} role="student" />
              ))}
            </div>
          </section>
        )}


        {filteredTeachers.length > 0 && (
          <section>
            <SectionHeader title="Teachers" count={filteredTeachers.length} />
            <div style={gridStyle}>
              {filteredTeachers.map((t, i) => (
                <UserCard key={i} person={t} role="teacher" />
              ))}
            </div>
          </section>
        )}


        {noResults && (
          <div style={{
            textAlign: "center", padding: "60px 20px",
            color: "#9ca3af", fontSize: 16,
          }}>
          <p style={{ margin: 0, fontWeight: 500 }}>No results found</p>
            <p style={{ margin: "4px 0 0", fontSize: 14 }}>Try searching in English or Mongolian</p>
          </div>
        )}


        {query.trim() === "" && filteredStudents.length === 0 && filteredTeachers.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af" }}>
            <p style={{ fontSize: 14 }}>No records found.</p>
          </div>
        )}
      </div>
    </div>
  );
}