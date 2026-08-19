import { useState } from "react";

import {
  ConversationProvider,
  useConversationControls,
  useConversationStatus,
  useConversationInput,
  useConversationMode,
} from "@elevenlabs/react";

const AGENT_ID = "agent_3501m0atzbjgf7nrwd47h6825apa";

type TranscriptMessage = {
  source: "user" | "agent";
  text: string;
};

function VoiceWidget({
  transcript,
}: {
  transcript: TranscriptMessage[];
}) {
  const { startSession, endSession } = useConversationControls();
  const { status } = useConversationStatus();
  const { isMuted, setMuted } = useConversationInput();
  const { isSpeaking, isListening } = useConversationMode();

  const startConversation = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const conversationId = await startSession({
        agentId: AGENT_ID,
      });

      console.log("Connected:", conversationId);
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f7f7] px-4 py-10 text-black">
      <section className="mx-auto w-full max-w-md overflow-hidden border border-black/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        {/* Top accent bar */}
        <div className="h-2 w-full bg-[#c92333]" />

        {/* Header */}
        <div className="px-6 pt-7 text-center sm:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#c92333]">
            The Smile Bar
          </p>

          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center border-4 border-[#c92333] bg-white text-2xl font-black text-black shadow-sm">
            AMI
          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            Virtual Assistant
          </h1>

          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Your voice-first assistant for treatments, packages,
            pricing, locations and bookings.
          </p>
        </div>

        {/* Connection Status */}
        <div className="mx-6 my-6 border border-black/10 bg-[#fafafa] p-4 sm:mx-8">
          <div
            role="status"
            aria-live="polite"
            className="flex items-center justify-between"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Connection
            </span>

            <div className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  status === "connected"
                    ? "bg-emerald-500"
                    : status === "connecting"
                    ? "bg-amber-400"
                    : "bg-zinc-400"
                }`}
              />

              <span className="text-sm font-semibold capitalize">
                {status}
              </span>
            </div>
          </div>
        </div>

        {/* Speaking / Listening Indicator */}
        {status === "connected" && (
          <div className="mx-6 mb-6 border border-black/10 bg-white p-5 text-center sm:mx-8">
            {isSpeaking ? (
              <div>
                <div className="mx-auto mb-3 flex items-center justify-center gap-1">
                  <span className="h-3 w-1 animate-pulse bg-[#c92333]" />
                  <span className="h-5 w-1 animate-pulse bg-[#c92333]" />
                  <span className="h-4 w-1 animate-pulse bg-[#c92333]" />
                  <span className="h-6 w-1 animate-pulse bg-[#c92333]" />
                  <span className="h-3 w-1 animate-pulse bg-[#c92333]" />
                </div>

                <p className="text-sm font-semibold text-[#c92333]">
                  AMI is speaking
                </p>
              </div>
            ) : isListening ? (
              <div>
                <div className="mx-auto mb-3 h-3 w-3 animate-pulse rounded-full bg-black" />

                <p className="text-sm font-semibold text-black">
                  AMI is listening
                </p>
              </div>
            ) : (
              <p className="text-sm text-zinc-500">
                AMI is ready
              </p>
            )}
          </div>
        )}

        {/* Live Transcript */}
        {status === "connected" && (
          <div
            aria-label="Live conversation transcript"
            className="mx-6 mb-6 max-h-64 overflow-y-auto border border-black/10 bg-[#fafafa] p-4 sm:mx-8"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Live transcript
            </p>

            {transcript.length === 0 ? (
              <p className="text-sm text-zinc-500">
                Your conversation will appear here.
              </p>
            ) : (
              <div className="space-y-3">
                {transcript.map((message, index) => (
                  <div
                    key={`${message.source}-${index}`}
                    className={`p-3 text-sm ${
                      message.source === "user"
                        ? "ml-6 border border-black/10 bg-white text-black"
                        : "mr-6 bg-[#c92333] text-white"
                    }`}
                  >
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] opacity-70">
                      {message.source === "user"
                        ? "You"
                        : "AMI"}
                    </p>

                    <p>{message.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Controls */}
        <div className="px-6 pb-7 sm:px-8">
          {status === "connected" ? (
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setMuted(!isMuted)}
                aria-label={
                  isMuted
                    ? "Unmute microphone"
                    : "Mute microphone"
                }
                className="flex-1 border border-black bg-white px-5 py-4 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black"
              >
                {isMuted ? "🎙 Unmute" : "🔇 Mute"}
              </button>

              <button
                onClick={() => endSession()}
                aria-label="End conversation with AMI"
                className="flex-1 bg-[#c92333] px-5 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#a91d2b] focus:outline-none focus:ring-2 focus:ring-[#c92333]"
              >
                End Conversation
              </button>
            </div>
          ) : (
            <button
              onClick={startConversation}
              disabled={status === "connecting"}
              aria-label="Start conversation with AMI"
              className="w-full bg-[#c92333] px-5 py-4 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#a91d2b] focus:outline-none focus:ring-2 focus:ring-[#c92333] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "connecting"
                ? "Connecting to AMI..."
                : "Talk to AMI"}
            </button>
          )}

          <p className="mt-5 text-center text-[11px] uppercase tracking-[0.18em] text-zinc-400">
            Voice powered by ElevenLabs
          </p>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  const [transcript, setTranscript] = useState<
    TranscriptMessage[]
  >([]);

  return (
    <ConversationProvider
      onMessage={(message) => {
        console.log("ElevenLabs message:", message);

        const event = message as {
          source?: "user" | "agent";
          message?: string;
          text?: string;
        };

        const text = event.message ?? event.text;

        if (!text) return;

        const source =
          event.source === "user" ? "user" : "agent";

        setTranscript((current) => [
          ...current,
          {
            source,
            text,
          },
        ]);
      }}
    >
      <VoiceWidget transcript={transcript} />
    </ConversationProvider>
  );
}