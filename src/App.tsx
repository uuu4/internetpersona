import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { PageTransition } from './components/PageTransition';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { Home } from './pages/Home';
import { WriteupDetail } from './pages/WriteupDetail';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { WriteupList } from './pages/admin/WriteupList';
import { WriteupEditor } from './pages/admin/WriteupEditor';
import { useWriteups } from './hooks/useWriteups';
import { Category } from './types';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const { writeups } = useWriteups();

  const categories = useMemo((): Category[] => {
    const platformMap: Record<string, { name: string; icon: string }> = {
      'tryhackme': { name: 'TryHackMe', icon: 'Target' },
      'hackthebox': { name: 'HackTheBox', icon: 'Box' },
      'vulnhub': { name: 'VulnHub', icon: 'Monitor' },
      'ctf': { name: 'CTF', icon: 'Flag' }
    };

    const groupedByPlatform = writeups
      .filter(w => w.published)
      .reduce((acc, writeup) => {
        const platform = writeup.platform.toLowerCase();
        if (!acc[platform]) {
          acc[platform] = [];
        }
        acc[platform].push(writeup);
        return acc;
      }, {} as Record<string, typeof writeups>);

    return Object.entries(groupedByPlatform).map(([platform, writeups], index) => ({
      id: String(index + 1),
      name: platformMap[platform]?.name || platform,
      icon: platformMap[platform]?.icon || 'FileText',
      writeups: writeups
    }));
  }, [writeups]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <div className="flex h-screen bg-gray-50">
                <Sidebar
                  categories={categories}
                  isCollapsed={sidebarCollapsed}
                  onToggle={toggleSidebar}
                />

                <div className="flex-1 flex flex-col overflow-hidden">
                  <Header onToggleSidebar={toggleSidebar} />

                  <main className="flex-1 overflow-y-auto">
                    <PageTransition>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/writeup/:slug" element={<WriteupDetail />} />
                        <Route
                          path="/admin"
                          element={
                            <ProtectedRoute>
                              <AdminDashboard />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/admin/writeups"
                          element={
                            <ProtectedRoute>
                              <WriteupList />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/admin/writeups/:id/edit"
                          element={
                            <ProtectedRoute>
                              <WriteupEditor />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/admin/writeups/new"
                          element={
                            <ProtectedRoute>
                              <WriteupEditor />
                            </ProtectedRoute>
                          }
                        />
                      </Routes>
                    </PageTransition>
                  </main>
                </div>
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;