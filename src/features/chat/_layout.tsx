import { useState, useRef, useEffect, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Send, Bot, User, Paperclip } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/ReactQuery";
import Metadata from "@/utils/Metadata";
import AuthLayout from "@/layouts/AuthLayout";
import { useAuth } from "@/hooks/useAuth";
import { Textarea } from "@/components/ui/textarea";
import { json } from "zod";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  isTyping?: boolean;
  files?: File[];
};

export function ChatBotLayout() {
  return (
    <>
      <AuthLayout>
        <ChatBot />
      </AuthLayout>
    </>
  );
}

interface PayloadChat {
  prompt: string;
  files: [];
  email: string;
}

function typeChat(payload: PayloadChat) {
  if (payload.files?.length > 0) {
    console.log("match cv");
    const formData = new FormData();

    payload.files.forEach((file) => {
      formData.append("file", file);
    });

    formData.append("email", payload.email);
    formData.append("prompt", payload.prompt);

    return {
      endpoint: "match",
      payload: formData,
    };
  }

  return {
    endpoint: "chat",
    payload: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  };
}

async function fetchChatBot(
  payload: PayloadChat,
  streamingBufferRef: React.MutableRefObject<string>
) {
  const req = typeChat(payload);
  const res = await fetch(`${Metadata.base_api}/ai/${req.endpoint}`, {
    method: "POST",
    headers: req.headers || {},
    body: req.payload,
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();

  for (let i = 0; i < data.length; ++i) {
    streamingBufferRef.current += data[i].body;
  }

  return {
    statusCode: 200,
    message: "Tạo prompt thành công",
    content: streamingBufferRef.current,
  };
}

async function fetchGenerate(payload: PayloadChat) {
  const res = await fetch(`${Metadata.base_api}/ai/template`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return await res.json();
}

function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<any>({
    prompt: "",
    files: [],
  });
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const streamingBufferRef = useRef<string>("");
  const botMessageIdRef = useRef<string | null>(null);
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [selectedMode, setSelectedMode] = useState<string>("chat");

  const { user } = useAuth();

  function useChatMessage() {
    return useMutation(
      {
        mutationFn: async (payload: PayloadChat) => {
          if (selectedMode === "create-cv") {
            return fetchGenerate(payload);
          }
          return fetchChatBot(payload, streamingBufferRef);
        },
        onSuccess: (data: any) => {
          console.log("Stream kết thúc, nội dung cuối:", data.content);
          setMessages((prev) =>
            prev.map((msg) => {
              if (msg.id === botMessageIdRef.current) {
                return { ...msg, content: data.content };
              }
              return msg;
            })
          );
        },
        onError: (error: Error) => {
          console.log("Chat error:", error);
        },
      },
      queryClient
    );
  }

  const { mutate, isPending } = useChatMessage();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const formEvent = new Event("submit", { cancelable: true }) as any;
      formEvent.preventDefault = () => {};
      handleSendMessage(formEvent);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    setInputValue((prev: any) => ({
      ...prev,
      files: [...prev.files, ...filesArray],
    }));
    setShowFileMenu((prev) => (prev = !showFileMenu));
  };

  const removeFile = (index: number) => {
    setInputValue((prev: any) => ({
      ...prev,
      files: prev.files.filter((_: any, i: number) => i !== index),
    }));
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    const userMessage: Message = {
      id: "user-" + Date.now(),
      content: inputValue.prompt,
      sender: "user",
      timestamp: new Date(),
      files: inputValue.files.length > 0 ? inputValue.files : undefined,
    };

    const botId = "bot-" + Date.now();
    botMessageIdRef.current = botId;
    const botMsg: Message = {
      id: botId,
      content: "",
      sender: "bot",
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setMessages((prev) => [...prev, botMsg]);

    mutate({
      prompt: inputValue.prompt,
      files: inputValue.files,
      email: user.email,
    });

    setInputValue({ prompt: "", files: [] });
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  console.log(selectedMode);

  const typeOtpions = (type: string) => {
    if (type === "create-cv") {
      return "Tạo mẫu CV";
    }
    return "";
  };

  return (
    <div className="flex flex-col h-screen w-full p-10">
      <ScrollArea ref={scrollAreaRef} className="h-[700px] p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`
              flex items-start space-x-2
              ${msg.sender === "user" ? "justify-end" : "justify-start"}
            `}
          >
            {msg.sender === "bot" && (
              <Avatar className="">
                <Bot size={20} />
              </Avatar>
            )}
            <div className="chat-bubble flex flex-col space-y-1 max-w-[50%]">
              {msg.content && (
                <div
                  className={`
                    px-4 py-2 rounded-lg
                    ${
                      msg.sender === "user"
                        ? "bg-gray-200 text-gray-800"
                        : "bg-gray-200 text-gray-800"
                    }
                  `}
                  dangerouslySetInnerHTML={{ __html: msg.content }}
                ></div>
              )}
              {msg.files &&
                msg.files.map((file, idx) => (
                  <div
                    key={idx}
                    className="px-2 py-1 bg-gray-100 rounded-md text-sm flex items-center space-x-2"
                  >
                    <span>📎 {file.name}</span>
                  </div>
                ))}
              <div className="text-xs text-gray-500 mt-1">
                {msg.timestamp.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
            {msg.sender === "user" && (
              <Avatar className="w-8 h-8">
                <User size={20} />
              </Avatar>
            )}
          </div>
        ))}
        {isPending && (
          <div className="flex items-start space-x-2">
            <Avatar className="w-8 h-8">
              <Bot size={20} />
            </Avatar>
            <div className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">
              <em>Typing...</em>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </ScrollArea>
      <div className="mt-4">
        {inputValue.files.length > 0 && (
          <div className="mt-2 space-y-1">
            {inputValue.files.map((file: any, i: number) => (
              <div
                key={i}
                className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
              >
                <span className="text-sm">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="p-2 border-t ">
        <div className="flex-grow rounded border p-2">
          <div className="options"></div>
          <div className="flex">
            <Textarea
              className="resize-none border-0 focus:ring-0 focus:outline-none !ring-0 !border-0 shadow-none"
              placeholder="Type a message..."
              value={inputValue.prompt}
              onChange={(e) =>
                setInputValue((prev: any) => ({
                  ...prev,
                  prompt: e.target.value,
                }))
              }
              onKeyDown={handleKeyDown}
              rows={1}
            />

            <Button
              className="h-10 w-10 rounded-full right-0 top-0"
              type="submit"
              disabled={
                !inputValue.prompt.trim() && inputValue.files.length === 0
              }
            >
              <Send size={18} />
            </Button>
          </div>

          <div className="relative bottom-0 left-0">
            <div className="flex">
              <Button
                type="button"
                onClick={() => setShowFileMenu(!showFileMenu)}
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-gray-100 cursor-pointer"
              >
                +
              </Button>
              {selectedMode !== "chat" && (
                <div className="ml-[10px] rounded border p-1">
                  {typeOtpions(selectedMode)}
                </div>
              )}
            </div>

            {showFileMenu && (
              <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-48">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="chat-file-input"
                />
                <label
                  htmlFor="chat-file-input"
                  className="block px-4 py-3 bg-gray-50 cursor-pointer text-sm flex items-center space-x-2"
                >
                  <span>Tải file</span>
                </label>
                <div
                  className="block px-4 py-3 bg-gray-50 cursor-pointer text-sm flex items-center space-x-2"
                  onClick={() => {
                    setSelectedMode("create-cv");
                    setShowFileMenu((prev) => (prev = !showFileMenu));
                  }}
                >
                  {typeOtpions("create-cv")}
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
