import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

class WebSocketService {
  constructor() {
    this.stompClient = null;
    this.socketUrl = "https://socialmediaappbackend-production-8a21.up.railway.app/ws";
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 5000;
    this.subscriptions = new Map();
    this.connectionPromise = null;
    this.onlineUsers = new Set();
  }

  connect(jwt) {
    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    this.connectionPromise = new Promise((resolve, reject) => {
      try {
        const socket = new SockJS(this.socketUrl);
        const stomp = Stomp.over(socket);

        stomp.debug = null;

        const headers = {
          Authorization: `Bearer ${jwt}`,
        };

        stomp.connect(
          headers,
          () => {
            console.log('WebSocket Connected Successfully');
            this.stompClient = stomp;
            this.reconnectAttempts = 0;
            this.resubscribe();
            
            // Subscribe to online status updates
            this.subscribe('/topic/online-users', (users) => {
              this.onlineUsers = new Set(users);
            });
            
            // Send initial online status
            this.sendMessage('/app/online-status', {
              status: 'ONLINE'
            });

            resolve(stomp);
          },
          (error) => {
            console.error('WebSocket Connection Error:', error);
            this.connectionPromise = null;

            if (this.reconnectAttempts < this.maxReconnectAttempts) {
              this.reconnectAttempts++;
              console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
              setTimeout(() => {
                this.connect(jwt).then(resolve).catch(reject);
              }, this.reconnectDelay);
            } else {
              reject(error);
            }
          }
        );

        // Handle window events for online status
        window.addEventListener('beforeunload', () => {
          this.sendMessage('/app/online-status', {
            status: 'OFFLINE'
          });
        });

        window.addEventListener('focus', () => {
          this.sendMessage('/app/online-status', {
            status: 'ONLINE'
          });
        });

        window.addEventListener('blur', () => {
          // Don't set offline on blur, user might be in another tab
          // but still on the website
        });

      } catch (error) {
        console.error('WebSocket Setup Error:', error);
        this.connectionPromise = null;
        reject(error);
      }
    });

    return this.connectionPromise;
  }

  isConnected() {
    return this.stompClient?.connected || false;
  }

  subscribe(topic, callback) {
    if (!this.stompClient) {
      console.error('WebSocket not connected');
      return null;
    }

    const subscription = this.stompClient.subscribe(topic, (message) => {
      try {
        const data = JSON.parse(message.body);
        callback(data);
      } catch (error) {
        console.error('Failed to parse message:', error);
      }
    });

    this.subscriptions.set(topic, { callback, subscription });
    return subscription;
  }

  async sendMessage(destination, message) {
    if (!this.stompClient?.connected) {
      throw new Error('WebSocket not connected');
    }

    return new Promise((resolve, reject) => {
      try {
        this.stompClient.send(
          destination,
          {},
          JSON.stringify(message)
        );
        resolve();
      } catch (error) {
        console.error('Failed to send message:', error);
        reject(error);
      }
    });
  }

  disconnect() {
    if (this.stompClient?.connected) {
      // Send offline status before disconnecting
      this.sendMessage('/app/online-status', {
        status: 'OFFLINE'
      }).finally(() => {
        this.stompClient.disconnect();
      });
    }
    this.subscriptions.clear();
    this.connectionPromise = null;
  }

  resubscribe() {
    for (const [topic, { callback }] of this.subscriptions.entries()) {
      this.subscribe(topic, callback);
    }
  }

  isUserOnline(userId) {
    return this.onlineUsers.has(userId);
  }
}

// Create and export a singleton instance
const webSocketService = new WebSocketService();
export default webSocketService;
