// Notification Service for handling push notifications and socket events
export const NotificationService = {
  initialize() {
    this.requestNotificationPermission();
    this.setupSocketListeners();
  },

  async requestNotificationPermission() {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Notification permission granted");
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  },

  setupSocketListeners() {
    // Add your socket.io connection here
    // Example:
    // socket.on('newMessage', this.handleNewMessage);
    // socket.on('newPost', this.handleNewPost);
  },

  dispatchNotification(type, data) {
    const event = new CustomEvent('newNotification', {
      detail: {
        type,
        message: this.formatNotificationMessage(type, data),
        timestamp: new Date(),
        data
      }
    });
    window.dispatchEvent(event);
  },

  formatNotificationMessage(type, data) {
    switch (type) {
      case 'newMessage':
        return `New message from ${data.senderName}: ${data.message.substring(0, 50)}${data.message.length > 50 ? '...' : ''}`;
      case 'newPost':
        return `${data.userName} shared a new post`;
      case 'like':
        return `${data.userName} liked your post`;
      case 'comment':
        return `${data.userName} commented on your post: ${data.comment.substring(0, 30)}${data.comment.length > 30 ? '...' : ''}`;
      case 'follow':
        return `${data.userName} started following you`;
      default:
        return 'You have a new notification';
    }
  },

  // Example functions to trigger notifications
  sendNewMessageNotification(senderName, message) {
    this.dispatchNotification('newMessage', { senderName, message });
  },

  sendNewPostNotification(userName) {
    this.dispatchNotification('newPost', { userName });
  },

  sendLikeNotification(userName, postId) {
    this.dispatchNotification('like', { userName, postId });
  },

  sendCommentNotification(userName, comment, postId) {
    this.dispatchNotification('comment', { userName, comment, postId });
  },

  sendFollowNotification(userName) {
    this.dispatchNotification('follow', { userName });
  }
};

export default NotificationService;
