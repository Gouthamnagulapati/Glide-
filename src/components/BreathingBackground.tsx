export default function BreathingBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#030611]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#2d1b4e_0%,#030611_70%)] animate-[breathe_8s_ease-in-out_infinite]" />
      <style jsx global>{`
        @keyframes breathe {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}