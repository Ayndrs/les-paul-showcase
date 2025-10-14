import "./style.css"

import { animate, inView } from "motion"

animate (
  "header", 
  {
    y: [-100, 0],
    opacity: [0, 1]
  }, 
  { duration: 1, delay: 2.5},
)

animate (
  "section.new-drop",
  {
    y: [-100, 0],
    opacity: [0, 1],
  },
  { duration: 1, delay: 2 },
)

animate("section.content", { opacity: 0 })
inView ("section.content", (info) => {
  animate (info.target, { opacity: 1,}, { duration: 1, delay: 1 })
})