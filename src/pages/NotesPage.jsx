import { useState } from "react";
import ReflectionCard from "../components/ReflectionCard";
import ReflectionInput from "../components/ReflectionInput";

const dummyReflections = [
  {
    id: "note-001",
    subject: "Math",
    duration: 25,
    date: "2026-03-13",
    startTime: "19:00",
    content: "Hari ini lebih paham integral dasar, tapi masih bingung di substitusi.",
    createdAt: "2026-03-13T19:30:00.000Z",
  },
];

export default function NotesPage() {
  const [notes, setNotes] = useState(dummyReflections);
  const [editingNote, setEditingNote] = useState(null);

  const handleSubmit = (payload) => {
    if (payload.id) {
      setNotes((prev) =>
        prev.map((item) => (item.id === payload.id ? payload : item))
      );
      setEditingNote(null);
      return;
    }

    setNotes((prev) => [
      {
        ...payload,
        id: `note-${Date.now()}`,
      },
      ...prev,
    ]);
  };

  const handleDelete = (id) => {
    setNotes((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <ReflectionInput
        initialValue={editingNote}
        onSubmit={handleSubmit}
        onCancel={() => setEditingNote(null)}
        showCancel={Boolean(editingNote)}
        submitLabel={editingNote ? "Update Reflection" : "Save Reflection"}
      />

      <div className="grid gap-4">
        {notes.map((note) => (
          <ReflectionCard
            key={note.id}
            reflection={note}
            onEdit={setEditingNote}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}