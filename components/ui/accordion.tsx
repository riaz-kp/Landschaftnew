"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionProps {
  items: {
    question: string
    answer: string
  }[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <div
            key={index}
            className="border-b border-border transition-colors duration-200"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between py-6 text-left focus:outline-none group"
            >
              <h3 className="text-lg font-medium text-foreground sm:text-xl pr-8 group-hover:text-primary transition-colors duration-200">
                {item.question}
              </h3>
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border group-hover:border-primary transition-colors duration-200">
                <AnimatePresence initial={false} mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="minus"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Minus className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="plus"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-muted-foreground/80 leading-relaxed text-base">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
