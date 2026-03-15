export function ProjectCardSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="w-full h-48 bg-gray-200 rounded-xl mb-4" />
      <div className="h-6 bg-gray-200 rounded-lg mb-3 w-3/4" />
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
      </div>
      <div className="flex gap-2 mb-4">
        <div className="h-6 bg-gray-200 rounded-full w-16" />
        <div className="h-6 bg-gray-200 rounded-full w-20" />
        <div className="h-6 bg-gray-200 rounded-full w-14" />
      </div>
      <div className="h-4 bg-gray-200 rounded w-24" />
    </div>
  )
}

export function BlogCardSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="w-full h-48 bg-gray-200 rounded-xl mb-4" />
      <div className="h-6 bg-gray-200 rounded-lg mb-3 w-3/4" />
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
      </div>
      <div className="h-4 bg-gray-200 rounded w-32" />
    </div>
  )
}

export function SkillSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="flex justify-between">
        <div className="h-5 bg-gray-200 rounded w-24" />
        <div className="h-5 bg-gray-200 rounded w-12" />
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4" />
    </div>
  )
}

