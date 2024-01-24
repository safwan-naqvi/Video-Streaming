"use client";

import { useEffect, useMemo, useState } from "react";
import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useMediaQuery } from "usehooks-ts";
import ChatHeader, { ChatHeaderSkeleton } from "./ChatHeader";
import ChatForm, { ChatFormSkeleton } from "./Chat-Form";
import { ChatList, ChatListSkeleton } from "./ChatList";
import { ChatCommunity } from "./ChatCommunity";

interface ChatProps {
  hostName: string;
  hostIdentity: string;
  viewerName: string;
  isFollowing: boolean;
  isChatDelayed: boolean;
  isChatEnabled: boolean;
  isChatFollowersOnly: boolean;
}
export default function Chat({
  viewerName,
  hostName,
  hostIdentity,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
}: ChatProps) {
  const matches = useMediaQuery("(max-width:1024px)");
  const { variant, onExpand } = useChatSidebar((state) => state);
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const isOnline = participant && connectionState === ConnectionState.Connected;
  const isHidden = !isChatEnabled || !isOnline;
  const [value, setValue] = useState("");
  const { chatMessages: messages, send } = useChat();
  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  const reverseMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  const onSubmit = () => {
    if (!send) return;
    send(value);
    setValue("");
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeader />
      {variant === ChatVariant.CHAT && (
        <>
          <ChatList messages={reverseMessages} isHidden={isHidden} />
          <ChatForm
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            isHidden={isHidden}
            isFollowing={isFollowing}
            isFollowersOnly={isChatFollowersOnly}
            isDelayed={isChatDelayed}
          />
        </>
      )}
      {variant === ChatVariant.COMMUNITY && (
        <ChatCommunity
          viewerName={viewerName}
          hostName={hostName}
          isHidden={isHidden}
        />
      )}
    </div>
  );
}

export const ChatSkeleton = () => {
  return (
    <div className="flex flex-col border-l border-b py-0 h-[calc(100vh-80px)] border-2">
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  );
};
