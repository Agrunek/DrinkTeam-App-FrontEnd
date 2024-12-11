import { createContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import notifee, {
  Notification,
  Trigger,
  TriggerType,
} from '@notifee/react-native';

type SNFunction = (
  id: string,
  seconds: number,
  title: string,
  body: string,
  data: object
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
  const { navigate } = useNavigation();

  console.log('Notification Context Provider rendering...');

  useEffect(() => {
    const initNotifications = async () => {
      await notifee.requestPermission();

      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      setChannelId(channelId);

      const initialNotification = await notifee.getInitialNotification();

      if (initialNotification && navigate) {
        navigate('Recipe', initialNotification.notification.data);
      }
    };

    console.log('Initialize notifications...');

    initNotifications();
  }, [navigate]);

  const scheduleNotification: SNFunction = async (
    id,
    seconds,
    title,
    body,
    data
  ) => {
    await notifee.cancelNotification(id);

    const date = new Date(Date.now() + seconds * 1000);

    const notification: Notification = {
      id: id,
      title: title,
      body: body,
      data: { noti: data },
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

  return (
    <NotificationContext.Provider value={notificationContext}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
