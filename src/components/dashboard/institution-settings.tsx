"use client"

import { useState, useEffect } from "react"
import { Upload, Save, CheckCircle, School } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { updateInstitutionLogo, getInstitutionSettings } from "@/app/actions/institution"
import { toggleSystemMode, cleanSystemData } from "@/app/actions/system-actions"
import { Switch } from "@/components/ui/switch"
import { AlertTriangle, Trash2, Globe, Beaker } from "lucide-react"

export function InstitutionSettings() {
  const [name, setName] = useState("")
  const [logo, setLogo] = useState<File | null>(null)
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [isDemo, setIsDemo] = useState(true)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [cleaning, setCleaning] = useState(false)

  useEffect(() => {
    async function load() {
      const data = await getInstitutionSettings()
      setName(data.name)
      setLogoUrl(data.logo_url)
      setIsDemo(data.is_demo_mode ?? true)
    }
    load()
  }, [])

  const handleToggleMode = async (val: boolean) => {
    setIsDemo(val)
    try {
      await toggleSystemMode(val)
    } catch (e: any) {
      alert("Toggle Error: " + e.message)
    }
  }

  const handleCleanSystem = async () => {
    if (!confirm("CRITICAL WARNING: This will permanently delete all student records, courses, and fees. ONLY use this for a final production launch. Proceed?")) return;
    
    setCleaning(true)
    try {
      await cleanSystemData()
      alert("System cleaned successfully! All demo data has been wiped.")
    } catch (e: any) {
      alert("Clean Error: " + e.message)
    } finally {
      setCleaning(false)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    setSuccess(false)
    const formData = new FormData()
    formData.append("name", name)
    if (logo) formData.append("logo", logo)

    try {
      await updateInstitutionLogo(formData)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (e: any) {
      alert("Error: " + e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <School className="h-5 w-5" />
          Institution Branding
        </CardTitle>
        <CardDescription>Customize the name and logo of your college portal.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Institution Name</label>
          <Input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="e.g. KBITM College"
          />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium">College Logo</label>
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-lg bg-muted flex items-center justify-center border-2 border-dashed overflow-hidden">
              {logoUrl ? (
                <img src={logoUrl} alt="College Logo" className="h-full w-full object-contain" />
              ) : (
                <School className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <div className="space-y-2">
              <Input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setLogo(e.target.files?.[0] || null)}
                className="max-w-xs"
              />
              <p className="text-xs text-muted-foreground">Recommended: Square PNG/SVG, 512x512px.</p>
            </div>
          </div>
        </div>

        <Button onClick={handleSave} disabled={loading} className="w-full">
          {loading ? "Saving..." : success ? (
            <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Saved Successfully</span>
          ) : (
            <span className="flex items-center gap-2"><Save className="h-4 w-4" /> Update Branding</span>
          )}
        </Button>

        <div className="pt-6 border-t space-y-6">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 font-medium">
                {isDemo ? <Beaker className="h-4 w-4 text-amber-600" /> : <Globe className="h-4 w-4 text-green-600" />}
                System Mode: {isDemo ? "Demo" : "Live"}
              </div>
              <p className="text-xs text-muted-foreground">
                {isDemo 
                  ? "Currently showing demo badges and sample credentials." 
                  : "Production mode active. All user-facing demo indicators are hidden."}
              </p>
            </div>
            <Switch 
              checked={isDemo} 
              onCheckedChange={handleToggleMode} 
            />
          </div>

          <div className="p-4 border border-destructive/20 bg-destructive/5 rounded-lg space-y-3">
             <div className="flex items-center gap-2 font-medium text-destructive">
               <AlertTriangle className="h-4 w-4" />
               Danger Zone: Clean Software
             </div>
             <p className="text-xs text-muted-foreground">
               This will wipe all courses, enrollments, fees, and submissions. Use this only when you are ready to launch the software for real users.
             </p>
             <Button 
               variant="destructive" 
               size="sm" 
               className="w-full sm:w-auto"
               onClick={handleCleanSystem}
               disabled={cleaning}
             >
               <Trash2 className="h-4 w-4 mr-2" />
               {cleaning ? "Cleaning System..." : "Wipe All Operational Data"}
             </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
