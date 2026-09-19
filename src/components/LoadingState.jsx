export default function LoadingState() {
  return (
    <div className="container-page section-pad">
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-80 animate-pulse rounded-lg bg-black/10" />
        ))}
      </div>
    </div>
  );
}
