import { FormField, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DocumentQuizSchemaType,
  TextQuizSchemaType,
} from "@/features/generate/schema";
import {
  DIFFICULTY_LEVELS,
  QUESTION_COUNTS,
  QuestionCount,
} from "@/features/quizset";
import { UseFormReturn } from "react-hook-form";

export const QuizOptions = ({
  form,
}: {
  form: UseFormReturn<TextQuizSchemaType | DocumentQuizSchemaType>;
}) => {
  return (
    <div>
      <Label className="font-semibold text-gray-900 mb-4 text-lg">
        Quiz Preferences
      </Label>
      <div className="flex space-y-4 flex-col">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <div className="space-y-2">
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Enter a name for your quiz set"
                {...field}
                disabled={form.formState.isSubmitting}
              />
            </div>
          )}
        />
        <div className="flex gap-2 justify-between">
          <FormField
            control={form.control}
            name="numQuestions"
            render={({ field }) => (
              <div className="space-y-2 flex-1">
                <FormLabel>Number of Questions</FormLabel>
                <Select
                  value={field.value.toString()}
                  onValueChange={field.onChange}
                  disabled={form.formState.isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a number of questions" />
                  </SelectTrigger>
                  <SelectContent>
                    {QUESTION_COUNTS.map((n: QuestionCount) => (
                      <SelectItem key={n} value={n.toString()}>
                        {n} questions
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <div className="space-y-2 flex-1">
                <FormLabel>Difficulty Level</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={form.formState.isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a difficulty level" />
                  </SelectTrigger>
                  <SelectContent>
                    {DIFFICULTY_LEVELS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d.charAt(0).toUpperCase() + d.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};
