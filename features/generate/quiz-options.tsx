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
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold text-foreground mb-1 block">
          Quiz Preferences
        </Label>
        <p className="text-sm text-muted-foreground">
          Configure your quiz settings
        </p>
      </div>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <div className="space-y-2">
              <FormLabel className="text-sm font-medium">Quiz Name</FormLabel>
              <Input
                placeholder="Enter a name for your quiz set"
                {...field}
                disabled={form.formState.isSubmitting}
                className="w-full"
              />
            </div>
          )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="numQuestions"
            render={({ field }) => (
              <div className="space-y-2">
                <FormLabel className="text-sm font-medium">Number of Questions</FormLabel>
                <Select
                  value={field.value.toString()}
                  onValueChange={field.onChange}
                  disabled={form.formState.isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select number" />
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
              <div className="space-y-2">
                <FormLabel className="text-sm font-medium">Difficulty Level</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={form.formState.isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
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
