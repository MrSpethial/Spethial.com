import { useState, useEffect } from 'react'
import { getRandomMotto } from '@/data/mottos'

export default function MottoDisplay() {
  const [motto, setMotto] = useState('')

  useEffect(() => {
    setMotto(getRandomMotto())
  }, [])

  if (!motto) return null

  return (
    <p className="text-sm md:text-base text-spethial-muted dark:text-spethial-muted italic">
      {motto}
    </p>
  )
}

