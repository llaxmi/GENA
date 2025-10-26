import { useForm } from "react-hook-form";
import { Form, FormField } from "./ui/form";

type GenerateFormData = {
  numQuestions: number;
  difficulty: "easy" | "medium" | "hard";
};

const QuestionOptions = ({
  onSubmit,
}: {
  onSubmit: (data: GenerateFormData) => void;
}) => {
  const form = useForm<GenerateFormData>({
    defaultValues: {
      numQuestions: 5,
      difficulty: "easy",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="numQuestions"
              render={({ field }) => (
                <div>
                  <label
                    htmlFor="num-questions"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Number of Questions
                  </label>
                  <select
                    id="num-questions"
                    className="w-full p-3 border border-gray-300 rounded-lg text-base text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    value={field.value || 5}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  >
                    {[5, 10, 15, 20].map((n) => (
                      <option key={n} value={n}>
                        {n} questions
                      </option>
                    ))}
                  </select>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <div>
                  <label
                    htmlFor="difficulty-level"
                    className=" mb-2 text-sm font-medium text-gray-700"
                  >
                    Difficulty Level
                  </label>
                  <select
                    id="difficulty-level"
                    className="w-full p-3 border border-gray-300 rounded-lg text-base text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    value={field.value || "easy"}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    {["Easy", "Medium", "Hard"].map((d) => (
                      <option key={d} value={d.toLowerCase()}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default QuestionOptions;
