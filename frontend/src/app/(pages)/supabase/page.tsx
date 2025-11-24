import TestSupabase from '@/components/TestSupabase'
import TestBackend from '@/components/TestBackend'

export default function Home() {
  return (
    <div className="p-4">
      <TestSupabase />
      <hr className="my-4" />
      <TestBackend />
    </div>
  )
}
