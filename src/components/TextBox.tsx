import React from "react";
import { Button, Form, Input, Spinner } from "@heroui/react";

export default function TextBox() {
  const [submitted, setSubmitted] = React.useState<{
    [k: string]: FormDataEntryValue;
  } | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [results, setResults] = React.useState<string[] | null>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const results = await fetch("https://necta-mock-api.onrender.com/results");
      const individualResults = await results.json();
      setSubmitted(data);
      setResults(individualResults);
      console.log(individualResults)
      setError(null);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setSubmitted(null);
      setError("An error occurred");
      setTimeout(() => setError(""), 3000);
    }
    setIsLoading(false);
  };

  return (
    <Form
      className="max-w-xl mx-auto w-full mt-5 px-4"
      validationBehavior="native"
      onSubmit={onSubmit}
    >
      <Input
        name="registrationNumber"
        placeholder="Enter your registration number"
        type="text"
        className="bg-white rounded"
        validate={(value) => {
          if (value.length < 3) {
            return "Registration must be at least 8 characters long";
          }

          return value === "00000000" ? "Nice try!" : null;
        }}
      />
      <Button
        color="primary"
        type="submit"
        className="bg-yellow-300 text-white font-bold w-full mt-4"
      >
        {isLoading ? <Spinner /> : "Submit"}
      </Button>
      {submitted && (
        <div className="text-small text-default-500 text-white">
          Here are the results of the student with registration number {JSON.stringify(submitted).split(":")[1].slice(0,-1)}:
        </div>
      )}
      {error && (
        <div className="text-small text-default-500 text-red-500 text-center w-full">
          {error}
        </div>
      )}
      {results && results.length > 0 && (
        <div className="text-small text-default-500 text-white">
          <code>{results.map((r:any, i:number) => <div key={i} className="flex items-center gap-2">{r.subject} - {r.grade}</div>)}</code>
        </div>
      )}
    </Form>
  );
}
