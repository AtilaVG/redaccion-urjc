export default function Loading() {
  return (
    <div className="bg-void fixed inset-0 z-[120] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative size-16">
          <span className="border-t-cyan absolute inset-0 animate-spin rounded-full border-2 border-transparent" />
          <span className="border-t-violet absolute inset-2 animate-spin rounded-full border-2 border-transparent [animation-direction:reverse]" />
          <span className="bg-crimson absolute inset-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full" />
        </div>
        <p className="font-mono text-xs tracking-[0.3em] text-white/50 uppercase">
          Cargando Ediciones URJC…
        </p>
      </div>
    </div>
  );
}
