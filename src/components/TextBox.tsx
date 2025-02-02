import React, { useState, useEffect } from "react";
import { Button, Form, Input, Spinner } from "@heroui/react";

export default function TextBox() {
  const [,setSubmitted] = useState<{
    [k: string]: FormDataEntryValue;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<string[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState(
    "Welcome to Necta Results Portal. Simply enter your registration number to get your results"
  );

  const speak = (message: string) => {
    if (!message.trim()) return;
    speechSynthesis.cancel(); 
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  // Speak when `text` changes
  useEffect(() => {
    speak(text);
  }, [text]);

  useEffect(() => {
    speak(
      "Welcome to Necta Results Portal. Simply enter your registration number to get your results"
    );
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const response = await fetch(
        "https://necta-mock-api.onrender.com/results"
      );
      const individualResults = await response.json();

      if (!Array.isArray(individualResults) || individualResults.length === 0) {
        throw new Error("No results found");
      }

      setSubmitted(data);
      setResults(individualResults);
      const resultsText = individualResults
        .map((r: any) => `${r.subject}: ${r.grade}`)
        .join(", ");

      setText(
        `Here are the results for registration number ${data.registrationNumber}: ${resultsText}`
      );
      setError(null);
    } catch (err) {
      console.error(err);
      setText("An error occurred while fetching the results.");
      setError("An error occurred");
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form className="max-w-xl mx-auto w-full mt-5 px-4" onSubmit={onSubmit}>
      <Input
        name="registrationNumber"
        placeholder="Enter your registration number"
        type="text"
        className="bg-white rounded"
      />
      <Button
        color="primary"
        type="submit"
        className="bg-yellow-300 text-white font-bold w-full mt-4"
      >
        {isLoading ? <Spinner /> : "Submit"}
      </Button>
      {error && (
        <div className="text-small text-red-500 text-center w-full">
          {error}
        </div>
      )}
      {results && results.length > 0 && (
        <div className="text-small text-white">
          <code>
            {results.map((r: any, i: number) => (
              <div key={i} className="flex items-center gap-2">
                {r.subject} - {r.grade}
              </div>
            ))}
          </code>
        </div>
      )}
    </Form>
  );
}
