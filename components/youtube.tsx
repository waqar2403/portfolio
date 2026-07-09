export function YouTube({ id, title }: { id: string; title?: string }) {
  return (
    <div className="my-6 aspect-video">
      <iframe
        className="h-full w-full rounded-md border border-border"
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title ?? "YouTube video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
