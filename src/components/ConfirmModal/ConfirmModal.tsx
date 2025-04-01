"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { AlertTriangle, X } from "lucide-react"

interface ConfirmModalProps {
  title: string
  description: string
  cancel: string
  go: string
  confirm: (action: boolean) => void
  showModal: boolean
  setVisible: (visible: boolean) => void
}

export function ConfirmModal(props: ConfirmModalProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  // Handle animation states
  useEffect(() => {
    if (props.showModal) {
      setIsAnimating(true)
      document.body.style.overflow = "hidden"
    } else {
      setTimeout(() => {
        setIsAnimating(false)
        document.body.style.overflow = ""
      }, 300)
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [props.showModal])

  function handleConfirm(value: boolean) {
    props.confirm(value)
    props.setVisible(false)
  }

  function handleBackdropClick(e: React.MouseEvent) {
    // Only close if clicking directly on the backdrop, not the modal content
    if (e.target === e.currentTarget) {
      props.setVisible(false)
    }
  }

  // Don't render anything if not showing and not animating
  if (!isAnimating && !props.showModal) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 ${
        props.showModal ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal */}
      <div
        className={`
          relative bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md
          transition-all duration-300 ease-out z-10
          ${props.showModal ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          
          /* Mobile positioning */
          rounded-t-xl rounded-b-none md:rounded-xl
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => props.setVisible(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          {/* Icon and title */}
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 id="modal-title" className="text-xl font-bold text-gray-900 mb-1">
                {props.title}
              </h2>
              <p className="text-gray-600">{props.description}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 my-5" />

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => handleConfirm(false)}
              className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              {props.cancel}
            </button>
            <button
              onClick={() => handleConfirm(true)}
              className="px-4 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              {props.go}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

