function Notification({ notification }) {
  return notification.status === 'success' ? (
    <div className="notification notification-success">
      <ion-icon name="checkmark-done-circle-outline"></ion-icon>
      <p>{notification.message}</p>
    </div>
  ) : (
    <div className="notification notification-error">
      <ion-icon name="warning-outline"></ion-icon>
      <p>{notification.message}</p>
    </div>
  )
}

export default Notification
