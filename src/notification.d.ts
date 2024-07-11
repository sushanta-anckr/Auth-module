interface Notification {
    requestPermission(): Promise<NotificationPermission>;
  }
  
  declare let Notification: {
    prototype: Notification;
    new(title: string, options?: NotificationOptions): Notification;
  };
  
  type NotificationPermission = 'default' | 'granted' | 'denied';