"use client";

import { LoaderIcon, SparklesIcon } from "@/app/icons";
import { useCompletion } from "ai/react";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";

export default function Home() {
  // State to hold the primary text
  const [text, setText] = useState("");

  // Using useCompletion hook for AI-based suggestions
  const {
    completion,
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    setInput,
  } = useCompletion({
    body: { text },
    onFinish: (prompt, completion) => setText(completion.trim()),
    onError: (error) => toast.error(error.message),
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 px-4">
      <form
        className="flex flex-col items-center w-full max-w-3xl space-y-4"
        onSubmit={(e) => {
          handleSubmit(e);
          setInput(""); // Clear input after submission
        }}
      >
        {/* Dynamic Textarea for primary text */}
        <TextareaAutosize
          value={isLoading && completion.length > 0 ? completion.trim() : text}
          onChange={(e) => {
            if (!isLoading) setText(e.target.value);
          }}
          className="rounded-lg shadow bg-gray-100 border border-gray-200 p-4 md:resize-none dark:bg-gray-900 dark:border-gray-800 w-full min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Start your story here..."
          aria-label="Text"
          cacheMeasurements
          onKeyDown={(e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
              e.preventDefault();
              e.currentTarget.form?.requestSubmit();
            }
          }}
          aria-live="polite"
        />

        {/* Input field for AI prompt */}
        <div className="relative w-full flex items-center">
          <input
            className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full py-2 px-4 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Make it more engaging..."
            onChange={handleInputChange}
            value={input}
            aria-label="Prompt"
            required
          />

          {/* Submit Button */}
          <button
            aria-label="Submit"
            type="submit"
            className="absolute right-1 rounded-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white p-2 flex items-center justify-center transition-colors"
          >
            {isLoading ? <LoaderIcon /> : <SparklesIcon />}
          </button>
        </div>

        {/* Loader or Feedback Message */}
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400" aria-live="polite">
          {isLoading ? "Processing your request..." : completion && "Your unique text is ready!"}
        </div>
      </form>
    </div>
  );
}
