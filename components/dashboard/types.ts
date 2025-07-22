export interface DashboardOptions {
  title: string;
  value: string | number;
  change: string;
  icon?: React.ReactNode;
}

export interface ActivityItem {
  id: string;
  title: string;
  time: string;
  detail: string;
  status: "success" | "warning" | "info" | "error";
}

export interface MetricItem {
  label: string;
  value: string;
  change: string;
  changeType?: "positive" | "negative" | "neutral";
}
