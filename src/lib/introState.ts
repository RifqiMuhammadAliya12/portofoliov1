export const hasPlayedIntro = () => {
  if (typeof window === 'undefined') return false

  return sessionStorage.getItem('introPlayed') === 'true'
}

export const setIntroPlayed = () => {
  if (typeof window === 'undefined') return

  sessionStorage.setItem('introPlayed', 'true')
}

export const resetIntro = () => {
  if (typeof window === 'undefined') return

  sessionStorage.removeItem('introPlayed')
}