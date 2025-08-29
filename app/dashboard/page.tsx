"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { 
  User, 
  Mail, 
  Calendar, 
  Settings, 
  BarChart3, 
  Users, 
  Zap, 
  LogOut,
  Bell,
  Search,
  Plus,
  Menu
} from "lucide-react"
import { useAuth } from "../../core/services/auth.context"

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#FF7357] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const stats = [
    {
      title: "Total Projects",
      value: "12",
      change: "+2 this month",
      icon: BarChart3,
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      textColor: "text-orange-600",
      bgColor: "bg-orange-50",
      trend: "up"
    },
    {
      title: "Team Members",
      value: "8",
      change: "+1 this week",
      icon: Users,
      color: "bg-gradient-to-br from-emerald-500 to-green-600",
      textColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
      trend: "up"
    },
    {
      title: "AI Insights",
      value: "47",
      change: "+12 today",
      icon: Zap,
      color: "bg-gradient-to-br from-purple-500 to-indigo-600",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: "up"
    },
    {
        title: "Active Tasks",
        value: "23",
        change: "-3 completed",
        icon: Settings,
        color: "bg-gradient-to-br from-orange-400 to-orange-600",
        textColor: "text-orange-600",
        bgColor: "bg-orange-50",
        trend: "down"
      }
  ]

  const recentActivities = [
    {
      action: "New project created",
      description: "E-commerce Analytics Dashboard",
      time: "2 hours ago",
      type: "project"
    },
    {
      action: "Team member added",
      description: "Sarah Johnson joined the team",
      time: "4 hours ago",
      type: "team"
    },
    {
      action: "AI insight generated",
      description: "Customer behavior analysis completed",
      time: "6 hours ago",
      type: "ai"
    },
    {
      action: "Task completed",
      description: "User interface redesign",
      time: "1 day ago",
      type: "task"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-100/30 to-red-100/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-amber-100/30 to-orange-100/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <header className="relative z-10 bg-white/90 backdrop-blur-md shadow-lg border-b border-slate-200/60 animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden transform hover:scale-110 transition-transform duration-300">
                <Image src="/logo.webp" alt="Opiron Logo" width={40} height={40} className="w-full h-full object-contain" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Opiron Dashboard</h1>
                <p className="text-xs text-slate-500 font-medium tracking-wide">AI-Powered Analytics</p>
              </div>
              <div className="block sm:hidden">
                <h1 className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Opiron</h1>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative hidden lg:block">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300"
                  style={{outline: 'none'}} 
                  onFocus={(e) => e.target.style.boxShadow = `0 0 0 2px var(--opiron-orange-200)`}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                />
              </div>
              <Button size="sm" className="hidden sm:flex bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105">
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden md:inline">New Project</span>
                <span className="md:hidden">New</span>
              </Button>
              <Button size="sm" className="sm:hidden bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold shadow-lg transition-all duration-300">
                <Plus className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="relative hover:bg-gray-100 transition-colors duration-300">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse"></span>
              </Button>
              <div className="hidden md:flex items-center space-x-3 px-3 py-1 bg-gray-50 rounded-full">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                  {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-semibold text-slate-700">Welcome, {user?.name}</span>
              </div>
              <div className="md:hidden">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                  {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="hover:bg-gray-100 transition-colors duration-300">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="mb-6 sm:mb-8 animate-fade-in">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-100 shadow-sm">
              <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row space-y-4 sm:space-y-0">
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name} pro! 👋</h2>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600">Here&apos;s what&apos;s happening with your AI-powered projects today.</p>
                </div>
                <div className="hidden sm:block flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl sm:rounded-2xl flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform duration-300">
                    <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 sm:p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium text-orange-800">Account Info</h3>
                    <p className="text-xs sm:text-sm text-orange-700 mt-1 break-words">
                      Logged in as: <span className="font-semibold">{user.email}</span> • Member since {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] border-0 bg-white/95 backdrop-blur-md animate-slide-up shadow-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2 min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-semibold text-slate-600 group-hover:text-slate-700 transition-colors truncate">
                          {stat.title}
                        </p>
                        <p className="text-2xl sm:text-3xl font-bold text-slate-800 group-hover:scale-105 transition-transform">
                          {stat.value}
                        </p>
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 ${stat.trend === 'up' ? 'bg-emerald-400' : 'bg-rose-400'} rounded-full animate-pulse`}></div>
                          <p className={`text-xs sm:text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'} truncate`}>{stat.change}</p>
                        </div>
                      </div>
                      <div className={`p-3 sm:p-4 rounded-2xl ${stat.bgColor} ${stat.textColor} group-hover:scale-110 transition-transform duration-300 flex-shrink-0 shadow-sm`}>
                        <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2">
              <Card className="border-0 bg-white/95 backdrop-blur-md shadow-xl animate-slide-up delay-500 border border-slate-200/60">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 flex items-center space-x-2">
                    <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 flex-shrink-0" />
                    <span>Recent Activity</span>
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">Your latest actions and updates</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3 sm:space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 sm:p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.01] group">
                        <div className="w-3 h-3 bg-stone-400 rounded-full mt-2 animate-pulse group-hover:scale-125 transition-transform flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-gray-700 truncate">{activity.action}</p>
                          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{activity.description}</p>
                          <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                        </div>
                        <div className="w-2 h-2 bg-gray-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="border-0 bg-white/95 backdrop-blur-md shadow-xl animate-slide-up delay-700 border border-slate-200/60">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 flex items-center space-x-2">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-opiron flex-shrink-0" />
                    <span>Quick Actions</span>
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                  <Button className="w-full justify-start h-10 sm:h-12 bg-stone-600 hover:bg-stone-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg group text-sm sm:text-base">
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 group-hover:rotate-90 transition-transform flex-shrink-0" />
                    <span className="truncate">Create New Project</span>
                  </Button>
                  <Button className="w-full justify-start h-10 sm:h-12 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.01] group text-sm sm:text-base" variant="outline">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-slate-500 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="truncate">Invite Team Member</span>
                  </Button>
                  <Button className="w-full justify-start h-10 sm:h-12 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.01] group text-sm sm:text-base" variant="outline">
                    <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-emerald-500 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="truncate">View Analytics</span>
                  </Button>
                  <Button className="w-full justify-start h-10 sm:h-12 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.01] group text-sm sm:text-base" variant="outline">
                    <Settings className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-violet-500 group-hover:rotate-90 transition-transform flex-shrink-0" />
                    <span className="truncate">Account Settings</span>
                  </Button>
                  <Button className="w-full justify-start h-10 sm:h-12 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.01] group text-sm sm:text-base" variant="outline">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-amber-500 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="truncate">AI Insights</span>
                  </Button>
                </CardContent>
              </Card>

              <Card className="mt-4 sm:mt-6 border-0 bg-white/95 backdrop-blur-md shadow-xl animate-slide-up delay-1000 border border-slate-200/60">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 flex items-center space-x-2">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" />
                    <span>Account Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                  <div className="flex items-center space-x-3 p-2 sm:p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-500 rounded-full flex items-center justify-center text-white text-sm sm:text-base font-semibold group-hover:scale-110 transition-transform flex-shrink-0">
                      {(user.name || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{user.name}</p>
                      <p className="text-xs sm:text-sm text-gray-600">Account Owner</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 sm:p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{user.email}</p>
                      <p className="text-xs sm:text-sm text-gray-600">Primary Email</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 sm:p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{user.plan?.charAt(0).toUpperCase() + user.plan?.slice(1)} Plan</p>
                      <p className="text-xs sm:text-sm text-gray-600">Active Subscription</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}