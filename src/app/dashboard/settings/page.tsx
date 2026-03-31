import { InstitutionSettings } from "@/components/dashboard/institution-settings"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KeyRound, School, UserCog } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
        <p className="text-muted-foreground">
          Manage your institution branding and user account security.
        </p>
      </div>

      <Tabs defaultValue="branding" className="space-y-4">
        <TabsList>
          <TabsTrigger value="branding" className="flex items-center gap-2">
            <School className="h-4 w-4" />
            Branding
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <UserCog className="h-4 w-4" />
            User Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="branding">
          <InstitutionSettings />
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <KeyRound className="h-5 w-5" />
                Password Reset Console
              </CardTitle>
              <CardDescription>
                Super Admins can reset any faculty or student password. 
                Use this strictly for recovery purposes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
                <strong>Notice:</strong> This feature is currently in "Demo Mode". To reset a password, select a user from the management list (coming in the next patch) or use the Supabase Auth Dashboard.
              </div>
              <p className="text-sm text-muted-foreground">
                In this version, the default demo credentials are:
                <br />• <strong>Admin:</strong> admin@college.edu (admin123)
                <br />• <strong>Teacher:</strong> teacher@college.edu (teacher123)
                <br />• <strong>Student:</strong> student@college.edu (student123)
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
