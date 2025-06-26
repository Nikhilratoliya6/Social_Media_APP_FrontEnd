import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

class WebSocketService {
  constructor() {
    this.stompClient = null;
    this.socketUrl = "https://socialmediaappbackend-production-8a21.up.railway.app/ws";
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 5000; // 5 seconds
    this.subscriptions = new Map();
    this.connectionPromise = null;
  }

  connect(jwt) {
    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    this.connectionPromise = new Promise((resolve, reject) => {
      try {
        const socket = new SockJS(this.socketUrl);
        const stomp = Stomp.over(socket);

        // Disable console logging
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
              reject(new Error('Max reconnection attempts reached'));
            }
          }
        );

        socket.onclose = () => {
          console.log('WebSocket Connection Closed');
          this.connectionPromise = null;
          if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.connect(jwt);
          }
        };

      } catch (error) {
        console.error('WebSocket Setup Error:', error);
        this.connectionPromise = null;
        reject(error);
      }
    });

    return this.connectionPromise;
  }

  subscribe(destination, callback) {
    if (!this.stompClient) {
      console.warn('WebSocket not connected. Adding to pending subscriptions.');
      this.subscriptions.set(destination, callback);
      return;
    }

    const subscription = this.stompClient.subscribe(destination, (message) => {
      try {
        const payload = JSON.parse(message.body);
        callback(payload);
      } catch (error) {
        console.error('Error processing message:', error);
      }
    });

    this.subscriptions.set(destination, callback);
    return subscription;
  }

  resubscribe() {
    if (!this.stompClient) return;

    this.subscriptions.forEach((callback, destination) => {
      this.subscribe(destination, callback);
    });
  }

  sendMessage(destination, message) {
    return new Promise((resolve, reject) => {
      if (!this.stompClient?.connected) {
        reject(new Error('WebSocket not connected'));
        return;
      }

      try {
        this.stompClient.send(destination, {}, JSON.stringify(message));
        resolve();
      } catch (error) {
        console.error('Error sending message:', error);
        reject(error);
      }
    });
  }

  disconnect() {
    if (this.stompClient?.connected) {
      this.stompClient.disconnect();
    }
    this.stompClient = null;
    this.connectionPromise = null;
    this.subscriptions.clear();
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
