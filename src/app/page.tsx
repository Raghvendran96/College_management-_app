import { 
  Users, 
  GraduationCap, 
  Wallet, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { SuccessChart } from "@/components/dashboard/success-chart";
import { AiTutor } from "@/components/dashboard/ai-tutor";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";

export default function Dashboard() {
  const stats = [
    {
      title: "Attendance",
      value: "92.5%",
      icon: CheckCircle2,
      description: "+2.1% from last month",
      color: "text-green-500",
    },
    {
      title: "GPA",
      value: "3.8/4.0",
      icon: GraduationCap,
      description: "Dean's list candidate",
      color: "text-blue-500",
    },
    {
      title: "Fees Status",
      value: "Pending",
      icon: Wallet,
      description: "₹25,000 due in 5 days",
      color: "text-amber-500",
    },
    {
      title: "Courses",
      value: "6 Enrolled",
      icon: Users,
      description: "2 in progress labs",
      color: "text-purple-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <SuccessChart />
        </div>
        <div className="lg:col-span-3">
          <AiTutor />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Assignments</CardTitle>
            <CardDescription>You have 3 deadlines this week.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Quantum Physics Lab", date: "April 2, 2026", status: "In Progress" },
                { title: "Advanced Data Structures", date: "April 4, 2026", status: "Not Started" },
                { title: "AI Ethics Paper", date: "April 5, 2026", status: "Needs Review" },
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-xs text-muted-foreground">{task.date}</p>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    task.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                    task.status === "Needs Review" ? "bg-amber-100 text-amber-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {task.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              "Library book 'Deep Learning' is due today.",
              "New course note uploaded for Advanced Calculus.",
              "Tuition fee reminder: Payment window closes soon.",
            ].map((note, i) => (
              <div key={i} className="text-sm p-3 rounded bg-muted/50 border-s-4 border-primary">
                {note}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
