import { createContext, useState } from 'react';
import notifee, {
  Notification,
  Trigger,
  TriggerType,
} from '@notifee/react-native';

type SNFunction = (
  id: string,
  seconds: number,
  title: string,
  body: string
) => Promise<void>;

type CFunction = (id: string) => Promise<void>;

interface INotificationContext {
  channelId: string;
  scheduleNotification: SNFunction;
  cancelNotification: CFunction;
}

const defaultNotificationContext: INotificationContext = {
  channelId: '',
  scheduleNotification: async () => undefined,
  cancelNotification: async () => undefined,
};

const NotificationContext = createContext(defaultNotificationContext);

export const NotificationContextProvider = ({ children }) => {
  const [channelId, setChannelId] = useState('');

  const initNotifications = async () => {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    setChannelId(channelId);
  };

  const scheduleNotification: SNFunction = async (id, seconds, title, body) => {
    await notifee.cancelNotification(id);

    const date = new Date(Date.now() + seconds * 1000);

    const notification: Notification = {
      id: id,
      title: title,
      body: body,
      android: { channelId, pressAction: { id: 'default' } },
    };

    const trigger: Trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
    };

    await notifee.createTriggerNotification(notification, trigger);
  };

  const cancelNotification: CFunction = async (id) => {
    await notifee.cancelNotification(id);
  };

  const notificationContext = {
    channelId: channelId,
    scheduleNotification: scheduleNotification,
    cancelNotification: cancelNotification,
  };

  initNotifications();

  return (
    <NotificationContext.Provider value={notificationContext}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
