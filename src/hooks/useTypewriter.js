import { useState, useEffect } from 'react'

export function useTypewriter(texts, speed = 60, pause = 2000) {
  const [displayed, setDisplayed] = useState('')
  const [textIdx, setTextIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!texts || texts.length === 0) return

    const current = texts[textIdx]
    let timeout

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx))
        setCharIdx(c => c + 1)
      }, speed)
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx))
        setCharIdx(c => c - 1)
      }, speed / 2)
    } else {
      setDeleting(false)
      setTextIdx(i => (i + 1) % texts.length)
    }
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, textIdx, texts, speed, pause])

  return displayed
}
