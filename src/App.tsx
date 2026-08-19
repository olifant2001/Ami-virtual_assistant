import {
  ConversationProvider,
  useConversationControls,
  useConversationStatus,
} from "@elevenlabs/react";

const AGENT_ID = "agent_3501m0atzbjgf7nrwd47h6825apa";

function VoiceWidget() {
  const { startSession, endSession } = useConversationControls();
  const { status } = useConversationStatus();

  const startConversation = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const conversationId = await startSession({
        agentId: AGENT_ID,
      });

      console.log("Connected:", conversationId);
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur">
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white text-2xl font-bold text-zinc-950 shadow-lg">
            AMI
          </div>

          <p className="mb-2 text-sm font-medium uppercase tracking-[0.25em] text-zinc-400">
            The Smile Bar
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">
            Virtual Assistant
          </h1>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Ask AMI about treatments, packages, pricing, locations and bookings.
          </p>
        </div>

        <div className="my-8 rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">Connection</span>

            <div className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  status === "connected"
                    ? "bg-emerald-400"
                    : status === "connecting"
                    ? "bg-amber-400"
                    : "bg-zinc-500"
                }`}
              />

              <span className="text-sm font-medium capitalize">
                {status}
              </span>
            </div>
          </div>
        </div>

        {status === "connected" ? (
          <button
            onClick={() => endSession()}
            className="w-full rounded-2xl bg-red-500 px-5 py-4 font-semibold text-white transition hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            End Conversation
          </button>
        ) : (
          <button
            onClick={startConversation}
            disabled={status === "connecting"}
            className="w-full rounded-2xl bg-white px-5 py-4 font-semibold text-zinc-950 transition hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "connecting"
              ? "Connecting to AMI..."
              : "🎙 Talk to AMI"}
          </button>
        )}

        <p className="mt-5 text-center text-xs text-zinc-500">
          Voice powered by ElevenLabs
        </p>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <ConversationProvider>
      <VoiceWidget />
    </ConversationProvider>
  );
}