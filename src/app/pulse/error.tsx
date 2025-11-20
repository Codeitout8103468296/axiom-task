"use client";
export default function Error({ error }: { error: Error }) {
  return <div className="p-6 text-danger text-sm">{error.message}</div>;
}
