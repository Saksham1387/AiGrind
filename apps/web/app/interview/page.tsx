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

function Interview() {
  const { activeTranscript, messages, toggleCall, callStatus, audioLevel ,id} =useVapi();
    const [videolink, setVideolink] = useState("");

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
    if (callStatus === "inactive") {
      const response = async () => {
        const options = {
          method: 'GET',
          headers: { Authorization: 'Bearer 5c98fec7-7eee-4dc2-9a8d-1d0405835a50' }
        };
        console.log("This is the id of the call", id);
  
        const res = await fetch(`https://api.vapi.ai/call/${id}`, options);
        const data = await res.json();
        console.log(data);
        console.log("This is the link of the video", data.recordingUrl);
        console.log("This is the link of the video", data.artifact.videoRecordingUrl);
        setVideolink(data.recordingUrl);
      };
  
      console.log("The call has ended.");
      
      setTimeout(() => {
        response();
      }, 10000); // Wait for 10 seconds (10000 milliseconds)
    }
  }, [callStatus]);

  return (
    <div className="flex flex-col justify-center items-center h-screen p-4">
      <div className="mb-4 w-full">
        <h2 className="text-xl font-semibold">Active Transcript</h2>
        {activeTranscript ? (
          <p className="p-4 bg-gray-200 rounded-lg mt-2">
            {activeTranscript.transcript}
          </p>
        ) : (
          <p className="text-gray-500">No active transcript</p>
        )}
      </div>

      <div className="flex-1 w-full mb-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-2">Messages</h2>
        <ul className="space-y-2">
          {messages.map((message, index) => renderMessage(message, index))}
        </ul>
      </div>
      <Button
      onClick={()=>{
        window.location.href = videolink;
      }}
      >
        Video Call DOnwload
      </Button>

      <AssistantButton
        toggleCall={toggleCall}
        callStatus={callStatus}
        audioLevel={audioLevel}
      />
    </div>
  );
}

export default Interview;
