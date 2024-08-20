"use client";
import useVapi from "../../hooks/useVapi";
import { AssistantButton } from "./assistantbutton";
import {
  Message,
  TranscriptMessage,
  MessageTypeEnum,
} from "../types/conversation.types";
import { useEffect, useState } from "react";
import { Button } from "@repo/ui/button";
import { useSession } from "next-auth/react";

function Interview() {
  const { messages, toggleCall, callStatus, audioLevel, id, activeTranscript } =
    useVapi();
  const [videolink, setVideolink] = useState("");
  const [showTranscript, setShowTranscript] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const {data:session} = useSession();

  const renderMessage = (message: Message, index: number) => {
    switch (message.type) {
      case MessageTypeEnum.TRANSCRIPT:
        const transcriptMessage = message as TranscriptMessage;
        return (
          <div key={index} className="flex justify-start mb-2">
            <div className="p-3 bg-blue-100 text-left rounded-lg">
              {transcriptMessage.transcript}
            </div>
          </div>
        );
      case MessageTypeEnum.FUNCTION_CALL:
        return (
          <div key={index} className="flex justify-end mb-2">
            <div className="p-3 bg-yellow-100 text-left rounded-lg">
              Function Call Message
            </div>
          </div>
        );
      case MessageTypeEnum.FUNCTION_CALL_RESULT:
        return (
          <div key={index} className="flex justify-end mb-2">
            <div className="p-3 bg-green-100 text-left rounded-lg">
              Function Call Result Message
            </div>
          </div>
        );
      default:
        return null; // Do not render unknown message types
    }
  };

  useEffect(() => {
    console.log(session?.user?.image)
    if (callStatus === "inactive") {
      const response = async () => {
        const options = {
          method: "GET",
          headers: {
            Authorization: "Bearer 5c98fec7-7eee-4dc2-9a8d-1d0405835a50",
          },
        };
        console.log("This is the id of the call", id);

        const res = await fetch(`https://api.vapi.ai/call/${id}`, options);
        const data = await res.json();
        console.log(data);
        console.log("This is the link of the video", data.recordingUrl);
        console.log(
          "This is the link of the video",
          data.artifact.videoRecordingUrl
        );
        setVideolink(data.recordingUrl);
      };

      console.log("The call has ended.");

      setTimeout(() => {
        response();
      }, 10000); // Wait for 10 seconds (10000 milliseconds)
    }
  }, [callStatus]);

  const handleVideoToggle = async () => {
    const videoElement = document.querySelector("video");
  
    if (!videoElement) {
      console.error("Video element not found");
      return;
    }
  
    if (videoEnabled) {
      // Stop the video stream
      const stream = videoElement.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        videoElement.srcObject = null;
      }
      console.log("Stopping video stream...");
    } else {
      try {
        // Start the video stream
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoElement.srcObject = stream;
        await videoElement.play(); // Automatically play the video
        console.log("Starting video stream...");
      } catch (err) {
        console.error("Error starting video stream:", err);
      }
    }
    setVideoEnabled(!videoEnabled);
  };
  

  return (
    <div className="flex flex-col h-screen">
      {/* Main video and transcript container */}
      <div className="flex w-full h-5/6">
        {/* Video Container */}
        <div className="w-2/3 flex items-center justify-center bg-gray-200">
          <div className="p-4">
          <video
  src={videolink}
  controls={false}  // Disable default controls
  controlsList="nodownload nofullscreen noremoteplayback"
  className="rounded-lg shadow-md"
/> 
          </div>
        </div>

        {/* Transcript and Messages Container */}
        <div className="w-1/3 h-full overflow-y-auto p-4 bg-white shadow-lg">
          {showTranscript && (
            <div className="mb-4 p-4 bg-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Transcript</h3>
              <p>{activeTranscript?.transcript || "No transcript available"}</p>
            </div>
          )}
          <h2 className="text-xl font-semibold mb-4">Messages</h2>
          <ul className="space-y-2">
            {messages.map((message, index) => renderMessage(message, index))}
          </ul>
        </div>
      </div>

      {/* CC Button & Download Video Call Button */}
      <div className="flex justify-between items-center p-4">
        <Button onClick={() => setShowTranscript(!showTranscript)}>
          {showTranscript ? "Hide Transcript" : "Show Transcript"}
        </Button>
        <Button
          onClick={() => {
            window.location.href = videolink;
          }}
        >
          Download Video Call
        </Button>
      </div>

      <AssistantButton
        toggleCall={toggleCall}
        callStatus={callStatus}
        audioLevel={audioLevel}
        onVideoToggle={handleVideoToggle}
        videoEnabled={videoEnabled}
      />
    </div>
  );
}

export default Interview;
