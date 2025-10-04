import React from 'react'

interface ProjectPageProps {
  projectId: string
}

export function ProjectPage({ projectId }: ProjectPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>Project Page for ID: {projectId} - Coming Soon</h1>
    </div>
  )
}