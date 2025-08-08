import { Button } from "@/components/ui/button"

interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
}

export function ConfirmationDialog({ isOpen, onClose, onConfirm, title }: ConfirmationDialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold text-center mb-8 leading-tight">
          {title}
        </h2>
        
        <div className="flex gap-4">
          <Button
            onClick={onConfirm}
            className="flex-1 h-12 bg-white border-2 border-black text-black hover:bg-gray-50 rounded-full"
          >
            Sim
          </Button>
          <Button
            onClick={onClose}
            className="flex-1 h-12 bg-white border-2 border-black text-black hover:bg-gray-50 rounded-full"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  )
}
