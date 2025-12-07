export const mottos = [
  "Spethial.com – Proof that one Product Manager + caffeine can do anything… eventually.",
  "Spethial.com – Where 'I\'ll fix it later' meets 'eventually'.",
  "Spethial.com – Powered by coffee, curiosity, and questionable decisions.",
  "Spethial.com – Building things one caffeine-fueled commit at a time.",
  "Spethial.com – Because 'it works on my machine' is a valid excuse.",
]

export function getRandomMotto(): string {
  return mottos[Math.floor(Math.random() * mottos.length)]
}

