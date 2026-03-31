"use client"

import { useState, useEffect } from "react"
import { Search, Filter, AlertCircle, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"
import { getFilteredFees, getAllClasses, sendFeeReminder } from "@/app/actions/finance"
import { Mail, QrCode, CreditCard, CheckCircle2, Wallet, School } from "lucide-react"

export function FinanceDashboard() {
  const [role, setRole] = useState("student")
  
  useEffect(() => {
    const r = document.cookie.split('; ').find(row => row.startsWith('userRole='))?.split('=')[1]
    if (r) setRole(r)
  }, [])

  const [fees, setFees] = useState<any[]>([])
  const [classes, setClasses] = useState<string[]>([])
  const [status, setStatus] = useState("all")
  const [className, setClassName] = useState("all")
  const [studentName, setStudentName] = useState("")
  const [loading, setLoading] = useState(true)
  const [sendingEmail, setSendingEmail] = useState<string | null>(null)

  const handleSendReminder = async (feeId: string) => {
    setSendingEmail(feeId)
    try {
      await sendFeeReminder(feeId)
      alert("Reminder email sent successfully!")
    } catch (error: any) {
      alert("Failed to send email: " + error.message)
    } finally {
      setSendingEmail(null)
    }
  }

  useEffect(() => {
    async function loadInitial() {
      try {
        const classData = await getAllClasses()
        setClasses(classData)
        await handleSearch()
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    loadInitial()
  }, [])

  const handleSearch = async () => {
    setLoading(true)
    try {
      const data = await getFilteredFees({ 
        status: status === "all" ? undefined : status, 
        className: className === "all" ? undefined : className, 
        studentName 
      })
      setFees(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "overdue": return "destructive"
      case "paid": return "success"
      case "pending": return "secondary"
      default: return "outline"
    }
  }

  const exportToCSV = () => {
    if (fees.length === 0) return;
    
    const headers = ["Student Name", "Class", "Amount", "Due Date", "Status"];
    const rows = fees.map(fee => [
      fee.profiles?.full_name,
      fee.profiles?.class_name || "N/A",
      fee.amount,
      new Date(fee.due_date).toLocaleDateString(),
      fee.status.toUpperCase()
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `fees_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Financial Filters
          </CardTitle>
          <CardDescription>Filter payments by class, student name, and status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4 items-end">
            <div className="grid gap-2">
              <label className="text-xs font-medium">Class/Batch</label>
              <Select value={className} onValueChange={setClassName}>
                <SelectTrigger>
                  <SelectValue placeholder="All Classes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label className="text-xs font-medium">Status</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label className="text-xs font-medium">Student Name</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search student..." 
                  className="pl-8" 
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? "Searching..." : "Apply Filters"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Fees Statement</CardTitle>
            <CardDescription>{fees.length} matching records found.</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={exportToCSV} disabled={fees.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fees.length > 0 ? fees.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell className="font-medium">{fee.profiles?.full_name}</TableCell>
                  <TableCell>{fee.profiles?.class_name || "N/A"}</TableCell>
                  <TableCell>₹{fee.amount.toLocaleString()}</TableCell>
                  <TableCell>{new Date(fee.due_date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(fee.status) as any}>
                      {fee.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {role === "admin" && fee.status === "overdue" && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleSendReminder(fee.id)}
                        disabled={sendingEmail === fee.id}
                      >
                        <Mail className={`h-4 w-4 ${sendingEmail === fee.id ? "animate-pulse" : ""}`} />
                      </Button>
                    )}
                    
                    {role === "student" && fee.status !== "paid" && (
                       <Dialog>
                          <DialogTrigger asChild>
                             <Button variant="outline" size="sm" className="rounded-xl border-sky-100 text-sky-600 font-black italic uppercase text-[9px] tracking-widest shadow-sm hover:bg-sky-50 transition-all">
                                Pay Now
                             </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md rounded-[3rem] p-0 overflow-hidden border-0 shadow-2xl">
                             <div className="bg-sky-950 p-10 text-white relative overflow-hidden text-center">
                                <div className="relative z-10 space-y-2">
                                   <p className="text-sky-300 font-black uppercase text-[10px] tracking-[0.3em] italic">Fiscal Audit Node</p>
                                   <h3 className="text-5xl font-black italic tracking-tighter">₹{fee.amount.toLocaleString()}</h3>
                                   <Badge className="bg-sky-400 text-sky-950 font-black text-[9px] px-4 py-1 italic uppercase tracking-widest">Pending Fee Clearance</Badge>
                                </div>
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                   <Wallet className="h-40 w-40" />
                                </div>
                             </div>
                             <div className="bg-white p-10 space-y-8">
                                <Tabs defaultValue="qr" className="w-full">
                                   <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-slate-50 p-1">
                                      <TabsTrigger value="qr" className="rounded-xl font-black italic text-[10px] uppercase tracking-widest">Scan & Pay</TabsTrigger>
                                      <TabsTrigger value="card" className="rounded-xl font-black italic text-[10px] uppercase tracking-widest">Card Node</TabsTrigger>
                                   </TabsList>
                                   <TabsContent value="qr" className="space-y-6 pt-6">
                                      <div className="flex flex-col items-center gap-4 p-8 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
                                         <QrCode className="h-48 w-48 text-sky-950" />
                                         <p className="text-[10px] font-black text-sky-400 uppercase tracking-widest">Scan this code with any UPI app</p>
                                      </div>
                                   </TabsContent>
                                   <TabsContent value="card" className="space-y-4 pt-6">
                                      <div className="space-y-4">
                                         <div className="grid gap-2">
                                            <label className="text-[10px] font-black uppercase text-sky-950 tracking-widest pl-2">Global Card Info</label>
                                            <Input placeholder="XXXX XXXX XXXX XXXX" className="rounded-xl h-12 border-sky-100" />
                                         </div>
                                         <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                               <Input placeholder="MM/YY" className="rounded-xl h-12 border-sky-100" />
                                            </div>
                                            <div className="grid gap-2">
                                               <Input placeholder="CVV" className="rounded-xl h-12 border-sky-100" />
                                            </div>
                                         </div>
                                      </div>
                                   </TabsContent>
                                </Tabs>
                                <Button className="w-full rounded-2xl bg-sky-950 text-white h-16 font-black italic uppercase tracking-widest shadow-2xl shadow-sky-950/20 active:scale-95 transition-all text-xs" onClick={() => alert("Simulated Payment Successful! Institutional balance updated.")}>
                                   Finalize Clearance
                                </Button>
                             </div>
                          </DialogContent>
                       </Dialog>
                    )}
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No results found. Try adjusting your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
