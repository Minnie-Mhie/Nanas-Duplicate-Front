import "../style/Modal.css"

const Modal = ({ isOpen, title, message, type, onClose, onConfirm }) => {
  if (!isOpen) return null

  const getIcon = () => {
    if (type === "success") return "bi-check-circle-fill"
    if (type === "danger")  return "bi-exclamation-circle-fill"
    if (type === "warning") return "bi-exclamation-triangle-fill"
    return "bi-info-circle-fill"
  }

  const getIconColor = () => {
    if (type === "success") return "var(--success)"
    if (type === "danger")  return "var(--danger)"
    if (type === "warning") return "var(--warning)"
    return "var(--accent)"
  }

  const getConfirmClass = () => {
    if (type === "danger")  return "btn btn-danger"
    if (type === "success") return "btn btn-success"
    if (type === "warning") return "btn btn-warning"
    return "btn btn-primary"
  }

  const handleConfirm = () => {
    if (onConfirm) onConfirm()
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box fade-up" onClick={e => e.stopPropagation()}>
        <div className="modal-icon-wrap" style={{ color: getIconColor() }}>
          <i className={`bi ${getIcon()}`} />
        </div>
        <div className="modal-title">{title}</div>
        <div className="modal-message">{message}</div>
        <div className="modal-actions">
          {onConfirm && (
            <button className={getConfirmClass()} onClick={handleConfirm}>
              Confirm
            </button>
          )}
          <button className="btn btn-outline" onClick={onClose}>
            {onConfirm ? "Cancel" : "Close"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal