"use client";
import useVapi from "../../hooks/useVapi";
import { AssistantButton } from "./assistantbutton";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import {
  Message,
  TranscriptMessage,
  MessageTypeEnum,
} from "../types/conversation.types";
import { useEffect, useState } from "react";
import { Button } from "@repo/ui/button";
import {
  MessageCircleMore,
  ArrowDownToLine,
  Captions,
  CaptionsOff,
  Video,
  VideoOff,
  Maximize,
  Shrink,
  Mic,
  MicOff,
  Phone,
  PhoneMissed,
} from "lucide-react";
import { DropdownMenuSeparator } from "@repo/ui/dropdown-menu";

function Interview() {
  const { messages, toggleCall, callStatus, id, activeTranscript } = useVapi();
  const [videolink, setVideolink] = useState("");
  const [showTranscript, setShowTranscript] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);

  const renderMessage = (message: Message, index: number) => {
    if (message.type === MessageTypeEnum.FUNCTION_CALL) {
      return null; // Skip function call messages
    }
  
    // Determine if the message is from the user or the bot
    const isUserMessage = message.role === "user";
  
    return (
      <div
        key={index}
        className={`flex mb-2 ${isUserMessage ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`p-3 rounded-lg max-w-xs ${
            isUserMessage ? "bg-green-100 text-right" : "bg-blue-100 text-left"
          }`}
        >
          {message.transcript}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (callStatus === "inactive") {
      const fetchVideoLink = async () => {
        const options = {
          method: "GET",
          headers: {
            Authorization: "Bearer 5c98fec7-7eee-4dc2-9a8d-1d0405835a50",
          },
        };
        const res = await fetch(`https://api.vapi.ai/call/${id}`, options);
        const data = await res.json();
        setVideolink(data.recordingUrl);
      };

      setTimeout(fetchVideoLink, 10000);
    }
  }, [callStatus]);

  const handleVideoToggle = async () => {
    const videoElement = document.querySelector("video");

    if (!videoElement) {
      console.error("Video element not found");
      return;
    }

    if (videoEnabled) {
      const stream = videoElement.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        videoElement.srcObject = null;
      }
      console.log("Stopping video stream...");
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoElement.srcObject = stream;
        await videoElement.play();
        console.log("Starting video stream...");
      } catch (err) {
        console.error("Error starting video stream:", err);
      }
    }
    setVideoEnabled(!videoEnabled);
  };

  const handleCallToggle = () => {
    toggleCall(); // This toggles the call status (start/end)
    setIsCallActive(!isCallActive);

    // Automatically handle video start/stop with call toggle
    if (!isCallActive) {
      handleVideoToggle();
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    setControlsVisible(true);
  };

  const handleMouseMove = () => {
    setControlsVisible(true);
    if (!isFullScreen) return;

    setTimeout(() => {
      setControlsVisible(false);
    }, 2000);
  };

  const handlefullscreen = useFullScreenHandle();

  return (
    <FullScreen handle={handlefullscreen}>
      <div
        className={`flex flex-col h-screen ${isFullScreen ? "bg-black" : ""}`}
        onMouseMove={handleMouseMove}
      >
        {/* Main video and sidebar container */}
        <div
          className={`flex w-full transition-all duration-300 ${
            isFullScreen ? "h-screen" : "h-5/6"
          }`}
        >
          {/* Video Container */}
          <div
            className={`flex items-center justify-center bg-gray-200 transition-all duration-300 ${
              isSidebarOpen && !isFullScreen ? "w-2/3" : "w-full"
            } ${isFullScreen ? "bg-black" : ""}`}
          >
            <div className="p-4">
              <video
                src={videolink}
                controls={false}
                controlsList="nodownload nofullscreen noremoteplayback"
                className={`rounded-lg shadow-md ${
                  isFullScreen ? "h-full w-full" : ""
                }`}
              />
            </div>
          </div>

          {/* Collapsible Sidebar for Messages */}
          <div
            className={`${
              isSidebarOpen ? "block" : "hidden"
            } w-1/3 h-full overflow-y-auto bg-white shadow-lg transition-opacity duration-500 ease-in-out opacity-0 ${
              isSidebarOpen && "opacity-100"
            } ${isFullScreen ? "bg-black" : ""}`}
          >
            <h2 className="text-xl font-semibold mb-4 text-black text-center mt-4">CHAT</h2>
            <DropdownMenuSeparator className="bg-gray-300"></DropdownMenuSeparator>
            <ul className="space-y-2">
              {messages.map((message, index) => renderMessage(message, index))}
            </ul>
            {showTranscript && (
              <div className="mt-4 p-4 bg-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Transcript</h3>
                <p>
                  {activeTranscript?.transcript || "No transcript available"}
                </p>
              </div>
            )}
          </div>
          
        </div>

        {/* Control Buttons */}
        <div
          className={`flex justify-center items-center p-4 space-x-2 transition-opacity duration-300 ${
            controlsVisible ? "opacity-100" : "opacity-0"
          } ${isFullScreen ? "absolute bottom-0 w-full" : ""}`}
        >
          <Button className="bg-gray-800 text-white" onClick={handleCallToggle}>
            {isCallActive ? <PhoneMissed /> : <Phone />}
          </Button>
          <Button
            className="bg-gray-800 text-white"
            onClick={handleVideoToggle}
          >
            {videoEnabled ? <VideoOff /> : <Video />}
          </Button>
          <Button
            className="bg-gray-800 text-white"
            onClick={() => setShowTranscript(!showTranscript)}
          >
            {showTranscript ? <CaptionsOff /> : <Captions />}
          </Button>
          <Button
            className="bg-gray-800 text-white"
            onClick={() => {
              window.location.href = videolink;
            }}
          >
            <ArrowDownToLine />
          </Button>
          <Button
            className="bg-gray-800 text-white"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <MessageCircleMore />
          </Button>
          
          <Button
  className="bg-gray-800 text-white"
  onClick={() => {
    if (isFullScreen) {
      handlefullscreen.exit(); // Call exit when in full screen mode
    } else {
      handlefullscreen.enter(); // Call enter when not in full screen mode
    }
    
    toggleFullScreen(); // Toggle the full screen state
  }}
>
  {isFullScreen ? <Shrink /> : <Maximize />}
</Button>

        </div>
      </div>
    </FullScreen>
  );
}

export default Interview;
