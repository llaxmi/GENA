import { Button } from "@/components/ui/button";
import { Question } from "@/lib/generated/prisma";
import { useRouter } from "next/navigation";

export const QuizCompletion = ({
  questions,
  onRetake,
  selected,
}: {
  questions: Question[];
  onRetake: () => void;
  selected: number | null;
}) => {
  const router = useRouter();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="text-2xl mb-4 font-bold">Quiz Complete!</div>
      <div className="mb-6 text-base border bg-orange-50 border-orange-200 text-orange-800 rounded-full px-4 w-fit">
        Score:{" "}
        <span className="font-medium text-orange-800">{questions.length}</span>{" "}
        / {questions.length}
      </div>
      <ol className="space-y-4">
        {questions.map((question) => {
          const isCorrect = question.correctIndex === selected;
          console.log(isCorrect);
          console.log(question.correctIndex);
          console.log(selected);
          return (
            <li
              key={question.id}
              className="py-2 px-4 rounded-lg border bg-slate-50 border-slate-200"
            >
              <div className="flex justify-start mb-2">
                {isCorrect && (
                  <span className="inline-block px-3 py-0.5 text-xs font-semibold border border-green-700 bg-green-50 text-green-800 rounded-full">
                    Correct
                  </span>
                )}
                {!isCorrect && (
                  <span className="inline-block px-3 py-0.5 text-xs font-semibold border border-red-700 bg-red-50 text-red-800 rounded-full">
                    Incorrect
                  </span>
                )}
              </div>
              <div className="font-medium">
                {question.order}. {question.question}
              </div>
              <span className="text-sm font-medium">
                Answer:{" "}
                <span className="italic">
                  {question.options[selected ?? 0]}
                </span>
              </span>
            </li>
          );
        })}
        <div className="mb-8 flex flex-col sm:flex-row gap-3 sm:gap-5 w-full justify-between items-center">
          <Button
            variant="outline"
            className="w-full sm:w-auto cursor-pointer text-base bg-green-700 text-white hover:bg-green-800 hover:text-white"
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto cursor-pointer text-base bg-blue-700 text-white hover:bg-blue-800 hover:text-white"
            onClick={onRetake}
          >
            Retake Quiz
          </Button>
        </div>
      </ol>
    </div>
  );
};
