import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Settings, Shield, Bell, User } from "lucide-react"

export default function SettingsAdminPage() {
    const settingsSections = [
        { name: "Profile Settings", description: "Manage your administrator account details", icon: User },
        { name: "Security", description: "Update passwords and authentication methods", icon: Shield },
        { name: "Notifications", description: "Configure system and email alerts", icon: Bell },
    ]

    return (
        <div className="p-6 md:p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Admin Settings</h1>
                    <p className="mt-2 text-slate-500 max-w-2xl">
                        Configure your administrative experience and system preferences.
                    </p>
                </div>
            </div>

            <div className="grid gap-4 max-w-3xl">
                {settingsSections.map((section) => (
                    <Card key={section.name} className="hover:shadow-md transition-all duration-300 border-slate-200">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 border border-slate-100">
                                    <section.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">{section.name}</h3>
                                    <p className="text-sm text-slate-500">{section.description}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" className="text-slate-400">Manage</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="pt-8 border-t border-slate-100 max-w-2xl">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Danger Zone</h3>
                <Button variant="destructive" className="opacity-50">Reset System Data</Button>
            </div>
        </div>
    )
}
