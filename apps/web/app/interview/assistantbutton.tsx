import { CALL_STATUS } from "../../hooks/useVapi";
import useVapi from "../../hooks/useVapi";
import { Loader2, Mic, Square, Video, VideoOff } from "lucide-react";
import { Button } from "@repo/ui/button";

const AssistantButton = ({
  toggleCall,
  callStatus,
  audioLevel = 0,
  onVideoToggle,
  videoEnabled,
}: Partial<ReturnType<typeof useVapi>> & { onVideoToggle?: () => void; videoEnabled?: boolean }) => {
  const color =
    callStatus === CALL_STATUS.ACTIVE
      ? "red"
      : callStatus === CALL_STATUS.LOADING
        ? "orange"
        : "green";

  const buttonStyle = {
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    color: "white",
    border: "none",
    boxShadow: `1px 1px ${10 + audioLevel * 40}px ${
      audioLevel * 10
    }px ${color}`,
    backgroundColor:
      callStatus === CALL_STATUS.ACTIVE
        ? "red"
        : callStatus === CALL_STATUS.LOADING
          ? "orange"
          : "green",
    cursor: "pointer",
  };

  return (
    <div className="flex space-x-2">
      <Button
        style={buttonStyle}
        className={`transition ease-in-out ${
          callStatus === CALL_STATUS.ACTIVE
            ? "bg-red-500 hover:bg-red-700"
            : callStatus === CALL_STATUS.LOADING
              ? "bg-orange-500 hover:bg-orange-700"
              : "bg-green-500 hover:bg-green-700"
        } flex items-center justify-center`}
        onClick={toggleCall}
      >
        {callStatus === CALL_STATUS.ACTIVE ? (
          <Square />
        ) : callStatus === CALL_STATUS.LOADING ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Mic />
        )}
      </Button>

      <Button
        style={{ ...buttonStyle, backgroundColor: videoEnabled ? "blue" : "gray" }}
        className={`transition ease-in-out ${videoEnabled ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-500 hover:bg-gray-700"}`}
        onClick={onVideoToggle}
      >
        {videoEnabled ? <VideoOff /> : <Video />}
      </Button>
    </div>
  );
};

export { AssistantButton };
